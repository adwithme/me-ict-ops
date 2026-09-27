---
title: "OneDrive for Business on Web - Part I: Getting Started"
date: 2022-08-02
description: "Introduction to OneDrive for Business web interface - navigation, upload, organization, sharing basics, and sync client overview."
tags: ["OneDrive", "OneDrive for Business", "Microsoft 365", "Cloud Storage", "File Sharing", "Collaboration"]
categories: ["Microsoft 365", "Cloud Storage", "Productivity"]
draft: false
toc: true
---

OneDrive for Business is Microsoft's cloud storage solution integrated with Microsoft 365. This guide covers the web interface fundamentals for new users.

## Accessing OneDrive for Business

### Web Portal

1. Navigate to [portal.office.com](https://portal.office.com) or [onedrive.com](https://onedrive.com)
2. Sign in with your work/school account
3. Click **OneDrive** in the app launcher (waffle menu)

### Direct URL

```
https://<tenant>-my.sharepoint.com/personal/<username>_<domain>_com/
```

## Web Interface Overview

### Navigation Pane (Left)

| Section | Purpose |
|---------|---------|
| **My files** | Personal document library |
| **Recent** | Recently accessed files |
| **Shared** | Files shared with you / by you |
| **Recycle bin** | Deleted items (93-day retention) |
| **Discover** | AI-powered relevant content |

### Command Bar (Top)

| Button | Action |
|--------|--------|
| **New** | Folder, Word/Excel/PowerPoint, Link |
| **Upload** | Files or Folder |
| **Sync** | Start OneDrive sync client |
| **Automate** | Power Automate flows |
| **Sort/Filter** | View options |

### File List (Main Area)

- **Name** - Click to open online
- **Modified** - Last edit timestamp
- **Modified by** - Last editor
- **Size** - File size
- **Sharing status** - Private/Shared icons

## Core Operations

### Creating Files & Folders

**New Folder**:
1. Click **New** → **Folder**
2. Enter name → **Create**

**New Office Document**:
1. Click **New** → Select **Word/Excel/PowerPoint/OneNote**
2. Opens in **Office for the Web**
3. Auto-saves to current folder

### Uploading Files

**Drag & Drop**:
- Drag files from Explorer/Finder to browser window
- Drop on folder or file list

**Upload Button**:
1. Click **Upload** → **Files** or **Folder**
2. Select items → **Open**

**Upload Limits**:
- **File size**: 250 GB per file (Microsoft 365)
- **Total storage**: 1 TB per user (standard)
- **Sync limit**: 300,000 files per library

### Organizing Files

**Move/Copy**:
1. Select files (checkboxes)
2. **Move to** / **Copy to** in command bar
3. Browse destination → **Move here** / **Copy here**

**Drag & Drop**:
- Within file list: Move
- Ctrl+drag: Copy
- Between browser tabs: Copy

**Rename**:
- Select file → **Rename** (or F2)
- Or: Three-dot menu → **Rename**

### File Metadata

**Details Pane** (i icon or right panel):
- **Properties**: Size, Created, Modified, Modified by
- **Activity**: Version history, @mentions, sharing changes
- **Tags**: Add custom tags for search/filter

## Sharing & Collaboration

### Share Dialog

Select file/folder → **Share** (or right-click → Share)

### Sharing Options

| Setting | Options |
|---------|---------|
| **Who can access** | Anyone, People in org, People with existing access, Specific people |
| **Permission level** | Can edit, Can view, Can review (comments only) |
| **Link settings** | Allow editing, Block download, Set expiration, Set password |
| **Send notification** | Email with custom message |

### Link Types

| Type | Use Case |
|------|----------|
| **Anyone with link** | External sharing (if enabled by admin) |
| **People in organization** | Internal only |
| **People with existing access** | No permission change |
| **Specific people** | Most secure - only invited users |

### Managing Access

**File > Manage Access**:
- **Links**: View/revoke sharing links
- **Direct access**: Users/groups with direct permissions
- **Groups**: Microsoft 365 groups, SharePoint groups, Security groups
- **Stop sharing**: Remove all access instantly

### Real-time Co-authoring

1. Open Word/Excel/PowerPoint in browser
2. Share with **Can edit**
3. Multiple users edit simultaneously
4. Colored cursors show each user
5. **@mentions** in comments notify users

## Version History

### Accessing Versions

1. Select file → **Version history** (clock icon)
2. Or: Three-dot menu → **Version history**

### Features

- **Auto-save** versions every few minutes during editing
- **Major versions** (1.0, 2.0) on manual save
- **Minor versions** (1.1, 1.2) on auto-save
- **Restore** - Revert to previous version
- **Download** - Get copy of old version

### Version Retention

- **Default**: 500 major versions
- **Configurable** by admin (1-50,000)
- **Minor versions**: Configurable limit

## Search & Discovery

### Search Box (Top)

- **Natural language**: "Excel files from last week"
- **Filters**: File type, Modified, Modified by, Location
- **KQL syntax**: `filetype:pdf author:"John Doe" modified:last week`

### Search Results

- **All files** - Across OneDrive + SharePoint
- **People** - Colleagues, contacts
- **Conversations** - Teams/Outlook messages

## Sync Client Integration

### OneDrive Sync App

**Windows**: Pre-installed (OneDrive.exe)
**Mac**: App Store → OneDrive
**Mobile**: App Store / Play Store

### Setup

1. Click **Sync** in web toolbar
2. Or: Start OneDrive app → Sign in
3. Choose folders to sync
4. Files appear in **File Explorer** (Windows) / **Finder** (Mac)

### Sync Status Icons

| Icon | Status |
|------|--------|
| ☁️ Cloud | Online-only (placeholder) |
| ✅ Green check | Locally available |
| 🔄 Circular arrows | Syncing |
| ❌ Red X | Sync error |
| 🔒 Padlock | Protected (sensitivity label) |

### Files On-Demand

- **Online-only**: Saves space, downloads on open
- **Always keep**: Right-click → **Always keep on this device**
- **Free up space**: Right-click → **Free up space**

### Bandwidth Control

Right-click OneDrive tray → **Settings** → **Network**:
- **Upload rate**: Limit (KB/s) or "Adjust automatically"
- **Download rate**: Limit (KB/s) or "Adjust automatically"

## Security & Compliance

### Sensitivity Labels

Applied by admin - appear as badges:
- **Confidential** 🔒
- **Internal** 🏢
- **Public** 🌐
- **Custom** - Org-specific

### Data Loss Prevention (DLP)

- Admin-configured policies
- Detects: Credit cards, SSN, PII, custom patterns
- Actions: Warn, block, encrypt, notify admin

### Retention Policies

- Retain for X years
- Delete after X years
- Retain then delete
- Legal hold (preservation)

## Best Practices

### File Organization

```
OneDrive/
├── Projects/
│   ├── Project Alpha/
│   │   ├── Docs/
│   │   ├── Data/
│   │   └── Meetings/
│   └── Project Beta/
├── Personal/
│   ├── Finance/
│   └── Health/
├── Shared with Me/  (auto-organized)
└── Attachments/     (from Outlook)
```

### Naming Conventions

- `YYYY-MM-DD_Project_Document_v1.0.docx`
- `ProjectName_Category_Description_Date.ext`
- Avoid: Special chars, leading spaces, reserved names

### Sharing Hygiene

- **Default to "Specific people"** for sensitive files
- **Set expiration** on external links (30 days default)
- **Review quarterly**: Shared > By you → Remove stale links
- **Use Teams/SharePoint** for team collaboration (not personal OneDrive)

### Storage Management

- **Check usage**: Settings (gear) → **OneDrive settings** → **Storage metrics**
- **Large files**: View → **Sort by size** → Move/archive
- **Version cleanup**: Version history → Delete old versions
- **Recycle bin**: Empty periodically (auto-empties after 93 days)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Files not syncing | Check sync status, restart OneDrive, check storage quota |
| "File locked" | Close all instances, check co-authors, wait 10 min |
| Sharing not working | Check admin policies, external sharing enabled |
| Missing files | Check Recycle bin, Version history, Search across all sites |
| Slow performance | Pause sync, check bandwidth limits, restart app |

## Resources

- [OneDrive for Business Help](https://support.microsoft.com/en-us/onedrive)
- [OneDrive Limits](https://learn.microsoft.com/en-us/onedrive/limits)
- [OneDrive Admin Guide](https://learn.microsoft.com/en-us/onedrive/plan-onedrive-enterprise)
- [OneDrive Sync Client](https://support.microsoft.com/en-us/office/sync-files-with-onedrive-in-windows-615391c4-2bd3-4aae-a42a-858262e42a49)