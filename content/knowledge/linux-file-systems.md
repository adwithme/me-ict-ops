---
title: "Introduction to Linux File Systems"
date: 2022-07-27
description: "Understanding Linux file system hierarchy, common file systems (ext4, XFS, Btrfs), mounting, permissions, and disk management fundamentals."
tags: ["Linux", "File Systems", "ext4", "XFS", "Btrfs", "Mounting", "Permissions", "Disk Management"]
categories: ["Linux", "System Administration", "Storage"]
draft: false
toc: true
---

This article is part of a series.

- [Part 1: How to Create Bootable USB? Windows and Linux](/knowledge/creating-bootable-usb-windows11/)
- Part 2: This Article
- [Part 3: Linux System Configuration and Log Files](/knowledge/linux-system-configuration-log-files/)

---

## Linux File System Hierarchy (FHS)

```
/ (root)
├── /bin          → Essential user binaries (ls, cp, mv)
├── /boot         → Kernel, initramfs, GRUB
├── /dev          → Device files (sda, tty, null)
├── /etc          → System configuration files
├── /home         → User home directories
├── /lib          → Shared libraries for /bin, /sbin
├── /media        → Mount points for removable media
├── /mnt          → Temporary mount points
├── /opt          → Optional/add-on software
├── /proc         → Virtual filesystem (kernel info)
├── /root         → Root user home directory
├── /run          → Runtime variable data
├── /sbin         → System binaries (fsck, reboot, ip)
├── /srv          → Data for services (web, ftp)
├── /sys          → Virtual filesystem (kernel devices)
├── /tmp          → Temporary files (cleared on reboot)
├── /usr          → User programs (read-only, shareable)
│   ├── /usr/bin      → Non-essential binaries
│   ├── /usr/lib      → Libraries for /usr/bin
│   ├── /usr/local    → Locally compiled software
│   └── /usr/share    → Architecture-independent data
└── /var          → Variable data (logs, spool, cache)
    ├── /var/log      → System logs
    ├── /var/spool    → Print/mail queues
    └── /var/cache    → Application caches
```

---

## Common Linux File Systems

### ext4 (Fourth Extended): **Default for Most Distros**

| Feature | Details |
|---------|---------|
| **Max file size** | 16 TB |
| **Max volume size** | 1 EB |
| **Journaling** | Yes (metadata + optional data) |
| **Backward compatible** | ext2, ext3 |
| **Defragmentation** | Online (`e4defrag`) |
| **Best for** | General purpose, SSDs, HDDs |

```bash
# Create ext4
mkfs.ext4 /dev/sdX1

# Check/repair
fsck.ext4 -f /dev/sdX1

# Tune
tune2fs -l /dev/sdX1
```

### XFS: **High Performance, Large Files**

| Feature | Details |
|---------|---------|
| **Max file size** | 8 EB |
| **Max volume size** | 8 EB |
| **Journaling** | Yes (metadata only) |
| **Parallel I/O** | Excellent |
| **Online grow** | Yes (`xfs_growfs`) |
| **Online shrink** | ❌ Not supported |
| **Best for** | Large storage, media, databases, RHEL default |

```bash
# Create XFS
mkfs.xfs /dev/sdX1

# Grow (online, mounted)
xfs_growfs /mount/point

# Check
xfs_repair /dev/sdX1
```

### Btrfs: **Modern, Feature-Rich**

| Feature | Details |
|---------|---------|
| **Max file size** | 16 EB |
| **Max volume size** | 16 EB |
| **Copy-on-Write** | Yes |
| **Snapshots** | Native, instant |
| **Compression** | zstd, lzo, zlib |
| **RAID** | Native (0,1,10,5,6) |
| **Self-healing** | Checksums + redundant copies |
| **Best for** | Advanced users, snapshots, Fedora default |

```bash
# Create Btrfs
mkfs.btrfs /dev/sdX1

# Snapshot (instant)
btrfs subvolume snapshot /source /snapshots/backup-$(date +%F)

# Compress
mount -o compress=zstd /dev/sdX1 /mnt
```

### Other File Systems

| FS | Use Case |
|----|----------|
| **FAT32** | USB drives, cross-platform (max 4GB file) |
| **exFAT** | Large USB/SD cards, cross-platform |
| **NTFS** | Windows dual-boot (read/write via `ntfs-3g`) |
| **ZFS** | Enterprise, data integrity (separate kernel module) |
| **JFS** | Legacy, low CPU overhead |
| **ReiserFS** | Legacy, small files |

---

## Disk & Partition Management

### View Disks

```bash
lsblk          # Tree view
lsblk -f       # With filesystem info
fdisk -l       # Partition tables
parted -l      # GPT/MBR details
```

### Partitioning (fdisk/parted)

```bash
# MBR (legacy BIOS)
fdisk /dev/sdX

# GPT (UEFI)
parted /dev/sdX mklabel gpt
parted /dev/sdX mkpart primary ext4 1MiB 100%
```

### Common Partition Schemes

| Scheme | Boot Mode | Partitions |
|--------|-----------|------------|
| **MBR** | Legacy BIOS | Up to 4 primary (or 3 primary + extended) |
| **GPT** | UEFI | 128+ partitions, >2TB disks |

**Typical Linux Layout (GPT/UEFI):**
| Partition | Size | Mount | Type |
|-----------|------|-------|------|
| EFI System | 512 MiB | `/boot/efi` | FAT32 |
| Root | 50-100 GiB | `/` | ext4/XFS/Btrfs |
| Home | Remaining | `/home` | ext4/XFS/Btrfs |
| Swap | 2-16 GiB | `swap` | linux-swap |

---

## Mounting File Systems

### Temporary Mount

```bash
mount /dev/sdX1 /mnt
mount -t ext4 /dev/sdX1 /mnt
mount -o ro /dev/sdX1 /mnt    # Read-only
```

### Permanent Mount (/etc/fstab)

```fstab
# <device>    <mount>    <type>    <options>           <dump> <pass>
UUID=xxxx     /          ext4      defaults,noatime    0      1
UUID=yyyy     /home      ext4      defaults,noatime    0      2
UUID=zzzz     /boot/efi  vfat      umask=0077          0      1
UUID=swap     none       swap      sw                  0      0
```

| Option | Meaning |
|--------|---------|
| `defaults` | rw, suid, dev, exec, auto, nouser, async |
| `noatime` | Don't update access time (performance) |
| `discard` | SSD TRIM (or use `fstrim` timer) |
| `noexec` | Prevent execution |
| `nosuid` | Ignore suid/sgid bits |

### Auto-mount systemd

```ini
# /etc/systemd/system/mnt-data.mount
[Unit]
Description=Data Drive

[Mount]
What=/dev/disk/by-uuid/xxxx
Where=/mnt/data
Type=ext4
Options=defaults,noatime

[Install]
WantedBy=multi-user.target
```

---

## File Permissions & Ownership

### Permission Bits

```bash
ls -l
# -rw-r--r--  1 user group  1024 Jan 1 12:00 file.txt
#  ^  ^  ^  ^
#  |  |  |  └─ Others: read
#  |  |  └──── Group: read
#  |  └──────── Owner: read, write
#  └─────────── Type: - (file), d (dir), l (link)
```

### Numeric (Octal) Permissions

| Value | Permission | Binary |
|-------|------------|--------|
| 7 | rwx | 111 |
| 6 | rw- | 110 |
| 5 | r-x | 101 |
| 4 | r-- | 100 |
| 3 | -wx | 011 |
| 2 | -w- | 010 |
| 1 | --x | 001 |
| 0 | --- | 000 |

### Common Combinations

| Permission | Files | Directories |
|------------|-------|-------------|
| `755` | rwxr-xr-x | rwxr-xr-x |
| `644` | rw-r--r-- | - |
| `700` | rwx------ | rwx------ |
| `600` | rw------- | - |

### Changing Permissions

```bash
chmod 755 file.sh           # Numeric
chmod u+x file.sh           # Symbolic (user + execute)
chmod g-w,o-r file.txt      # Remove group write, other read
chmod -R 755 /dir           # Recursive

chown user:group file       # Change owner:group
chown -R user:group /dir    # Recursive
chown :group file           # Change group only
```

### Special Bits

| Bit | Symbol | Numeric | Effect |
|-----|--------|---------|--------|
| **SUID** | `s` in user exec | `4000` | Run as file owner |
| **SGID** | `s` in group exec | `2000` | Run as file group; new files inherit group |
| **Sticky** | `t` in other exec | `1000` | Only owner can delete (e.g., `/tmp`) |

```bash
chmod 4755 /usr/bin/passwd    # SUID
chmod 2775 /shared/dir        # SGID
chmod 1777 /tmp               # Sticky
```

---

## Disk Usage & Monitoring

```bash
df -h              # Disk free space (human)
df -i              # Inode usage
du -sh /path       # Directory size
du -sh * | sort -hr # Sort by size
ncdu /             # Interactive (install ncdu)

lsblk -f           # Filesystem details
blkid              # UUID, TYPE, LABEL
findmnt            # Mount tree
```

---

## File System Maintenance

### Check & Repair

```bash
# ext4
fsck.ext4 -f /dev/sdX1
e2fsck -y /dev/sdX1

# XFS (unmounted!)
xfs_repair /dev/sdX1

# Btrfs
btrfs check /dev/sdX1
btrfs scrub start /mount  # Background checksum verification
```

### Defragmentation

```bash
# ext4 (online)
e4defrag /mount/point

# XFS (online)
xfs_fsr /mount/point

# Btrfs (online)
btrfs filesystem defragment -r /mount/point
```

### SSD Optimization

```bash
# Enable discard (TRIM) in fstab
UUID=xxxx  /  ext4  defaults,noatime,discard  0 1

# Or use fstrim timer (preferred)
systemctl enable fstrim.timer
systemctl start fstrim.timer

# Manual trim
fstrim -v /
```

---

## LVM (Logical Volume Manager)

```bash
# Physical Volume
pvcreate /dev/sdX1

# Volume Group
vgcreate vg0 /dev/sdX1

# Logical Volume
lvcreate -L 20G -n root vg0
lvcreate -L 100%FREE -n home vg0

# Format & Mount
mkfs.ext4 /dev/vg0/root
mount /dev/vg0/root /mnt

# Resize (grow)
lvextend -L +10G /dev/vg0/root
resize2fs /dev/vg0/root  # ext4
xfs_growfs /mnt          # XFS
```

---

## RAID (mdadm)

```bash
# Create RAID 1 (mirror)
mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdX1 /dev/sdY1

# Create RAID 5 (3+ disks)
mdadm --create /dev/md0 --level=5 --raid-devices=3 /dev/sdX1 /dev/sdY1 /dev/sdZ1

# Monitor
cat /proc/mdstat
mdadm --detail /dev/md0

# Add spare
mdadm --add /dev/md0 /dev/sdZ1
```

---

## Quick Reference

| Task | Command |
|------|---------|
| List disks | `lsblk -f` |
| Check disk health | `smartctl -a /dev/sdX` |
| Benchmark | `hdparm -Tt /dev/sdX` |
| Wipe disk | `wipefs -a /dev/sdX` |
| Secure erase | `shred -v /dev/sdX` |
| Find large files | `find / -size +100M -type f` |

---

## Related Articles

- [How to Create Bootable USB](/knowledge/creating-bootable-usb-windows11/)
- [Linux System Configuration and Log Files](/knowledge/linux-system-configuration-log-files/)
- [Motherboard Beep Codes](/knowledge/motherboard-beep-codes/)