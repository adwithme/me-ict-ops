---
title: "The App Management on Windows 11"
date: 2022-08-07
description: "Managing applications in Windows 11 - installation, uninstallation, default apps, startup management, and winget package manager."
tags: ["Windows", "Windows 11", "App Management", "winget", "Startup", "Default Apps"]
categories: ["Windows", "System Administration"]
draft: false
toc: true
---

Windows 11 modernizes application management with a redesigned Settings interface, improved Microsoft Store, and the winget package manager for command-line automation.

## Settings > Apps Interface

### Installed Apps (Settings > Apps > Installed apps)

- **Sort by**: Name, Date, Size
- **Filter by**: Drive, All apps
- **Actions per app** (three-dot menu):
  - Move (if supported)
  - Modify (repair/change)
  - Uninstall
  - Advanced options (terminate, repair, reset, permissions)

### Default Apps (Settings > Apps > Default apps)

- **Set defaults by file type** - `.pdf`, `.jpg`, `.html`, etc.
- **Set defaults by link type** - `mailto:`, `http:`, `ftp:`
- **Choose defaults by app** - Select app > see all associations

### Startup Apps (Settings > Apps > Startup)

- Toggle per-app startup behavior
- **Impact indicators**: High/Medium/Low/None
- **Startup folder locations**:
  - User: `shell:startup` (`%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup`)
  - All Users: `shell:common startup` (`%ProgramData%\Microsoft\Windows\Start Menu\Programs\Startup`)

## Microsoft Store

### Store App Management

- **Library** - Owned apps, updates, downloads
- **Automatic updates** - On by default (Settings > App updates)
- **Offline licenses** - For enterprise/offline deployment

### Store for Business/Education (Deprecated)

- Replaced by **Microsoft Intune** for app deployment
- **Win32 app packaging** - MSIX format for Store/Intune distribution

## winget - Windows Package Manager

### Installation

Built into Windows 11 (App Installer). Update via Store or:
```powershell
winget upgrade --id Microsoft.DesktopAppInstaller -s winget
```

### Core Commands

```powershell
# Search
winget search <query>
winget search --tag "utility" --source winget

# Install
winget install <package_id>
winget install --id Mozilla.Firefox -e --accept-source-agreements --accept-package-agreements

# Upgrade
winget upgrade
winget upgrade --all
winget upgrade --id <package_id>

# Uninstall
winget uninstall <package_id>

# List
winget list
winget list --source winget
winget list --upgrade-available

# Show info
winget show <package_id>

# Sources
winget source list
winget source add <name> <url>
winget source remove <name>
winget source update
```

### Package ID Patterns

| Publisher | ID Format | Example |
|-----------|-----------|---------|
| Microsoft | `Microsoft.<App>` | `Microsoft.VisualStudioCode` |
| Standard | `<Publisher>.<App>` | `Mozilla.Firefox` |
| GitHub | `<Owner>.<Repo>` | `GitHub.cli` |

### Automation Scripts

```powershell
# Install dev toolkit
$packages = @(
    "Microsoft.VisualStudioCode"
    "Git.Git"
    "Docker.DockerDesktop"
    "Postman.Postman"
    "MongoDB.Compass"
    "Microsoft.AzureCLI"
)
foreach ($pkg in $packages) {
    winget install --id $pkg --accept-source-agreements --accept-package-agreements
}
```

### Export/Import Configuration

```powershell
# Export
winget export -o C:\Config\winget-packages.json

# Import (on new machine)
winget import -i C:\Config\winget-packages.json --accept-source-agreements --accept-package-agreements
```

## Advanced App Management

### App Execution Aliases

Settings > Apps > App execution aliases - Toggle which apps respond to command names (e.g., `python`, `python3`).

### App Permissions (Privacy)

Settings > Privacy & security > App permissions:
- Location, Camera, Microphone, Notifications
- Background apps
- File system access (Documents, Pictures, etc.)

### Uninstall Stubborn Apps

```powershell
# Via winget
winget uninstall --id "Package.ID" --force

# Via PowerShell (AppX)
Get-AppxPackage *Name* | Remove-AppxPackage

# Via registry (last resort)
# HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall
# HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall
```

### Enterprise: MSIX & Intune

- **MSIX** - Modern packaging format (containerized, reliable install/uninstall)
- **App Attach** - Dynamic app delivery for Azure Virtual Desktop
- **Intune Win32 App** - `.intunewin` wrapper for legacy installers
- **Company Portal** - User-facing app catalog

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Store won't open | `wsreset.exe` (run dialog) |
| winget not found | Update App Installer from Store |
| "Source not found" | `winget source update` |
| Hash mismatch | `winget install --id <id> --force` |
| Permission denied | Run terminal as Administrator |
| Pending restart | Complete Windows Update reboot |

## Resources

- [winget Documentation](https://learn.microsoft.com/en-us/windows/package-manager/winget/)
- [winget-pkgs Repository](https://github.com/microsoft/winget-pkgs) - Community packages
- [Microsoft Store APIs](https://learn.microsoft.com/en-us/windows/apps/publish/)
- [MSIX Packaging Tool](https://learn.microsoft.com/en-us/windows/msix/packaging-tool/tool-overview)