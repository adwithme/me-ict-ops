---
title: "Robocopy: Reliable File Copying Utility"
date: 2024-05-07
description: "Complete guide to Robocopy (Robust File Copy) - Microsoft's command-line tool for reliable file replication, mirroring, and migration with resume capability."
tags: ["robocopy", "Windows", "IT Professional", "File Copy", "Migration", "Backup", "Command Line"]
categories: ["Windows", "System Administration", "Storage"]
draft: false
toc: true
---

Robocopy (Robust File Copy) is Microsoft's command-line directory replication tool, built into Windows since Vista/Server 2008. It replaces xcopy with superior reliability, resume capability, and advanced features for enterprise file operations.

## Why Robocopy?

| Feature | xcopy | Robocopy |
|---------|-------|----------|
| Resume on failure | ❌ | ✅ |
| Multi-threaded | ❌ | ✅ (/MT) |
| Mirror directories | Limited | ✅ (/MIR) |
| File attributes | Basic | Full preservation |
| Retry logic | None | Configurable |
| Logging | Minimal | Comprehensive |
| UNC/Long paths | Problematic | Native support |
| Bandwidth throttling | ❌ | ✅ (/IPG) |

## Essential Syntax

```cmd
robocopy <Source> <Destination> [<File>[ ...]] [<Options>]
```

**Key concept**: Robocopy works with *directories*, not individual files. Source and destination are folder paths.

## Common Use Cases

### 1. Basic Copy (New/Changed Files Only)

```cmd
robocopy "C:\Source" "D:\Backup" /E /Z /R:3 /W:5 /LOG:copy.log
```

- `/E` - Copy subdirectories including empty
- `/Z` - Restartable mode (resume on interruption)
- `/R:3` - Retry 3 times (default 1 million!)
- `/W:5` - Wait 5 seconds between retries
- `/LOG:file` - Log to file

### 2. Mirror Directory (Exact Replica)

```cmd
robocopy "C:\Source" "D:\Mirror" /MIR /Z /R:3 /W:5 /LOG:mirror.log
```

- `/MIR` = `/E` + `/PURGE` (deletes destination files not in source)
- **Warning**: Destination becomes exact clone, extra files deleted!

### 3. Incremental Backup (Daily)

```cmd
robocopy "C:\Data" "\\Server\Backup\Data" /E /Z /R:2 /W:10 /XO /LOG+:daily.log
```

- `/XO` - Exclude Older (skip if destination same/newer)
- `/LOG+` - Append to existing log

### 4. Multi-threaded High-Speed Copy

```cmd
robocopy "C:\LargeFolder" "D:\Target" /E /Z /MT:16 /R:2 /W:5 /LOG:fast.log
```

- `/MT:n` - Multi-threaded (1-128 threads, default 8)
- **Caution**: High thread count can saturate disk/network

### 5. Network Copy with Throttling

```cmd
robocopy "C:\Source" "\\NAS\Share" /E /Z /IPG:50 /R:5 /W:10 /LOG:netcopy.log
```

- `/IPG:n` - Inter-Packet Gap (ms) for bandwidth throttling
- Useful for WAN/VPN links

## Complete Option Reference

### Copy Options

| Option | Description |
|--------|-------------|
| `/S` | Copy subdirectories (non-empty) |
| `/E` | Copy subdirectories (including empty) |
| `/LEV:n` | Copy only top n levels |
| `/Z` | Restartable mode |
| `/B` | Backup mode (bypass ACLs, requires SeBackupPrivilege) |
| `/ZB` | Try restartable, fallback to backup mode |
| `/COPY:flags` | What to copy (D=Data, A=Attributes, T=Timestamps, S=Security, O=Owner, U=Auditing) |
| `/DCOPY:T` | Copy directory timestamps |
| `/SEC` | Copy security (equivalent to /COPY:DATS) |
| `/COPYALL` | Copy all file info (DATSOU) |

### File Selection

| Option | Description |
|--------|-------------|
| `/A` | Copy only files with Archive attribute |
| `/M` | Copy with Archive attribute + reset it |
| `/IA:[RASHCNETO]` | Include only files with attributes |
| `/XA:[RASHCNETO]` | Exclude files with attributes |
| `/XF file [file...]` | Exclude Files (supports wildcards) |
| `/XD dirs [dirs...]` | Exclude Directories |
| `/XC` | Exclude Changed files |
| `/XN` | Exclude Newer files |
| `/XO` | Exclude Older files |
| `/XX` | Exclude Extra files/dirs |
| `/XL` | Exclude Lonely files/dirs |
| `/IS` | Include Same files |
| `/IT` | Include Tweaked files |
| `/MAX:n` | Maximum file size (bytes) |
| `/MIN:n` | Minimum file size (bytes) |
| `/MAXAGE:n` | Maximum file age (days) |
| `/MINAGE:n` | Minimum file age (days) |
| `/MAXLAD:n` | Maximum Last Access Date |
| `/MINLAD:n` | Minimum Last Access Date |

### Retry & Logging

| Option | Description |
|--------|-------------|
| `/R:n` | Retry count (default 1,000,000) |
| `/W:n` | Wait between retries (default 30 sec) |
| `/REG` | Save /R:/W: in registry as defaults |
| `/TBD` | Wait for share names To Be Defined |
| `/LOG:file` | Output to log file (overwrite) |
| `/LOG+:file` | Append to log file |
| `/UNILOG:file` | Unicode log (overwrite) |
| `/UNILOG+:file` | Unicode log (append) |
| `/TEE` | Output to console AND log |
| `/NJH` | No Job Header |
| `/NJS` | No Job Summary |
| `/NP` | No Progress display |
| `/ETA` | Show ETA for files |

### Advanced

| Option | Description |
|--------|-------------|
| `/MIR` | Mirror (/E + /PURGE) |
| `/MOVE` | Move files (copy + delete source) |
| `/MOV` | Move files (copy + delete source files only) |
| `/PURGE` | Delete dest files not in source |
| `/CREATE` | Create directory tree + zero-length files |
| `/FAT` | Create 8.3 names |
| `/FFT` | Assume FAT timestamps (2-sec granularity) |
| `/MT[:n]` | Multi-threaded (n=1-128, default 8) |
| `/IPG:n` | Inter-Packet Gap (bandwidth throttle) |
| `/J` | Unbuffered I/O (for huge files) |

## Real-World Scenarios

### Server Migration

```cmd
robocopy "\\OldServer\Data" "\\NewServer\Data" /E /COPYALL /DCOPY:T /ZB /MT:16 /R:3 /W:10 /LOG:migration.log /TEE
```

### Daily Backup to Rotating Drives

```cmd
@echo off
set DEST=Z:\Backup\%DATE:~10,4%-%DATE:~4,2%-%DATE:~7,2%
robocopy "C:\Users" "%DEST%\Users" /E /Z /R:2 /W:5 /XO /LOG+:%DEST%\backup.log
robocopy "C:\Projects" "%DEST%\Projects" /E /Z /R:2 /W:5 /XO /LOG+:%DEST%\backup.log
```

### Sync with Exclusions

```cmd
robocopy "C:\Source" "D:\Sync" /MIR /XD ".git" "node_modules" "bin" "obj" /XF "*.tmp" "*.log" "Thumbs.db" /R:2 /W:5 /LOG:sync.log
```

### Copy Only Permissions (ACLs)

```cmd
robocopy "C:\Source" "D:\Dest" /E /COPY:S /IS /IT /LOG:perms.log
```

- `/COPY:S` - Security only
- `/IS` - Include Same (files that appear identical)
- `/IT` - Include Tweaked (same data, different attributes)

## Exit Codes (Bitwise)

| Code | Meaning |
|------|---------|
| 0 | No files copied, no failures |
| 1 | Files copied successfully |
| 2 | Extra files/dirs detected |
| 4 | Mismatched files/dirs |
| 8 | Some files/dirs could not be copied |
| 16 | Fatal error (no files copied) |

**Check in batch**: `if %errorlevel% geq 8 echo Error occurred`

## PowerShell Wrapper

```powershell
function Invoke-Robocopy {
    param(
        [string]$Source,
        [string]$Dest,
        [string[]]$Options = @('/E','/Z','/R:3','/W:5','/LOG+:robocopy.log')
    )
    $args = @($Source, $Dest) + $Options
    & robocopy.exe @args
    $exitCode = $LASTEXITCODE
    if ($exitCode -ge 8) {
        Write-Error "Robocopy failed with exit code $exitCode"
    }
    return $exitCode
}
```

## Best Practices

1. **Always test with `/L`** (List only) first
2. **Use `/LOG`** for audit trails
3. **Set reasonable `/R` and `/W`** (not defaults)
4. **Use `/MT` judiciously** - 8-16 for local, 4-8 for network
5. **Preserve timestamps** with `/DCOPY:T`
6. **Mirror carefully** - `/MIR` deletes!
6. **Test restores** - Backup unverified is not a backup

## Resources

- `robocopy /?` - Built-in help
- [Microsoft Robocopy Docs](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/robocopy)
- [Robocopy GUI](https://github.com/techitalk/RoboCopy-GUI) - Community GUI wrapper
- [SS64 Robocopy Reference](https://ss64.com/nt/robocopy.html)