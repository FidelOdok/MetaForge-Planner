---
layout: default
title: Quick Start
---

# Quick Start

Get from zero to your first hardware workflow in **5 minutes**.

## Prerequisites

- Node.js 18+
- Git
- Text editor

## Installation

```bash
cd /path/to/your/project
npm install
npm run build
```

## Step 1: Initialize

```bash
npm run forge setup
```

Creates `.forge/` workspace.

## Step 2: Configure

```bash
npm run forge onboard
```

Answer the prompts to set up your project.

## Step 3: Check Environment

```bash
npm run forge doctor
```

Verifies your setup.

## Step 4: Write PRD

Edit `PRD.md` with your requirements:

```markdown
# Drone Flight Controller

Educational FC for 3-5 inch racing drones.

## Requirements
- 6-axis IMU @ 8kHz
- 4x ESC outputs (Dshot)
- 30.5x30.5mm, <£15 BOM
```

## Step 5: Run Workflow

```bash
npm run forge run spec
```

Generates structured requirements (coming in v0.1).

## Workflow Diagram

```mermaid
graph LR
    A[Write PRD] --> B[forge run spec]
    B --> C[Review]
    C --> D[forge approve]
    D --> E[forge run architecture]

    style A fill:#E67E22,color:#fff
    style D fill:#27ae60,color:#fff
```

## What's Next?

- Explore [Examples](https://github.com/metaforge-labs/forge/tree/main/examples)
- Read [Architecture]({{ site.baseurl }}/architecture)
- Start the [Gateway]({{ site.baseurl }}/architecture)
