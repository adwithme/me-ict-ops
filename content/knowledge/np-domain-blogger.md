---
title: "How to Connect .com.np Domain to Blogger"
date: 2022-06-24
description: "Step-by-step guide to registering a free .com.np domain and connecting it to Google Blogger with custom DNS configuration."
tags: ["Nepal", ".np Domain", "Blogger", "DNS", "Domain Configuration", "Free Domain"]
topics: ["Nepal", "Web Development", "Blogger", "Domain"]
draft: false
toc: true
---

Nepal's **`.com.np`** domain is free for Nepali citizens and organizations. This guide shows how to register and connect it to Google Blogger.

## Prerequisites

- **Citizenship/Passport** - Scanned copy
- **Email & Phone** - For verification
- **Google Account** - For Blogger
- **Domain Name Idea** - Check availability

## Step 1: Register .com.np Domain

### 1. Visit Register.com.np

Go to: **`https://register.com.np`**

### 2. Check Availability

Enter desired domain (e.g., `yourname.com.np`)

### 3. Fill Registration Form

| Field | Details |
|-------|---------|
| **Domain** | Your chosen `.com.np` |
| **Name** | As per citizenship |
| **Email** | Valid email |
| **Phone** | Nepali number |
| **Citizenship** | Upload scan (max 2MB) |
| **Purpose** | Personal/Business/Organization |

### 4. Submit & Wait

- **Processing**: 1-3 business days
- **Approval**: Email notification
- **Login**: Credentials sent via email

## Step 2: Configure DNS for Blogger

### 1. Login to Register.com.np

Use credentials from approval email.

### 2. Manage Domain → DNS Management

### 3. Add Custom Resource Records

**For root domain (`yourdomain.com.np`):**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **A** | `@` | `216.239.32.21` | 3600 |
| **A** | `@` | `216.239.34.21` | 3600 |
| **A** | `@` | `216.239.36.21` | 3600 |
| **A** | `@` | `216.239.38.21` | 3600 |

**For www subdomain (`www.yourdomain.com.np`):**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **CNAME** | `www` | `ghs.google.com` | 3600 |

### 4. Save Changes

DNS propagation: **Up to 24-48 hours** (usually faster)

## Step 4: Configure Blogger

### 1. Open Blogger Settings

Go to: **Settings** → **Custom Domain**

### 2. Enter Your Domain

Type: `www.yourdomain.com.np` → **Save**

### 3. Fix Redirect Error (If Appears)

If "Authority not found" error:

1. Blogger shows **two CNAME records** needed
2. Copy both `Name/Label` and `Destination/Target`
3. Add to Register.com.np DNS:
   - **CNAME 1**: `www` → `ghs.google.com`
   - **CNAME 2**: (Blogger's unique code) → (Blogger's unique target)
4. Save DNS → Wait → Refresh Blogger

### 4. Enable HTTPS

Settings → **HTTPS** → ✅ **HTTPS Availability** → ✅ **HTTPS Redirect**

## Step 5: Verify

Visit: `https://www.yourdomain.com.np`

Should show your Blogger blog with valid SSL.

## Common Issues

| Issue | Solution |
|-------|----------|
| "Domain not registered" | Wait for DNS propagation (24-48h) |
| "CNAME mismatch" | Check exact values from Blogger |
| SSL not working | Enable in Blogger settings, wait 1h |
| Email not received | Check spam, verify citizenship upload |

## Resources

- [Register.com.np](https://register.com.np)
- [Blogger Custom Domain Help](https://support.google.com/blogger/answer/1233382)
- [Google DNS IPs](https://developers.google.com/speed/public-dns/docs/using)

## Related

- [Online Mobile Registration Nepal](/knowledge/imei-registration-in-nepal/)
- [Motherboard Beep Codes](/knowledge/motherboard-beep-codes/)