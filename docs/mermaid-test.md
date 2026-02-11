---
layout: default
title: Mermaid Test
---

# Mermaid Diagram Test

This page tests if Mermaid diagrams are rendering correctly.

## Test 1: Simple Flowchart

```mermaid
graph LR
    A[Start] --> B[Process]
    B --> C[End]

    style A fill:#E67E22,color:#fff
    style C fill:#27ae60,color:#fff
```

## Test 2: Sequence Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant S as System

    U->>S: Request
    S->>U: Response
```

## Test 3: Gantt Chart

```mermaid
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Phase 1
    Task 1 :2024-01-01, 30d
    Task 2 :2024-02-01, 20d
```

## Test 4: Flowchart with Styling

```mermaid
flowchart TB
    Start[Start Process] --> Check{Check Status}
    Check -->|Yes| Success[Success]
    Check -->|No| Fail[Failure]

    style Start fill:#E67E22,color:#fff
    style Success fill:#27ae60,color:#fff
    style Fail fill:#e74c3c,color:#fff
```

---

If you see rendered diagrams above, Mermaid is working correctly! ✅

If you see code blocks instead, Mermaid is not rendering. ❌
