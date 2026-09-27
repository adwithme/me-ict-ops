---
title: "How to Install Windows 10"
date: 2020-07-26
description: "Complete step-by-step guide to installing Windows 10 - from creating bootable media to post-installation setup, drivers, and activation."
tags: ["Windows", "Windows 10", "Installation", "Bootable USB", "Drivers", "Activation", "Setup"]
categories: ["Windows", "Installation", "Deployment"]
draft: false
toc: true
---

## Prerequisites

- **USB Drive**: 8 GB minimum
- **Windows 10 ISO** or internet for Media Creation Tool
- **Product Key** (or install without for trial)
- **Backup** important data first

---

## Step 1: Create Bootable USB

### Option A: Media Creation Tool (Official)

1. Download from [Microsoft Windows 10 Download](https://www.microsoft.com/software-download/windows10)
2. Run `MediaCreationTool.exe` as Administrator
3. **"Create installation media for another PC"**
4. Select: Language, Edition (Windows 10), Architecture (64-bit)
5. Choose **USB flash drive** → Select drive → **Next**
6. Wait for download & creation (~10-30 min)

### Option B: Rufus (Advanced)

1. Download [Rufus](https://rufus.ie/)
2. Select USB → Select Windows 10 ISO
3. **Partition**: GPT (UEFI) or MBR (Legacy)
4. **File System**: NTFS
5. **Start**

---

## Step 2: Boot from USB

### BIOS/UEFI Settings

| Setting | Value |
|---------|-------|
| **Boot Mode** | UEFI (recommended) or Legacy/CSM |
| **Secure Boot** | Enabled (UEFI) |
| **Boot Order** | USB first |
| **Fast Boot** | Disabled |

### Boot Process

1. Insert USB → Restart PC
2. Press boot key (F12, F11, F8, Esc, Del - varies by manufacturer)
3. Select USB drive → Enter
4. Windows Setup loads → **Next**

---

## Step 3: Installation

### 1. Language & Region

- Language: **English (United States)**
- Time format: **English (United States)**
- Keyboard: **US** → **Next**

### 2. Install Now

- Click **Install now**

### 3. Product Key

- Enter key **OR** click **"I don't have a product key"**
- Select edition: **Windows 10 Home** or **Pro** → **Next**

### 4. License Terms

- ✅ **I accept** → **Next**

### 5. Installation Type

- **Custom: Install Windows only (advanced)**

### 6. Drive Selection

| Scenario | Action |
|----------|--------|
| **Clean install (new SSD/HDD)** | Select **Unallocated Space** → **New** → **Apply** → Creates System Reserved + Primary |
| **Replace existing Windows** | Select each partition → **Delete** → **Unallocated Space** → **New** |
| **Dual boot** | Select free space → **New** → Don't touch other OS partitions |

> ⚠️ **Warning**: Deleting partitions destroys data. Backup first!

### 7. Installation

- Windows copies files, expands, installs features, updates
- **PC restarts several times** - **Do not remove USB** until desktop appears

---

## Step 4: Out-of-Box Experience (OOBE)

### 1. Region & Keyboard

- Region → **Yes**
- Keyboard layout → **Yes**
- Second keyboard? → **Skip**

### 2. Network

- Connect Wi-Fi/Ethernet → **Next**
- **Skip for now** if no internet (local account)

### 3. Account Setup

**With Internet (Microsoft Account):**
- Sign in with Microsoft/Outlook/Hotmail
- Create PIN → **Next**

**Without Internet (Local Account):**
- **"I don't have internet"** → **Continue with limited setup**
- Enter name → Password (optional) → Security questions

### 4. Privacy Settings

Review each toggle (recommend **Off** for most):
- Location
- Diagnostic data
- Tailored experiences
- Advertising ID
- Speech recognition
- Inking & typing
- Find my device

---

## Step 5: Post-Installation

### 1. Windows Update

**Settings → Update & Security → Windows Update → Check for updates**
- Install all **Critical** and **Optional** updates
- Restart as needed

### 2. Drivers

**Priority Order:**
1. **Chipset** (motherboard manufacturer)
2. **Graphics** (NVIDIA/AMD/Intel)
3. **Audio** (Realtek/manufacturer)
4. **Network** (LAN/Wi-Fi)
5. **USB/Peripherals**

**Best Sources:**
- Motherboard vendor site (ASUS, MSI, Gigabyte, ASRock)
- GPU vendor (NVIDIA GeForce Experience, AMD Adrenalin)
- Windows Update (Optional updates)

### 3. Essential Software

| Category | Recommendations |
|----------|-----------------|
| **Browser** | Firefox, Chrome, Edge |
| **Archive** | 7-Zip, WinRAR |
| **Media** | VLC, MPC-BE |
| **Code Editor** | VS Code, Notepad++ |
| **System** | HWMonitor, CPU-Z, CrystalDiskInfo |
| **Security** | Windows Defender (built-in), Malwarebytes |

### 4. Activation

**Settings → Update & Security → Activation**

| Method | Steps |
|--------|-------|
| **Digital License** | Auto-activates if same hardware |
| **Product Key** | **Change product key** → Enter 25-char key |
| **Troubleshoot** | **Troubleshoot** → Run activator |

### 5. Optimize

**Settings → System → Storage → Configure Storage Sense**
- ✅ **Run automatically**
- ✅ **Delete temporary files**
- ✅ **Delete Recycle Bin (30 days)**

**Disable Startup Apps:**
- **Task Manager → Startup** → Disable unnecessary

**Power Plan:**
- **Control Panel → Power Options → High Performance** (desktop)
- **Balanced** (laptop)

---

## Step 6: Backup & Recovery

### Create Recovery Drive

1. Search **"Recovery Drive"** → Run as Admin
2. ✅ **Back up system files** → **Next**
3. Select USB (16 GB+) → **Create**

### System Image Backup

**Control Panel → Backup and Restore (Windows 7) → Create system image**

### File History

**Settings → Update & Security → Backup → Add a drive**

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **USB not detected** | Try different port; disable Fast Boot; update BIOS |
| **"Drive not found"** | Load RAID/Storage drivers (F6); check SATA mode (AHCI) |
| **"Can't install on this disk"** | Convert MBR↔GPT: `diskpart` → `clean` → `convert gpt` |
| **Stuck at "Getting files ready"** | Wait (can take 30+ min); check USB activity light |
| **No drivers for Wi-Fi** | Use Ethernet; download on another PC; transfer via USB |
| **Activation fails** | Run `slmgr /ato` in Admin CMD; check internet |

---

## Clean Install vs Upgrade

| Aspect | Clean Install | Upgrade |
|--------|---------------|---------|
| **Performance** | Best | Good |
| **Issues** | Fewest | May carry over |
| **Time** | 1-2 hours | 1-3 hours |
| **Data** | Must backup | Preserved |
| **Drivers** | Fresh install | May need updates |

---

## Windows 10 Editions

| Edition | Target | Key Features |
|---------|--------|--------------|
| **Home** | Consumers | Core features, Windows Hello, Gaming |
| **Pro** | Professionals | BitLocker, Remote Desktop, Group Policy, Hyper-V |
| **Enterprise** | Organizations | LTSC, AppLocker, DirectAccess |
| **Education** | Schools | Similar to Enterprise |
| **Workstation** | Power users | ReFS, Persistent Memory, Faster file sharing |

---

## Resources

- [Windows 10 Download](https://www.microsoft.com/software-download/windows10)
- [Windows 10 Specifications](https://www.microsoft.com/windows/windows-10-specifications)
- [Rufus](https://rufus.ie/)
- [Driver Installation Order](https://www.howtogeek.com/162134/in-what-order-should-you-install-your-drivers/)
- [Windows 10 Activation](https://support.microsoft.com/en-us/windows/activate-windows-10-3d126188-3e0c-4f9d-8f6a-5b5b5b5b5b5b)

---

## Related Articles

- [Creating Bootable USB for Windows 11](/knowledge/creating-bootable-usb-windows11/)
- [Motherboard Beep Codes](/knowledge/motherboard-beep-codes/)
- [Linux File Systems](/knowledge/linux-file-systems/)