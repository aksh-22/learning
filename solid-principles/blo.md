### Proposal: Using a Separate Notification System vs Built-in NAV 2013 Email Notifications

#### ✅ Summary Recommendation

We recommend building a **separate backend notification service** instead of relying on **NAV 2013's built-in email functionality**, even at the current volume of 100 emails/month. This ensures long-term scalability, observability, flexibility, and future-proofing as we scale to 5,000–30,000 emails/month.

---

### 📊 Current & Future Email Volume

- **Now**: ~100 emails/month
- **Expected (Near Future)**: ~5,000 emails/month
- **Scalable Goal**: ~20,000–30,000 emails/month

---

### 🔍 Comparison: NAV 2013 vs F&O vs Separate Notification System

| Feature/Aspect              | NAV 2013 Built-in Email | Dynamics 365 F&O Email       | Separate Backend Service                     |
| --------------------------- | ----------------------- | ---------------------------- | -------------------------------------------- |
| **Email Volume Support**    | ❌ Low                  | ✅ Moderate                  | ✅ High (scales easily)                      |
| **Template Flexibility**    | ❌ Hardcoded            | ✅ Basic templating          | ✅ Advanced HTML templating                  |
| **Multi-language Support**  | ❌ None                 | ⚠️ Limited                   | ✅ Full i18n with fallback logic             |
| **Retry Mechanism**         | ❌ None                 | ⚠️ Limited                   | ✅ With exponential backoff                  |
| **Logging & Monitoring**    | ❌ Absent               | ⚠️ Basic batch logs          | ✅ Detailed per-email logging                |
| **Queueing System**         | ❌ No                   | ✅ Email distributor batches | ✅ Queued with Redis/BullMQ                  |
| **Delivery Insights**       | ❌ None                 | ⚠️ Manual                    | ✅ Built-in via provider API (e.g. SendGrid) |
| **Integration Complexity**  | ✅ Simple (native)      | ✅ Built-in                  | ⚠️ Requires initial setup                    |
| **Security/Compliance**     | ✅ Internal system      | ✅ Configurable              | ⚠️ Needs HTTPS, access control               |
| **Scalability**             | ❌ Not scalable         | ⚠️ Mid-level                 | ✅ Horizontal scaling possible               |
| **Multi-channel (SMS etc)** | ❌ No                   | ❌ Not native                | ✅ Addable: SMS, WhatsApp, etc.              |

---

### ❌ Limitations of NAV 2013 Built-in Email

| Limitation                       | Impact                                                |
| -------------------------------- | ----------------------------------------------------- |
| No Queuing                       | Risk of timeout or failure during mass email dispatch |
| No Retry Logic                   | Failed emails go undetected and are not retried       |
| No Template Support              | Hard-coded emails, no dynamic formatting              |
| Poor Debugging                   | No logs or delivery status tracking                   |
| No Multi-Language or Preferences | Not user-friendly or personalized                     |

---

### ✅ Why a Separate Notification System is Better

| Advantage            | Benefit                                     |
| -------------------- | ------------------------------------------- |
| Queue Management     | Avoids overload, enables retries            |
| Logging & Monitoring | Track status, handle failures proactively   |
| Dynamic Templates    | HTML-rich, multi-language support           |
| Easy Integration     | Decoupled via API or DB polling             |
| Multi-Channel Future | Ready for SMS, WhatsApp, push notifications |
| SendGrid/SES Support | Use scalable email providers                |

---

### 📚 Supporting Blogs & Articles

- **Knock Blog**: https://knock.app/blog/build-v-buy-notifications
- **Courier Blog**: https://www.courier.com/blog/build-vs-buy-whats-better-for-a-transactional-email-notification-service
- **Novu Blog**: https://novu.co/blog/build-vs-buy/
- **Engagespot**: https://engagespot.co/blog/why-building-a-notification-system-is-complex

These articles highlight:

- Pain of building notification logic into core systems (like ERP)
- Importance of logging, delivery handling, preference management
- Why external systems scale better and evolve with user expectations

---

### ⚠️ Objections to Separate System (and How to Handle)

| Concern                                        | How We Handle It                                                      |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| "Security risks in moving data out of ERP"     | Use HTTPS, send minimal fields (no PII), add audit logging            |
| "Too complex to integrate with NAV 2013"       | Trigger via Job Queue or polling custom table using API calls         |
| "Feels like over-engineering for small volume" | Start with 2–3 templates + lightweight Node/NestJS setup, scale later |
| "Debugging will be harder outside ERP"         | Add correlation IDs + real-time email log dashboard                   |

---

### 💡 Suggested Tech Stack

- **Backend**: NestJS with BullMQ
- **Queue**: Redis or in-memory fallback
- **Email Providers**: SendGrid (easy templating), or SES (cost-effective)
- **Integration Options**:
  - NAV writes to `EmailQueue` table → backend polls & sends
  - NAV calls backend API directly (via COM/.NET call or middleware)

---

### ✅ Conclusion

Implementing a separate notification service now gives us:

- More control
- Better error handling
- Future readiness (scalable from 5k to 30k emails/month)

It helps reduce technical debt, uncouples email logic from ERP, and creates a robust base for future communication features (SMS, multilingual emails, push notifications).

---

Let me know if you'd like a diagram or slides to present this to leadership.
