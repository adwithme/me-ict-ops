---
title: "OneDrive for Business on Web - Part II: Advanced Features"
date: 2022-08-02
description: "Advanced OneDrive for Business web features - automation with Power Automate, file requests, sensitivity labels, advanced sharing, and integration with Teams/SharePoint."
tags: ["OneDrive", "OneDrive for Business", "Power Automate", "Automation", "File Requests", "Sensitivity Labels", "Microsoft 365"]
topics: ["Microsoft 365", "Cloud Storage", "Automation"]
draft: false
toc: true
---

Building on the basics, this guide covers advanced OneDrive for Business features for power users and administrators.

## Power Automate Integration

### Accessing Automate

Select file/folder → **Automate** in command bar → **Create a flow** or **See your flows**

### Common Flow Templates

#### 1. Save Email Attachments to OneDrive

**Trigger**: When a new email arrives (Outlook)
**Condition**: Has attachments
**Action**: Create file in OneDrive
- **Folder Path**: `/Attachments/From Email/`
- **File Name**: `From_Subject_Attachment_Name`
- **File Content**: Attachment content

```json
{
  "trigger": "When a new email arrives (V3)",
  "condition": "HasAttachment equals true",
  "actions": [
    "For each attachment",
    "Create file (OneDrive for Business)",
    "Folder: /Email Attachments/@{triggerOutputs()?['from']}/",
    "File Name: @{items('For_each')?['name']}",
    "File Content: @{items('For_each')?['contentBytes']}"
  ]
}
```

#### 2. Move Files Based on Content Type

**Trigger**: When a file is created (OneDrive)
**Condition**: File extension equals `.pdf` / `.xlsx` / `.docx`
**Action**: Move file to categorized folder

```json
{
  "trigger": "When a file is created (properties only)",
  "switch": "FileExtension",
  "cases": {
    ".pdf": "Move to /Archive/PDFs/",
    ".xlsx": "Move to /Data/Spreadsheets/",
    ".docx": "Move to /Documents/Word/",
    "default": "Leave in root"
  }
}
```

#### 3. Notify Team on New File

**Trigger**: When a file is created in shared folder
**Action**: Post message to Teams channel
- **Team**: Project Team
- **Channel**: Files
- **Message**: "New file uploaded: @{triggerOutputs()?['body/{Name}']} by @{triggerOutputs()?['body/{ModifiedBy}']}"

#### 4. Approval Workflow

**Trigger**: When a file is created in `/For Approval/`
**Action**: Start approval
- **Assigned to**: Manager email
- **Details**: File link, requestor
- **If approved**: Move to `/Approved/`, send confirmation
- **If rejected**: Move to `/Rejected/`, notify requestor

### Custom Flow from Scratch

1. **Automate** → **Create a flow** → **Instant cloud flow**
2. **Trigger**: "For a selected file" (OneDrive)
3. **Add actions**: Approve, Move, Email, Teams, Planner, etc.
4. **Save** → Appears in **Automate** menu for selected files

## File Requests

### Creating a File Request

1. Select folder → **Request files** (command bar)
2. **What files are you requesting?** - Description for sender
3. **Send link** - Copy link or enter emails
4. **Files go to** - Current folder (creates `File Requests` subfolder)

### File Request Features

| Feature | Description |
|---------|-------------|
| **Anonymous upload** | No sign-in required (if enabled by admin) |
| **File size limit** | Up to 250 GB per file |
| **Notifications** | Email when files received |
| **Expiration** | Set expiry date (default: none) |
| **Password** | Optional password protection |
| **Branding** | Custom page title/logo (admin) |

### Managing Requests

- **File Requests** page: Settings (gear) → **File requests**
- **View submissions**: Open `File Requests` subfolder
- **Disable/Delete**: Stop receiving new uploads

### Use Cases

- **Client deliverables**: Collect project assets
- **HR onboarding**: New hire documents
- **Finance receipts**: Expense submissions
- **Event photos**: Gather attendee uploads

## Sensitivity Labels

### Understanding Labels

Applied by admin - appear as colored badges:
| Label | Icon | Typical Protection |
|-------|------|-------------------|
| **Personal** | 👤 | None (default) |
| **Public** | 🌐 | None |
| **Internal** | 🏢 | Encrypt, internal only |
| **Confidential** | 🔒 | Encrypt, restrict access |
| **Highly Confidential** | 🔴 | Encrypt, watermark, no print/copy |

### Applying Labels

**Manual**:
1. Select file(s) → **Sensitivity** (shield icon)
2. Choose label
3. **Apply**

**Auto-labeling** (Admin configured):
- Content-based (credit card, SSN, keywords)
- Context-based (folder location, sender)
- Machine learning classifiers

### Label Effects

| Protection | Behavior |
|------------|----------|
| **Encryption** | Only authorized users can open |
| **Watermark** | "CONFIDENTIAL" on document |
| **Header/Footer** | Classification text |
| **Print restriction** | Block/allow printing |
| **Copy restriction** | Block copy/paste |
| **Screen capture block** | Prevent screenshots (Office apps) |
| **Access expiry** | Auto-expire access after X days |
| **Offline access** | Allow/deny offline caching |

### Viewing Label Details

1. Select labeled file → **Details pane** (i)
2. **Sensitivity** section shows:
   - Label name
   - Applied by / date
   - Permissions granted
   - Expiry (if set)

## Advanced Sharing

### Sharing Settings Deep Dive

**Share dialog → Link settings (gear icon)**

| Setting | Description | When to Use |
|---------|-------------|-------------|
| **Allow editing** | Recipients can modify | Collaboration |
| **Block download** | View-only in browser | Sensitive data, IP protection |
| **Set expiration** | Link expires after X days | Time-limited access |
| **Set password** | Additional auth layer | Sensitive external sharing |
| **Open in review mode** | Can comment only | Feedback without edits |

### Sharing with External Users

**Admin must enable** in SharePoint Admin Center:
- **Policies** → **Sharing** → **External sharing**
- **Anyone** (anonymous links) or **New/Existing guests**

**Guest Access**:
- Guest receives invitation email
- Redeems with Microsoft account or one-time passcode
- Added to Azure AD as `Guest` user type
- Access governed by **External collaboration settings**

### Sharing Best Practices

| Scenario | Recommended Setting |
|----------|---------------------|
| Internal collaboration | People in org / Can edit |
| External review | Specific people / Can view / Block download |
| Client deliverable | Specific people / Can view / Expiration 30 days |
| Public resource | Anyone / Can view / No expiration |
| Confidential data | Specific people / Can view / Block download / Password |

### Bulk Sharing Management

**Shared > By you** → Select multiple → **Manage access**
- **Stop sharing** multiple items
- **Change permissions** in bulk
- **Add expiration** to existing links
- **Audit** who has access

## Teams & SharePoint Integration

### OneDrive vs SharePoint vs Teams

| Aspect | OneDrive | SharePoint | Teams |
|--------|----------|------------|-------|
| **Purpose** | Personal work files | Team/org content | Collaboration hub |
| **Ownership** | Individual | Site/Group | Team/Channel |
| **Sharing** | Ad-hoc | Structured | Conversation-based |
| **Retention** | Personal | Policy-driven | Policy-driven |
| **Migration** | Move to SharePoint | - | Files tab = SharePoint |

### Moving Files to SharePoint/Teams

**When to move**:
- Project grows beyond personal scope
- Team needs persistent access
- Compliance/retention policies needed
- Offboarding employee

**Move Process**:
1. Select files in OneDrive → **Move to**
2. Choose **SharePoint site** or **Teams channel**
3. Files retain metadata, versions, sharing links (if permissions allow)

### Teams Files Tab = SharePoint

- Each **Channel** = Folder in Team's SharePoint site
- **Files tab** = Document library view
- **Sync** in Teams = Sync SharePoint library
- **Private channels** = Separate site collections

### OneDrive in Teams App

**Teams > Apps > OneDrive** → Pinned sidebar:
- Access personal OneDrive within Teams
- Same features as web
- **Add to channel** → Share OneDrive file to channel conversation

## Advanced Search (KQL)

### Keyword Query Language

| Operator | Example | Result |
|----------|---------|--------|
| `author:` | `author:"John Doe"` | Files modified by John |
| `filetype:` | `filetype:pdf` | Only PDFs |
| `modified:` | `modified:last week` | Recent files |
| `size:` | `size:>10MB` | Large files |
| `path:` | `path:/Projects/Alpha` | Specific folder |
| `title:` | `title:"budget"` | Title contains budget |
| `AND/OR/NOT` | `budget AND filetype:xlsx` | Combined |

### Search Verticals

| Vertical | Scope |
|----------|-------|
| **Files** | OneDrive + SharePoint |
| **People** | Directory, org chart |
| **Conversations** | Teams, Yammer, Outlook |
| **Sites** | SharePoint sites |
| **Answers** | Viva Topics, Q&A |

### Saved Searches

1. Perform search
2. **Save search** (bookmark icon)
3. Access from **Search home** page

## Content Automation with Rules

### File Naming Rules (Admin)

- Enforce naming conventions
- Auto-apply metadata
- Block non-compliant uploads

### Retention Labels

**Admin configures** → User applies:
1. Select file → **Retention label** (flag icon)
2. Choose: `Keep 7 years`, `Delete after 3 years`, `Legal hold`
3. **Policy** auto-enforces retention/disposition

### Content Types

**SharePoint site settings** → **Content types**:
- Add columns: Project, Client, Status, Priority
- Apply to OneDrive via **Content type publishing hub**
- Enables filtering, views, automation

## Advanced Troubleshooting

### Sync Deep Dive

**OneDrive logs**: `%localappdata%\Microsoft\OneDrive\logs\`
- `Business1.log` - Main sync log
- `FileSyncErrors.log` - File-level errors

**Reset Sync**:
```cmd
%localappdata%\Microsoft\OneDrive\OneDrive.exe /reset
%localappdata%\Microsoft\OneDrive\OneDrive.exe /shutdown
```

### Web Cache Issues

1. **Clear browser cache** for `*.sharepoint.com`, `*.live.com`
2. **Incognito/Private** window test
3. **Different browser** test
4. **Clear OneDrive cookies**: DevTools > Application > Cookies

### API/Graph Access

**Microsoft Graph API** for automation:
```http
GET /me/drive/root/children
GET /me/drive/items/{id}/versions
POST /me/drive/items/{id}/createLink
```

**Permissions**: `Files.ReadWrite.All`, `Sites.ReadWrite.All`

## Admin Controls (Reference)

| Setting | Location |
|---------|----------|
| External sharing | SharePoint Admin > Policies > Sharing |
| Sync restrictions | OneDrive Admin > Sync > Block sync domains |
| Storage limits | OneDrive Admin > Storage > Default quota |
| Retention policies | Compliance > Data lifecycle > Retention |
| DLP policies | Compliance > Data loss prevention |
| Sensitivity labels | Compliance > Information protection |
| Device access | Endpoint Manager > Apps > App protection |

## Resources

- [Power Automate OneDrive Connector](https://learn.microsoft.com/en-us/connectors/onedriveforbusiness/)
- [File Request Documentation](https://support.microsoft.com/en-us/office/create-a-file-request-f54aa7f8-2589-4f39-b414-13e6d7d8e5a3)
- [Sensitivity Labels](https://learn.microsoft.com/en-us/microsoft-365/compliance/sensitivity-labels)
- [OneDrive Graph API](https://learn.microsoft.com/en-us/graph/api/resources/onedrive)
- [KQL Reference](https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference)