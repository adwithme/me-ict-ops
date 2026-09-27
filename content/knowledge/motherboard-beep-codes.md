---
title: "Motherboard Beep Codes - Complete Reference"
date: 2022-07-29
description: "Comprehensive reference guide to motherboard BIOS beep codes for AMI, Award, Phoenix, and other BIOS manufacturers - essential for hardware troubleshooting."
tags: ["Motherboard", "Beep Codes", "BIOS", "POST", "Hardware Troubleshooting", "Diagnostics"]
categories: ["Hardware", "Troubleshooting", "Diagnostics"]
draft: false
toc: true
---

When a computer fails to boot, the BIOS communicates errors through **beep codes** during POST (Power-On Self-Test). This reference covers major BIOS manufacturers.

## Quick Reference Table

| Beep Pattern | AMI BIOS | Award BIOS | Phoenix BIOS |
|--------------|----------|------------|--------------|
| **1 short** | System OK | System OK | System OK |
| **2 short** | Parity error | CMOS error | - |
| **3 short** | Base 64K memory failure | Keyboard error | - |
| **4 short** | System timer failure | - | - |
| **5 short** | Processor error | - | - |
| **6 short** | Keyboard controller error | - | - |
| **7 short** | Virtual mode error | - | - |
| **8 short** | Display memory error | Video error | - |
| **9 short** | ROM checksum error | - | - |
| **10 short** | CMOS shutdown register | - | - |
| **11 short** | Cache memory error | - | - |
| **1 long, 2 short** | - | Video error | Video error |
| **1 long, 3 short** | - | Video memory error | - |
| **Continuous** | Power/PSU | Memory | - |
| **Continuous short** | Power/PSU | - | - |

---

## AMI BIOS (Most Common)

| Beeps | Meaning | Action |
|-------|---------|--------|
| **1 short** | **System OK** | Normal boot |
| **2 short** | **Parity Circuit Failure** | Reseat/replace RAM |
| **3 short** | **Base 64K Memory Failure** | Reseat/replace first RAM bank |
| **4 short** | **System Timer Failure** | Motherboard issue |
| **5 short** | **Processor Failure** | Reseat CPU, check cooler |
| **6 short** | **Keyboard Controller Error** | Check keyboard/port |
| **7 short** | **Virtual Mode Exception** | CPU/Motherboard |
| **8 short** | **Display Memory Error** | Reseat GPU, check VRAM |
| **9 short** | **ROM BIOS Checksum Error** | BIOS corruption, reflash |
| **10 short** | **CMOS Shutdown Register** | Motherboard |
| **11 short** | **Cache Memory Error** | Disable cache in BIOS |
| **1 long, 3 short** | **Conventional/Extended Memory** | RAM issue |
| **1 long, 8 short** | **Display/Retrace Test Failed** | GPU/Video RAM |
| **Continuous** | **Power Supply/PSU** | Check PSU, cables |
| **Continuous short** | **Power Supply** | Check PSU |

---

## Award BIOS

| Beeps | Meaning | Action |
|-------|---------|--------|
| **1 short** | **System OK** | Normal boot |
| **1 long, 2 short** | **Video Error** | Reseat GPU, check monitor cable |
| **1 long, 3 short** | **Video Memory Error** | GPU VRAM failure |
| **Continuous** | **Memory Error** | Reseat/test RAM sticks |
| **Continuous short** | **Power Supply** | Check PSU |
| **High-low pattern** | **CPU Overheating** | Check cooler, thermal paste |

---

## Phoenix BIOS

| Beeps | Meaning |
|-------|---------|
| **1-1-3** | CMOS read/write error |
| **1-1-4** | BIOS ROM checksum error |
| **1-2-1** | Programmable interval timer |
| **1-2-2** | DMA initialization error |
| **1-2-3** | DMA page register error |
| **1-3-1** | RAM refresh error |
| **1-3-3** | First 64K RAM error |
| **1-3-4** | First 64K RAM test error |
| **1-4-1** | Address line error |
| **1-4-2** | Parity error |
| **2-1-1** | First 64K RAM bit error |
| **2-1-2** | First 64K RAM parity error |
| **2-2-3** | Interrupt vector error |
| **2-3-1** | Keyboard controller error |
| **2-3-2** | Keyboard error |
| **3-1-1** | Slave DMA register error |
| **3-1-2** | Master DMA register error |
| **3-1-3** | Master interrupt mask register |
| **3-2-4** | Keyboard controller test error |
| **3-3-1** | Video memory error |
| **3-3-2** | Video controller error |
| **3-4-1** | Screen initialization error |
| **3-4-2** | Screen retrace test error |
| **4-2-1** | Timer tick error |
| **4-2-2** | Shutdown error |
| **4-2-3** | Gate A20 error |
| **4-3-1** | RAM test error |
| **4-3-3** | Interval timer 2 error |
| **4-3-4** | Time-of-day clock error |
| **4-4-1** | Serial port error |
| **4-4-2** | Parallel port error |
| **4-4-3** | Math coprocessor error |

*Note: Phoenix uses **X-Y-Z** pattern (e.g., 1-3-3 = 1 beep, pause, 3 beeps, pause, 3 beeps)*

---

## Dell BIOS

| Beeps | Meaning |
|-------|---------|
| **1-1-2** | Microprocessor register failure |
| **1-1-3** | NVRAM failure |
| **1-1-4** | ROM BIOS checksum failure |
| **1-2-1** | System board failure |
| **1-2-2** | Memory failure |
| **1-2-3** | Video card failure |
| **1-3-1** | RAM failure |
| **2-1-1** | System board failure |
| **2-1-2** | Memory failure |
| **2-2-1** | Video card failure |
| **3-1-1** | System board failure |
| **3-2-1** | Memory failure |
| **3-3-1** | Video card failure |

---

## HP/Compaq BIOS

| Beeps | Meaning |
|-------|---------|
| **1 short** | System OK |
| **1 long, 1 short** | System board failure |
| **1 long, 2 short** | Video error |
| **1 long, 3 short** | Memory error |
| **2 short** | Memory error |
| **3 short** | System board failure |
| **4 short** | Video error |
| **5 short** | System board failure |

---

## Lenovo BIOS

| Beeps | Meaning |
|-------|---------|
| **1 short** | System OK |
| **2 short** | POST error (check screen) |
| **1 long, 2 short** | Video error |
| **1 long, 3 short** | Memory error |
| **Continuous** | Power/PSU |

---

## Mac Startup Tones

| Sound | Meaning |
|-------|---------|
| **Single tone** | Normal startup (pre-2016) |
| **3 tones, 5s pause** | RAM not detected |
| **3 long, 3 short, 3 long** | EFI firmware error |
| **Continuous tone** | Firmware update in progress |

---

## Troubleshooting Workflow

### 1. Listen Carefully
- Count beeps
- Note pattern (long/short)
- Note pauses

### 2. Identify BIOS
- Screen at boot: **AMI**, **Award**, **Phoenix**, **Dell**, **HP**, **Lenovo**
- Check motherboard manual

### 3. Basic Checks (Before Deep Dive)
- ✅ Power cable seated
- ✅ Monitor connected
- ✅ Keyboard connected
- ✅ RAM fully seated
- ✅ GPU fully seated (if discrete)
- ✅ CPU power connected (4/8-pin)

### 4. Minimal Boot Test
1. Disconnect all drives
2. Remove all but **1 RAM stick**
3. Remove discrete GPU (use iGPU if available)
4. Boot → Listen for beeps

### 5. Component Isolation
| Component | Test Method |
|-----------|-------------|
| **RAM** | Test each stick individually in each slot |
| **GPU** | Try integrated graphics; test card in another system |
| **PSU** | Paperclip test or PSU tester; swap known good |
| **CPU** | Reseat, check for bent pins, verify cooler |
| **Motherboard** | Visual inspect: bulging caps, burns, corrosion |

### 6. Clear CMOS
1. Power off, unplug
2. Remove CMOS battery (CR2032)
3. Wait 5 minutes OR short CLR_CMOS jumper
4. Reinsert battery, power on

---

## Modern UEFI Systems

Many modern systems (2015+) use **UEFI** with:
- **No beep codes** (silent POST)
- **LED/Q-Code displays** on motherboard
- **Debug LEDs**: CPU, DRAM, VGA, BOOT
- Check motherboard manual for Q-Code meanings

---

## Resources

- [AMI BIOS Beep Codes](https://www.ami.com/support/bios-beep-codes/)
- [Award BIOS Beep Codes](https://www.bioscentral.com/beepcodes/awardbeep.htm)
- [Phoenix BIOS Beep Codes](https://www.bioscentral.com/beepcodes/phoenixbeep.htm)
- [Computer Hope Beep Codes](https://www.computerhope.com/beep.htm)
- [Motherboard Manual (your specific model)]

---

## Related Articles

- [Linux System Configuration and Log Files](/knowledge/linux-system-configuration-log-files/)
- [How to Create Bootable USB](/knowledge/creating-bootable-usb-windows11/)
- [NP Domain to Blogger](/knowledge/np-domain-blogger/)