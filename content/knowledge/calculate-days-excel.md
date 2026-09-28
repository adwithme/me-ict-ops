---
title: "Calculate the Number of Days in Excel"
date: 2022-08-03
description: "Complete guide to calculating days between dates, working days, age, and date differences in Excel with formulas, functions, and practical examples."
tags: ["Excel", "Date Functions", "Formulas", "Spreadsheets", "Data Analysis"]
topics: ["Microsoft 365", "Office Applications", "Data Analysis"]
draft: false
toc: true
---

Excel provides multiple ways to calculate days between dates. This guide covers all methods from basic subtraction to advanced working day calculations.

## Basic Date Math

### Simple Subtraction

```excel
=End_Date - Start_Date
```

**Example**: `=B2-A2` where A2=Start, B2=End

**Result**: Serial number representing days

### TODAY() Function

```excel
=TODAY() - A2
```

Days from date in A2 to today.

## Key Date Functions

### DAYS Function (Excel 2013+)

```excel
=DAYS(end_date, start_date)
```

**Example**: `=DAYS(B2, A2)`

- Returns positive if end > start
- Returns negative if end < start

### DATEDIF Function (Hidden, Legacy)

```excel
=DATEDIF(start_date, end_date, "unit")
```

| Unit | Returns |
|------|---------|
| `"d"` | Complete days |
| `"m"` | Complete months |
| `"y"` | Complete years |
| `"md"` | Days ignoring months/years |
| `"ym"` | Months ignoring years |
| `"yd"` | Days ignoring years |

**Example**: `=DATEDIF(A2, B2, "d")`

> ⚠️ **Note**: DATEDIF doesn't appear in function autocomplete but works in all Excel versions.

## Working Days Calculations

### NETWORKDAYS (Standard Working Days)

```excel
=NETWORKDAYS(start_date, end_date, [holidays])
```

- Excludes weekends (Sat/Sun)
- Optional holidays range

**Example**: 
```excel
=NETWORKDAYS(A2, B2, $E$2:$E$10)
```
Where E2:E10 contains holiday dates.

### NETWORKDAYS.INTL (Custom Weekends)

```excel
=NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])
```

**Weekend codes**:

| Code | Weekend Days |
|------|--------------|
| 1 (default) | Sat, Sun |
| 2 | Sun, Mon |
| 3 | Mon, Tue |
| 4 | Tue, Wed |
| 5 | Wed, Thu |
| 6 | Thu, Fri |
| 7 | Fri, Sat |
| 11 | Sun only |
| 12 | Mon only |
| 13 | Tue only |
| 14 | Wed only |
| 15 | Thu only |
| 16 | Fri only |
| 17 | Sat only |

**Custom weekend string** (7 chars, 1=weekend):
```excel
=NETWORKDAYS.INTL(A2, B2, "0000011", Holidays)
```
"0000011" = Fri, Sat weekend (Middle East)

## Age Calculations

### Exact Age (Years, Months, Days)

```excel
=DATEDIF(A2, TODAY(), "y") & " years, " & 
 DATEDIF(A2, TODAY(), "ym") & " months, " & 
 DATEDIF(A2, TODAY(), "md") & " days"
```

### Age in Years Only

```excel
=INT((TODAY()-A2)/365.25)
```
Or more accurately:
```excel
=DATEDIF(A2, TODAY(), "y")
```

### Next Birthday

```excel
=DATE(YEAR(TODAY()), MONTH(A2), DAY(A2))
```
If past this year:
```excel
=IF(DATE(YEAR(TODAY()), MONTH(A2), DAY(A2)) < TODAY(),
    DATE(YEAR(TODAY())+1, MONTH(A2), DAY(A2)),
    DATE(YEAR(TODAY()), MONTH(A2), DAY(A2)))
```

## Business Day Calculations

### Add Working Days

```excel
=WORKDAY(start_date, days, [holidays])
```

**Example**: `=WORKDAY(TODAY(), 10, Holidays)` - Date 10 business days from today

### Custom Weekend WORKDAY.INTL

```excel
=WORKDAY.INTL(start_date, days, [weekend], [holidays])
```

### Days Until Deadline (Business Days)

```excel
=NETWORKDAYS(TODAY(), Deadline, Holidays)
```

## Advanced Date Calculations

### Days in Month

```excel
=DAY(EOMONTH(A2, 0))
```
Or:
```excel
=DAY(DATE(YEAR(A2), MONTH(A2)+1, 1)-1)
```

### First/Last Day of Month

```excel
=EOMONTH(A2, -1)+1     ; First day of current month
=EOMONTH(A2, 0)        ; Last day of current month
=EOMONTH(A2, 1)        ; Last day of next month
```

### Quarter Calculations

```excel
=ROUNDUP(MONTH(A2)/3, 0)        ; Quarter number (1-4)
=DATE(YEAR(A2), (QUART*3)-2, 1) ; First day of quarter
=EOMONTH(DATE(YEAR(A2), QUART*3, 1), 0) ; Last day of quarter
```

### Fiscal Year (Starting Month N)

```excel
=YEAR(A2) + IF(MONTH(A2) >= Fiscal_Start_Month, 1, 0)
```
Where Fiscal_Start_Month = 4 for April start.

## Practical Examples

### Project Duration Tracker

| Task | Start | End | Duration | Work Days |
|------|-------|-----|----------|-----------|
| Design | 2025-01-01 | 2025-01-15 | `=C2-B2` | `=NETWORKDAYS(B2,C2,$H$2:$H$10)` |
| Development | 2025-01-16 | 2025-02-15 | `=C3-B3` | `=NETWORKDAYS(B3,C3,$H$2:$H$10)` |
| Testing | 2025-02-16 | 2025-03-01 | `=C4-B4` | `=NETWORKDAYS(B4,C4,$H$2:$H$10)` |

**Total**: `=SUM(D2:D4)` calendar days, `=SUM(E2:E4)` work days

### Invoice Aging

```excel
=TODAY() - Invoice_Date
```
Categorize:
```excel
=IFS(
    Days<=30, "Current",
    Days<=60, "31-60 Days",
    Days<=90, "61-90 Days",
    Days>90, "Over 90 Days"
)
```

### Subscription Renewal Alert

```excel
=IF(Expiry_Date - TODAY() <= 30, "⚠️ Renew Soon", "✅ Active")
```

### SLA Compliance

```excel
=IF(NETWORKDAYS(Created_Date, Resolved_Date, Holidays) <= SLA_Days, "✅ Met", "❌ Breached")
```

## Common Pitfalls

| Issue | Cause | Solution |
|-------|-------|----------|
| `#VALUE!` | Text stored as dates | Use `DATEVALUE()` or Text to Columns |
| `#NUM!` | DATEDIF start > end | Ensure start ≤ end |
| Wrong weekends | NETWORKDAYS assumes Sat/Sun | Use NETWORKDAYS.INTL |
| Holidays not excluded | Range not absolute | Use `$E$2:$E$10` |
| 1900 date system | Pre-1900 dates | Use 1904 date system (Options > Advanced) |

## Dynamic Arrays (Excel 365)

### Sequence of Dates

```excel
=SEQUENCE(30, 1, TODAY(), 1)
```
30 days from today.

### Business Days Only

```excel
=LET(
    dates, SEQUENCE(60, 1, TODAY(), 1),
    workdays, FILTER(dates, WEEKDAY(dates, 2) < 6),
    FILTER(workdays, COUNTIF(Holidays, workdays) = 0)
)
```

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Current date | Ctrl+; |
| Current time | Ctrl+Shift+; |
| Current date & time | Ctrl+; Space Ctrl+Shift+; |
| Fill down | Ctrl+D |
| Fill right | Ctrl+R |
| Flash Fill | Ctrl+E |

## Resources

- [Excel Date Functions](https://support.microsoft.com/en-us/office/date-and-time-functions-reference-ff58d114-4b3c-4e8a-9a5a-7a7c7c7c7c7c)
- [NETWORKDAYS.INTL](https://support.microsoft.com/en-us/office/networkdays-intl-function-3d5b4b8b-7a7c-4b3c-4e8a-9a5a-7a7c7c7c7c7c)
- [DATEDIF Documentation](https://support.microsoft.com/en-us/office/datedif-function-25dba1a4-2812-480b-84dd-8b32a451b35c)
- [EOMONTH Function](https://support.microsoft.com/en-us/office/eomonth-function-7314ffa1-2bc1-4d3f-84ae-9e9e9e9e9e9e)