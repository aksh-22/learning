# 🧱 MongoDB Docker Setup, Monitoring & Backup Strategy (Ubuntu)

This document covers everything needed to deploy MongoDB via Docker on Ubuntu, enable secure access, monitor the instance visually using Portainer, and implement an automated multi-layered backup strategy.

---

## 🔧 Prerequisites

- Ubuntu server with sudo access
- Internet connection
- Basic understanding of terminal commands

---

## 🐳 Step 1: Install Docker & Docker Compose

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg

# Add Docker GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker's official repo
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

Start and enable Docker:

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

Test Docker:

```bash
docker run hello-world
```

---

## 📦 Step 2: Deploy MongoDB + Mongo Express with Docker Compose

```bash
mkdir ~/mongodb-docker && cd ~/mongodb-docker
nano docker-compose.yml
```

Paste:

```yaml
services:
  mongo:
    image: mongo:6.0
    container_name: mongodb
    restart: unless-stopped
    ports:
      - '27017:27017'
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: strongpassword
    volumes:
      - mongo-data:/data/db

  mongo-express:
    image: mongo-express:1.0.0-alpha
    container_name: mongo-express
    restart: unless-stopped
    ports:
      - '8082:8081'
    environment:
      ME_CONFIG_MONGODB_URL: mongodb://admin:strongpassword@mongo:27017/
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: secureui

volumes:
  mongo-data:
```

Run containers:

```bash
docker compose up -d
docker ps
```

Access:

- Mongo Express UI → `http://<your-server-ip>:8082`
- MongoDB connection URI:

  ```
  mongodb://admin:strongpassword@localhost:27017/your-db?authSource=admin
  ```

---

## 🔐 Step 3: Secure MongoDB Access via UFW

```bash
# Allow only specific IPs
sudo ufw allow from 192.168.0.10 to any port 27017

# Deny open access to others
sudo ufw deny 27017
```

---

## 📊 Step 4: Visual Monitoring with Portainer

### Install Portainer

```bash
docker volume create portainer_data

docker run -d -p 9100:9000 --name=portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce
```

Then open your browser:

```
http://<your-server-ip>:9100
```

- Set up admin password
- Navigate to your containers → `mongodb`
- View live: CPU, RAM, logs, stats

---

## 💾 Step 5: Automated MongoDB Backups

Backup types:

1. **Daily Full Backup** – archive format
2. **Daily Foldered Dump** – BSON by day
3. **Hourly Backups** – BSON every hour

Scripts are stored in `/home/akash/scripts`

### Create Scripts Directory

```bash
mkdir -p /home/akash/scripts
```

### 📦 mongo-full-backup.sh

```bash
#!/bin/bash
DATE=$(date +%F)
mkdir -p ~/mongo-backups/daily

docker exec mongodb mongodump \
  --username=admin \
  --password=strongpassword \
  --authenticationDatabase=admin \
  --archive=/data/db/backup.archive \
  --gzip

docker cp mongodb:/data/db/backup.archive ~/mongo-backups/daily/full-${DATE}.archive.gz
```

### 📂 mongo-bydate-backup.sh

```bash
#!/bin/bash
DATE=$(date +%F)
mkdir -p ~/mongo-backups/by-date/${DATE}

docker exec mongodb mongodump \
  --username=admin \
  --password=strongpassword \
  --authenticationDatabase=admin \
  --gzip --out=/data/db/temp-backup

docker cp mongodb:/data/db/temp-backup ~/mongo-backups/by-date/${DATE}
```

### ⏱ mongo-hourly-backup.sh

```bash
#!/bin/bash
HOUR=$(date +"%F_%H")
mkdir -p ~/mongo-backups/hourly/${HOUR}

docker exec mongodb mongodump \
  --username=admin \
  --password=strongpassword \
  --authenticationDatabase=admin \
  --gzip --out=/data/db/temp-hourly

docker cp mongodb:/data/db/temp-hourly ~/mongo-backups/hourly/${HOUR}
```

### 🧹 mongo-cleanup.sh

```bash
#!/bin/bash
find ~/mongo-backups/hourly/ -type d -mtime +30 -exec rm -rf {} \;
find ~/mongo-backups/daily/ -type f -mtime +30 -delete
find ~/mongo-backups/by-date/ -mindepth 1 -maxdepth 1 -type d -mtime +30 -exec rm -rf {} \;
```

Make scripts executable:

```bash
chmod +x /home/akash/scripts/*.sh
```

---

## ⏲️ Step 6: Automate via `cron`

```bash
crontab -e
```

Paste:

```cron
0 2 * * * /bin/bash /home/akash/scripts/mongo-full-backup.sh
0 3 * * * /bin/bash /home/akash/scripts/mongo-bydate-backup.sh
0 * * * * /bin/bash /home/akash/scripts/mongo-hourly-backup.sh
30 3 * * * /bin/bash /home/akash/scripts/mongo-cleanup.sh
```

---

## 🔁 Step 7: Manual Testing Commands

```bash
bash /home/akash/scripts/mongo-full-backup.sh
bash /home/akash/scripts/mongo-bydate-backup.sh
bash /home/akash/scripts/mongo-hourly-backup.sh
```

---

## ☁️ Step 8: Offsite Backup (Optional)

```bash
rsync -avz ~/mongo-backups/ user@192.168.0.100:/remote/backup/location/
```

---

## 🧪 Step 9: Restore Example

```bash
mongorestore \
  --gzip \
  --archive=~/mongo-backups/daily/full-2025-05-13.archive.gz \
  --nsInclude='yourdb.*' \
  --username=admin \
  --password=strongpassword \
  --authenticationDatabase=admin
```

---

Now you're fully set to run, monitor, and back up your MongoDB stack using Docker on any Ubuntu server.

---

## ⚠️ Common Errors Faced & Fixes

### ❌ Error: Port already in use (e.g., 27017, 9000)

**Cause:** Docker couldn't start a container because the port is already used.
**Fix:**

```bash
sudo lsof -i :9000
# or
sudo netstat -tuln | grep 9000
```

Then stop/remove the process or change the Docker port mapping (e.g., use `-p 9100:9000`).

### ❌ Error: Container name conflict `/portainer` already in use

**Fix:**

```bash
docker rm -f portainer
```

### ❌ Error: `address already in use` on `docker compose up`

**Fix:** Something else is using the MongoDB port. Check with:

```bash
sudo lsof -i :27017
```

Then stop the conflicting service or change Docker port to something else.

### ❌ mongodump error: `(Unauthorized) command listDatabases requires authentication`

**Fix:** Add credentials explicitly to `mongodump`:

```bash
--username=admin --password=strongpassword --authenticationDatabase=admin
```

### ❌ docker cp error: `requires 2 arguments`

**Fix:** Ensure `docker cp` has exactly two paths (SRC and DEST). For example:

```bash
docker cp mongodb:/data/db/temp-backup ~/mongo-backups/by-date/${DATE}
```

### ❌ docker cp error: `Could not find the file /data/db/temp-backup`

**Fix:** This happens when `mongodump` writes to a different path than what you're copying. Ensure both paths match.

### ❌ MongoDB URI works in shell but not in app

**Fix:** Use `authSource=admin` in URI:

```bash
mongodb://admin:strongpassword@localhost:27017/yourdb?authSource=admin
```

### ❌ Mongo Express or app can't connect to MongoDB

**Fix:**

- If inside Docker, use `mongo` as hostname.
- If outside (from host or other device), use `localhost` or `192.168.x.x` with `authSource` param.

### ❌ Can't access Portainer: browser shows connection refused

**Fix:** Port 9000 may be blocked or used.

- Use `docker rm -f portainer` and rerun on `-p 9100:9000`
- Access via `http://<server-ip>:9100`

These were all encountered while building and testing this setup.
