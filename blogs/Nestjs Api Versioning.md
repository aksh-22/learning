# API Versioning in NestJS: A Practical Guide

API versioning is like a superhero’s **power upgrade**—you don’t want Iron Man to still be using his Mark 1 suit when fighting Thanos, right? Similarly, as your application evolves, your APIs need to **level up** while ensuring older versions still work for existing users.

NestJS provides built-in support for API versioning, making it easy to manage multiple versions of your API while keeping the chaos under control. In this article, we’ll explore **how to implement API versioning in NestJS using URI-based versioning** with a fun superhero-themed example.

---

## Why API Versioning?

Imagine you’re running **Avengers HQ**, and you have an API that provides details about superheroes. Your initial API version (`v1`) lists all superheroes. But as new threats emerge, you decide to enhance the data with their **power levels and origin stories**. Instead of breaking old functionality, you introduce a **new version (`v2`)** with these enhancements.

Without API versioning, older clients (perhaps Nick Fury’s vintage systems) would break when they try to fetch superhero data. But with versioning, everyone gets what they need!

---

## Setting Up API Versioning in NestJS

NestJS provides built-in support for API versioning through the `enableVersioning` method. Let’s walk through the implementation step by step.

### Step 1: Enable API Versioning in the Main Application

Modify the `bootstrap` function in your `main.ts` file to enable API versioning using the `VersioningType.URI` strategy:

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Versioning
  app.enableVersioning({
    type: VersioningType.URI, // Using URL versioning strategy
  });

  await app.listen(3000);
}
bootstrap();
```

Here, we use **URI-based versioning**, meaning API versions are specified in the URL (e.g., `/v1/superheroes` and `/v2/superheroes`). Other versioning strategies supported by NestJS include **Header Versioning**, **Media Type Versioning**, and **Custom Versioning**.

---

### Step 2: Define Versioned Endpoints in the Controller

Now, let’s define our **superhero API** with different versions.

```typescript
import { Controller, Get, Version } from "@nestjs/common";

@Controller("superheroes")
export class SuperheroesController {
  @Get()
  @Version("1") // Version 1 API
  getHeroesV1() {
    return [
      { name: "Iron Man", alias: "Tony Stark" },
      { name: "Spider-Man", alias: "Peter Parker" },
    ];
  }

  @Get()
  @Version("2") // Version 2 API
  getHeroesV2() {
    return [
      {
        name: "Iron Man",
        alias: "Tony Stark",
        powerLevel: 95,
        origin: "Earth",
      },
      {
        name: "Spider-Man",
        alias: "Peter Parker",
        powerLevel: 85,
        origin: "Earth",
      },
    ];
  }
}
```

Here’s what happens:

- `GET /v1/superheroes` returns basic superhero details.
- `GET /v2/superheroes` returns **enhanced** superhero data, including their power levels and origins.

So, old clients (like **SHIELD agents**) can still use `v1`, while newer systems (**Stark Industries AI**) can take advantage of the upgraded version.

---

## Testing the Versioned APIs

Start your NestJS application:

```sh
npm run start
```

Now, test the endpoints using **Postman, cURL, or a browser**:

### API v1 Request:

```sh
curl http://localhost:3000/v1/superheroes
```

**Response:**

```json
[
  { "name": "Iron Man", "alias": "Tony Stark" },
  { "name": "Spider-Man", "alias": "Peter Parker" }
]
```

### API v2 Request:

```sh
curl http://localhost:3000/v2/superheroes
```

**Response:**

```json
[
  {
    "name": "Iron Man",
    "alias": "Tony Stark",
    "powerLevel": 95,
    "origin": "Earth"
  },
  {
    "name": "Spider-Man",
    "alias": "Peter Parker",
    "powerLevel": 85,
    "origin": "Earth"
  }
]
```

---

## Conclusion

API versioning is the **superpower** that keeps your APIs stable while allowing for evolution. With NestJS, implementing versioning is as easy as snapping your fingers (but without wiping out half the users). We explored **URI-based versioning**, but NestJS also supports **Header-based and Media-type versioning**, depending on your needs.

By introducing API versioning early, you ensure a **smooth upgrade path for clients** (whether they’re superheroes or just regular developers) and make your APIs more **scalable and maintainable**. Now go forth and build your **Avengers-grade** API!

---

## FAQs

### 1. What are the different API versioning strategies in NestJS?

NestJS supports **four** versioning strategies:

- **URI Versioning** (`/v1/resource`)
- **Header Versioning** (`Accept-Version` header)
- **Media Type Versioning** (`Accept: application/vnd.myapi.v1+json`)
- **Custom Versioning** (define your own logic)

### 2. When should I use API versioning?

Use API versioning when you need to introduce **breaking changes** while keeping existing clients functional. It’s crucial for long-term API maintenance and backward compatibility.

### 3. Can I use multiple versioning strategies together?

Yes! NestJS allows **hybrid versioning**, meaning you can combine URI, Header, and Media Type versioning if needed.

### 4. Does API versioning affect performance?

The impact is **minimal**, as NestJS efficiently resolves versions before handling the request. However, choosing the right strategy (like **URI-based** for simplicity or **Header-based** for flexibility) can help optimize API performance.

### 5. What happens if a client requests an unsupported API version?

NestJS will return a `404 Not Found` response by default. However, you can **customize the behavior** using exception filters to provide meaningful responses.

---

By making your API versioning **SEO-friendly** and answering common questions, you’ll help more developers discover and understand this powerful feature. 🚀
