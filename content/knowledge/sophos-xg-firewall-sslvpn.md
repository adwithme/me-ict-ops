---
title: "SOPHOS XG Firewall SSLVPN Configuration"
date: 2022-08-05
description: "Step-by-step guide to configuring SSL VPN on Sophos XG Firewall for secure remote access with user authentication, client settings, and policy rules."
tags: ["Firewall", "Sophos", "SSL VPN", "Remote Access", "Network Security", "VPN"]
topics: ["Network Security", "Firewall", "VPN"]
draft: false
toc: true
---

Sophos XG Firewall provides SSL VPN for secure remote access. This guide covers the complete configuration from user authentication to client deployment and access policies.

## Prerequisites

- Sophos XG Firewall (SFOS 18.0+)
- Admin access to WebAdmin console
- Valid SSL certificate (public CA or self-signed for testing)
- User accounts/groups configured (local, AD, RADIUS, LDAP)
- WAN interface with static IP or DDNS

## Configuration Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Remote    │────▶│  Sophos XG   │────▶│  Internal   │
│   User      │ SSL │  Firewall    │     │  Resources  │
│  (Client)   │ VPN │              │     │  (LAN/DMZ)  │
└─────────────┘     └──────────────┘     └─────────────┘
```

## Step 1: Certificate Setup

### Option A: Public CA Certificate (Recommended)

1. **System > Certificates > Add Certificate**
2. **Type**: External Certificate
3. **Upload**: Certificate + Private Key + Chain
3. **Name**: `SSLVPN-Public-Cert`

### Option B: Self-Signed (Lab Only)

1. **System > Certificates > Add Certificate**
2. **Type**: Self-Signed
3. **Subject**: `CN=vpn.yourdomain.com`
4. **SAN**: `DNS:vpn.yourdomain.com, IP:203.0.113.10`
5. **Usage**: SSL VPN

## Step 2: User/Group Configuration

### Local Users

1. **Authentication > Users > Add User**
2. **Name**: `jdoe`
3. **Password**: Strong password
4. **Groups**: `SSLVPN-Users`

### Active Directory Integration

1. **Authentication > Servers > Add > Active Directory**
2. **Server IP**: `192.168.1.10`
3. **Bind DN**: `CN=svc_sophos,OU=Service Accounts,DC=corp,DC=local`
4. **Base DN**: `OU=Users,DC=corp,DC=local`
5. **Test Connection**

### SSL VPN User Group

1. **Authentication > Groups > Add Group**
2. **Name**: `SSLVPN-Users`
3. **Type**: Authentication Group
4. **Members**: Add AD group `VPN-Users` or local users
5. **OTP**: Enable if using Sophos Authenticator

## Step 3: SSL VPN Portal Configuration

### General Settings

**VPN > SSL VPN (Remote Access) > General**

| Setting | Value |
|---------|-------|
| Enable SSL VPN | ✅ |
| Listen on Interface | WAN (Port1) |
| Port | 443 (or 4443 if 443 used) |
| Certificate | `SSLVPN-Public-Cert` |
| Allowed Networks | `192.168.10.0/24` (VPN client pool) |

### Client Settings

**VPN > SSL VPN (Remote Access) > Client Settings**

| Setting | Value |
|---------|-------|
| Name | `Corporate-VPN` |
| Description | `Company Remote Access` |
| IP Address Range | `192.168.10.100-192.168.10.200` |
| Subnet Mask | `255.255.255.0` |
| DNS Servers | `192.168.1.10, 192.168.1.11` |
| DNS Suffix | `corp.local` |
| Split Tunneling | ✅ (Recommended) |
| Split Tunnel Networks | `192.168.1.0/24, 10.0.0.0/8` |

### Portal Layout

**VPN > SSL VPN (Remote Access) > Portal**

- **Bookmarks**: Add RDP, SSH, Web apps, File shares
- **Customization**: Logo, welcome message, colors
- **Client Download**: Auto-detect OS, direct links

## Step 4: Authentication Policies

### Two-Factor Authentication (Recommended)

1. **Authentication > One-time Passwords > Enable**
2. **Sophos Authenticator App** - Push/TOTP
3. **SMS/Email** - Alternative delivery
3. **Apply to Group**: `SSLVPN-Users`

### Authentication Rule

**Rules and Policies > Authentication > Add Rule**

| Setting | Value |
|---------|-------|
| Name | `SSLVPN-Auth` |
| Type | User/Network |
| Source | `SSLVPN-Users` |
| Destination | `Any` |
| Service | `SSLVPN` |
| Action | Authenticate |
| OTP | Required |

## Step 5: Firewall Rules for VPN Traffic

### Allow VPN to LAN

**Rules and Policies > Firewall Rules > Add Rule**

| Setting | Value |
|---------|-------|
| Name | `VPN-to-LAN` |
| Source Zone | `VPN` |
| Source Network | `SSLVPN-Range` (192.168.10.0/24) |
| Destination Zone | `LAN` |
| Destination Network | `192.168.1.0/24` |
| Service | `Any` (or restrict: RDP, SMB, HTTP/S) |
| Action | Accept |
| Log | ✅ |

### Allow VPN to Internet (If Full Tunnel)

**Rules and Policies > Firewall Rules > Add Rule**

| Setting | Value |
|---------|-------|
| Name | `VPN-to-WAN` |
| Source Zone | `VPN` |
| Source Network | `SSLVPN-Range` |
| Destination Zone | `WAN` |
| Service | `Any` |
| Action | Accept |
| NAT | `MASQ` (WAN IP) |

### Block VPN to Management

**Rules and Policies > Firewall Rules > Add Rule (Higher Priority)**

| Setting | Value |
|---------|-------|
| Name | `Block-VPN-Management` |
| Source Zone | `VPN` |
| Destination | `Firewall Management IPs` |
| Action | Drop |
| Log | ✅ |

## Step 6: Client Deployment

### Windows/macOS

1. User browses to `https://vpn.yourdomain.com:4443`
2. Login with credentials + OTP
3. Download **Sophos Connect** client
4. Install, import configuration, connect

### Mobile (iOS/Android)

1. Install **Sophos Connect** from App Store/Play Store
2. Scan QR code from portal or enter manually:
   - Server: `vpn.yourdomain.com:4443`
   - Username/Password + OTP

### Silent Deployment (Windows)

```powershell
# Download MSI from portal
# Deploy via Intune/GPO/SCCM
msiexec /i "SophosConnect.msi" /qn SERVER="vpn.yourdomain.com:4443" USER="%USERNAME%"
```

## Step 7: Monitoring & Troubleshooting

### Live Connections

**VPN > SSL VPN (Remote Access) > Live Users**

- View: Username, IP, Connected Since, Bytes In/Out
- Actions: Disconnect, Block

### Logs

**Log & Reports > VPN > SSL VPN**

| Log Type | Purpose |
|----------|---------|
| Connection | Login/logout, duration, IP |
| Authentication | Success/failure, OTP |
| Traffic | Bytes, protocols, destinations |

### Common Issues

| Issue | Resolution |
|-------|------------|
| "Certificate not trusted" | Use public CA cert; install root on clients |
| "Authentication failed" | Check AD bind, UPN format, group membership |
| "No IP assigned" | Check IP pool range, DHCP conflicts |
| "Cannot reach LAN" | Verify firewall rule, split tunnel networks |
| "Client won't install" | Windows: run as admin; macOS: allow in Security & Privacy |

### Debug Commands (CLI)

```bash
# Check SSL VPN status
system vpn sslvpn show

# Live connections
system vpn sslvpn live-users show

# Debug authentication
log view subsystem authentication

# Packet capture
tcpdump -i any -w sslvpn.pcap port 443
```

## Security Hardening

1. **Enforce 2FA** - Mandatory for all VPN users
2. **Restrict by GeoIP** - Block high-risk countries
3. **Limit Concurrent Sessions** - 1 per user
4. **Idle Timeout** - 30 min idle, 8 hr max session
5. **Posture Check** - Require AV, firewall, patching (via Sophos Intercept X)
6. **Certificate Pinning** - In Sophos Connect config
7. **Regular Log Review** - Alert on failed auth spikes

## Resources

- [Sophos XG SSL VPN Admin Guide](https://docs.sophos.com/nsg/sophos-firewall/18.5/SSLVPN/index.html)
- [Sophos Connect Client Downloads](https://www.sophos.com/en-us/products/secure-remote-access.aspx)
- [Sophos Community - VPN](https://community.sophos.com/intercept-x-endpoint/f/sophos-connect)
- [KB: SSL VPN Troubleshooting](https://support.sophos.com/support/s/article/KB-000035647)