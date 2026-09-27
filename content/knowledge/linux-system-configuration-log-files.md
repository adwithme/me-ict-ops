---
title: "Linux System Configuration and Log Files"
date: 2022-07-28
description: "Comprehensive reference guide to Linux system configuration files and log file locations for troubleshooting and system administration."
tags: ["Linux", "System Administration", "Configuration Files", "Log Files", "Troubleshooting"]
categories: ["Linux", "System Administration"]
draft: false
toc: true
---

This article is part of a series.

- [Part 1: How to Create Bootable USB? Windows and Linux](/knowledge/creating-bootable-usb-windows11/)
- [Part 2: Introduction to Linux File Systems](/knowledge/linux-file-systems/)
- Part 3: This Article

## Introduction

You will find descriptions of the configuration files you need to set up the different features that make up Linux systems. The two major locations of configuration files are your home directory (where your personal configuration files are kept) and the `/etc` directory (which holds system-wide configuration files). Most important things for troubleshooting.

## Linux System Configuration Files

| File | Description |
|------|-------------|
| `/etc/sysconfig` | Directory on Red Hat Linux that holds system configuration files |
| `/etc/rc.d` | Directory that holds system startup and shutdown files |
| `/etc/rc.d/rcsysinit` | Initialization file for the system |
| `/etc/rc.config` | Configuration file for SuSE Linux system |
| `/etc/rc.d/rclocal` | Initialization file for custom commands |
| `/etc/rc.d/rcmodules` | Loads kernel modules on startup of the system |
| `/etc/rc.d/init.d` | Directory that holds many of the daemons, servers and scripts for the System V init startup control standard |
| `/sbin/init.d` | Directory that holds many of the daemons, servers, and scripts for a SuSE system |
| `/etc/rc.d/rc(1-8).d` | Directories for the different runlevels; these directories hold links to scripts in the `/etc/rc.d/init.d` directory (on SuSE these are located in `/sbin/init.d/rc(1-8).d`) |
| `/etc/rc.d/init.d/halt` | Operations performed each time the system is shut down. Some distributions use the name `rc.halt` |
| `/etc/rc.d/init.d/lpd` | Start up and shut down the lpd printing daemon |
| `/etc/rc.d/init.d/inet` | Operations to start and stop the inetd internet services daemon |
| `/etc/rc.d/init.d/network` | Operations to start and stop the network connections |
| `/etc/rc.d/init.d/httpd` | Operations to start and stop the httpd Web server daemon |
| `/etc/X11` | X Windows configuration files |
| `/etc/lilo.conf` | LILO configuration file |
| `/etc/fstab` | Listing of the Linux file systems and automatically mount file systems |
| `/etc/hosts` | Hosts configuration file |
| `/mnt` | Holds removable media file systems mount points |
| `/etc/inittab` | The default state and terminal connections |
| `/etc/passwd` | Contains user password and login information |
| `/etc/shadow` | Contains user-encrypted passwords |
| `/etc/group` | Contains a list of groups and the configuration for each group |
| `/etc/syslog.conf` | Contains the names and locations of system log files |
| `/proc/` | Contains hardware configurations of the system |

## Linux Log Files

| File | Description |
|------|-------------|
| `/var/log/boot.log(x)` | Show the completion of daemons and other system functions. `(x)` shows there are several corresponding to system boots |
| `/var/log/cron(x)` | Show the weekly and daily cron jobs completed. `(x)` shows there are several corresponding to system boots |
| `/var/log/dmesg` | Contains hardware detected on boot up |
| `/var/log/maillog(x)` | Mail logs for system information. `(x)` shows there are several corresponding to system boots |
| `/var/log/secure(x)` | RSA key generation log. `(x)` shows there are several corresponding to system boots |
| `/var/log/spooler(x)` | Spooler generation log. `(x)` shows there are several corresponding to system boots |
| `/var/log/fax` | Directory of fax log files |
| `/var/log/httpd` | Directory of httpd Web daemon log files |
| `/var/log/news` | Directory of news daemon log files |
| `/var/log/samba` | Directory of samba log files |
| `/var/log/squid` | Directory of squid log files |
| `/var/log/uucp` | Directory of uucp log files |

## Key Troubleshooting Files

### Startup & Initialization
- **`/etc/inittab`** - Default runlevel and terminal connections
- **`/etc/rc.d/rc.sysinit`** - System initialization script
- **`/etc/rc.local`** - Custom startup commands

### User Management
- **`/etc/passwd`** - User account information
- **`/etc/shadow`** - Encrypted passwords (root only)
- **`/etc/group`** - Group definitions

### Network & Services
- **`/etc/hosts`** - Static hostname resolution
- **`/etc/resolv.conf`** - DNS resolver configuration
- **`/etc/sysconfig/network-scripts/`** - Network interface configs (RHEL/CentOS)

### Logging
- **`/etc/rsyslog.conf`** or **`/etc/syslog.conf`** - Syslog configuration
- **`/var/log/messages`** - General system messages
- **`/var/log/syslog`** - System-wide logs (Debian/Ubuntu)
- **`journalctl`** - systemd journal (modern systems)

## Quick Reference Commands

```bash
# View boot messages
dmesg | less

# Follow system log
tail -f /var/log/messages

# Check service status
systemctl status <service>

# View journal
journalctl -u <service> -f

# Check disk space
df -h

# Check memory
free -h
```

This table provides a list of just some of the locations of important system files that you can use to configure and verify how the system is functioning. Knowing the location of the files and what they are used for will aid you in quickly troubleshooting a system when problems arise.

## Related Articles

- [Introduction to Linux File Systems](/knowledge/linux-file-systems/)
- [How to Create Bootable USB](/knowledge/creating-bootable-usb-windows11/)
- [Motherboard Beep Codes](/knowledge/motherboard-beep-codes/)