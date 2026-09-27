---
title: "Creating Bootable USB Drive of Windows 11 on Any PC"
date: 2022-08-04
description: "Create a Windows 11 bootable USB with Media Creation Tool, Rufus or the command line. TPM and Secure Boot bypass notes for unsupported hardware."
tags: ["Windows", "Windows 11", "Bootable USB", "Installation", "Rufus", "Media Creation Tool", "TPM Bypass"]
categories: ["Windows", "Installation", "Deployment"]
draft: false
toc: true
---

Creating a Windows 11 bootable USB is straightforward with several methods available. This guide covers all approaches including the official tool, third-party utilities, and command-line methods.

## Requirements

- **USB Drive**: 8 GB minimum (16 GB recommended)
- **Windows 11 ISO** or internet connection for Media Creation Tool
- **Target PC**: Check compatibility (see bypass section for unsupported hardware)

## Method 1: Media Creation Tool (Official, Easiest)

### Steps

1. **Download** from [Microsoft Windows 11 Download](https://www.microsoft.com/software-download/windows11)
2. **Run** `MediaCreationToolW11.exe` as Administrator
3. **Accept** license terms
4. **Select** "Create installation media for another PC"
5. **Choose**: Language, Edition (Windows 11), Architecture (64-bit)
6. **Select** "USB flash drive"
7. **Choose** your USB drive
8. **Wait** for download and creation (~10-30 min)

### Advantages
- Official Microsoft tool
- Always latest version
- Handles drivers automatically

### Limitations
- Requires internet
- No customization options
- TPM 2.0/Secure Boot enforced

## Method 2: Rufus (Advanced, Recommended)

### Download

[Rufus](https://rufus.ie/) - Portable, no installation required

### Standard Windows 11 USB

1. **Select** USB drive
2. **Boot selection**: "Disk or ISO image" → Select Windows 11 ISO
3. **Partition scheme**: GPT (UEFI) or MBR (Legacy BIOS)
4. **Target system**: UEFI (non-CSM) or BIOS (CSM)
5. **File system**: NTFS (for >4GB install.wim) or FAT32
6. **Cluster size**: Default (4096 bytes)
7. **Start** → Confirm data destruction

### Windows 11 on Unsupported Hardware (TPM/Secure Boot Bypass)

**⚠️ Use at your own risk. Microsoft may not support this configuration.**

1. **Select** Windows 11 ISO
2. **Image option**: "Extended Windows 11 Installation (no TPM/no Secure Boot/8GB- RAM)"
3. **Partition scheme**: GPT
4. **Target system**: UEFI (non-CSM)
4. **File system**: NTFS
5. **Start**

**What this does**:
- Removes TPM 2.0 check
- Removes Secure Boot check
- Removes 4GB RAM minimum
- Removes 64GB storage minimum
- Creates `autounattend.xml` with bypass settings

### Rufus Command Line (Automation)

```cmd
rufus.exe -d "USB_DRIVE_LETTER:" -i "path\to\windows11.iso" -p "gpt" -s "uefi" -f "ntfs" --label "WIN11_INSTALL" --no-tpm --no-secure-boot --no-ram-check
```

## Method 3: Command Line (PowerShell/DISM)

### Prerequisites

- Windows 11 ISO mounted or extracted
- USB drive identified

### Steps

```powershell
# 1. Identify USB disk
Get-Disk | Where-Object BusType -eq "USB"
# Note disk number (e.g., Disk 2)

# 2. Clean and format
$diskNumber = 2
Clear-Disk -Number $diskNumber -RemoveData -RemoveOEM -Confirm:$false
New-Partition -DiskNumber $diskNumber -UseMaximumSize -AssignDriveLetter -IsActive
Format-Volume -DriveLetter E -FileSystem NTFS -Label "WIN11_INSTALL" -Force

# 3. Copy ISO contents (if ISO mounted at D:)
Copy-Item -Path "D:\*" -Destination "E:\" -Recurse -Force

# 4. Handle install.wim > 4GB (FAT32 limitation)
# Option A: Split WIM (if formatting FAT32)
Dism /Split-Image /ImageFile:E:\sources\install.wim /SWMFile:E:\sources\install.swm /FileSize:3800

# Option B: Use NTFS (modern UEFI supports it)
# Already done with NTFS format above
```

### For Unsupported Hardware (Modify Registry in ISO)

```powershell
# Mount install.wim
$mountDir = "C:\Mount"
New-Item -ItemType Directory -Force -Path $mountDir
Dism /Mount-Image /ImageFile:"E:\sources\install.wim" /Index:1 /MountDir:$mountDir

# Modify registry to bypass checks
$regPath = "$mountDir\Windows\System32\config\SOFTWARE"
reg load HKLM\WIN11 $regPath

# Bypass TPM
New-ItemProperty -Path "HKLM:\WIN11\Microsoft\Windows\CurrentVersion\Setup\OOBE" -Name "BypassTPMCheck" -Value 1 -PropertyType DWORD -Force
New-ItemProperty -Path "HKLM:\WIN11\Microsoft\Windows\CurrentVersion\Setup\OOBE" -Name "BypassSecureBootCheck" -Value 1 -PropertyType DWORD -Force
New-ItemProperty -Path "HKLM:\WIN11\Microsoft\Windows\CurrentVersion\Setup\OOBE" -Name "BypassRAMCheck" -Value 1 -PropertyType DWORD -Force
New-ItemProperty -Path "HKLM:\WIN11\Microsoft\Windows\CurrentVersion\Setup\OOBE" -Name "BypassStorageCheck" -Value 1 -PropertyType DWORD -Force

reg unload HKLM\WIN11
Dism /Unmount-Image /MountDir:$mountDir /Commit
```

## Method 4: Ventoy (Multi-Boot)

### What is Ventoy?

Open-source tool that makes USB drive bootable for multiple ISOs - just copy ISO files to USB.

### Setup

1. Download [Ventoy](https://www.ventoy.net/)
2. Run `Ventoy2Disk.exe`
3. Select USB → Install
4. Copy Windows 11 ISO (and Linux ISOs, etc.) to USB
5. Boot - Ventoy menu appears with all ISOs

### Advantages

- Multiple ISOs on one USB
- No re-flashing needed
- Persistent storage support
- UEFI + Legacy BIOS

## Verification & Testing

### Verify USB Bootable

```powershell
# Check boot sector
bootsect /nt60 E: /force /mbr

# Verify EFI structure
dir E:\EFI\BOOT\
dir E:\EFI\MICROSOFT\BOOT\
```

### Test in VM

```powershell
# Quick test with Hyper-V
New-VM -Name "TestWin11" -MemoryStartupBytes 4GB -Generation 2 -NewVHDPath "C:\VMs\Test.vhdx" -NewVHDSizeBytes 60GB
Set-VMFirmware -VMName "TestWin11" -FirstBootDevice (Get-VMFirmware -VMName "TestWin11").BootOrder | Where-Object {$_.DeviceType -eq "Drive"} | Where-Object {$_.Path -like "*USB*"}
```

## Booting & Installation

### BIOS/UEFI Settings

1. **Boot Mode**: UEFI (recommended) or Legacy/CSM
2. **Secure Boot**: Enabled (or Disabled for bypass USB)
3. **TPM**: 2.0 (or Disabled for bypass)
4. **Boot Order**: USB first
5. **Fast Boot**: Disabled (for reliable USB detection)

### Installation Process

1. Boot from USB
2. Language/Time/Keyboard
3. **Install Now**
4. **I don't have a product key** (or enter key)
5. Select Edition (Home/Pro)
6. **Custom: Install Windows only (advanced)**
7. **Delete** existing partitions on target drive
8. **New** → Apply → Creates System Reserved + Primary
9. **Next** → Wait for installation
10. OOBE (Out-of-Box Experience) - Use bypass USB for local account

## Troubleshooting

| Issue | Solution |
|-------|----------|
| USB not detected | Try different port; disable Fast Boot; update BIOS |
| "Install.wim too large" | Use NTFS or split WIM (`/split-image`) |
| "PC doesn't meet requirements" | Use Rufus bypass option or registry method |
| "No drives found" | Load storage drivers (F6) or use Ventoy |
| Secure Boot violation | Disable Secure Boot or use signed bootloader |
| Error 0x8007025D | Bad USB/ISO; verify checksum; try different USB |

## Resources

- [Microsoft Windows 11 Download](https://www.microsoft.com/software-download/windows11)
- [Rufus](https://rufus.ie/)
- [Ventoy](https://www.ventoy.net/)
- [Windows 11 System Requirements](https://www.microsoft.com/windows/windows-11-specifications)
- [DISM Documentation](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/dism---deployment-image-servicing-and-management-technical-reference-for-windows)