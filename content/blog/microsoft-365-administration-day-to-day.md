---
title: "Microsoft 365 Administration: What I Actually Do Day to Day"
description: "A practical look at Microsoft 365 admin tasks: accounts, licenses, Outlook and Teams support, all tied back to Active Directory. The unglamorous foundation."
date: 2026-02-01
categories:
  - Microsoft 365
  - ICT Operations
tags:
  - microsoft-365
  - outlook
  - teams
  - administration
author: "Madhusudan Upadhyay"
toc: true
difficulty: Beginner
technologies: ["Microsoft 365", "Active Directory"]
relatedProjects: ["microsoft-365-administration"]
---

Microsoft 365 shows up in almost every ticket queue I've worked. Here's how I think about the admin side of it: not theory, just the work.

## Accounts and Licenses

Before anything else works, the account has to be right.

- Create the user in the right place with the right license
- Match Outlook and Teams access to what the person actually needs
- Keep group membership tied to Active Directory so access stays consistent

It's boring work until someone can't log in on their first day. Then it's everything.

## Working With Active Directory

M365 identity still connects back to the directory in most environments I've supported. That means:

- Provisioning accounts in AD first, then M365
- Using groups to control who gets access to what
- Following the same onboarding and offboarding steps every time: no shortcuts

## Supporting Users Without Losing Your Mind

A few habits that help:

1. **Write it down.** If three people ask the same question, it becomes a knowledge article.
2. **Follow your incident process.** Even small requests benefit from being logged and closed properly.
3. **Talk plainly.** Most users don't need the technical version: they need to know what to click.

## The Short Version

Good M365 administration isn't flashy. It's consistent account work, clear communication, and documentation that saves you next week.
