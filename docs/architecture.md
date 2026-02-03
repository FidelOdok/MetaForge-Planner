---
layout: default
title: Architecture
---

# Forge Architecture

Forge is structured as a **control plane** that orchestrates specialist agents and tool adapters.

## System Overview

```mermaid
graph TB
    subgraph User
        A[Human Intent]
        B[CLI]
    end

    subgraph Control
        C[Gateway]
        D[Sessions]
        E[Permissions]
    end

    subgraph Agents
        F[Requirements]
        G[Architecture]
        H[BOM]
    end

    subgraph Tools
        I[KiCad]
        J[SPICE]
        K[APIs]
    end

    A --> B
    B --> C
    C --> D
    C --> E
    D --> F
    D --> G
    D --> H
    F --> I
    G --> I
    H --> K

    style C fill:#2C3E50,color:#fff
    style A fill:#E67E22,color:#fff
```

## Core Components

### 1. Forge CLI

Primary user interface.

**Commands**:
- `setup` — Initialize workspace
- `onboard` — Configure project
- `gateway` — Start control plane
- `doctor` — Check environment
- `run <skill>` — Execute workflows
- `approve` — Review changes

### 2. Forge Gateway

Control plane and orchestrator.

```mermaid
graph TD
    A[Request] --> B[Gateway]
    B --> C[Session Manager]
    B --> D[Agent Router]
    B --> E[State Store]

    style B fill:#2C3E50,color:#fff
```

**Responsibilities**:
- Session management
- Agent orchestration
- Permission enforcement
- State persistence

### 3. Agent System

Specialist agents for specific tasks.

```mermaid
graph LR
    A[Requirements] --> B[constraints.json]
    C[Architecture] --> D[architecture.md]
    E[BOM] --> F[bom.csv]

    style A fill:#3498db,color:#fff
    style C fill:#3498db,color:#fff
    style E fill:#3498db,color:#fff
```

### 4. Tool Adapters

Clean interfaces to external tools.

**Example: KiCad Adapter**

```typescript
interface KiCadAdapter {
  runERC(): Promise<ERCResult>;
  exportBOM(): Promise<BOMData>;
  exportNetlist(): Promise<string>;
}
```

## Data Flow

### Workflow: "Generate Requirements"

```mermaid
sequenceDiagram
    User->>CLI: forge run spec
    CLI->>Gateway: Execute
    Gateway->>Agent: Run
    Agent->>Gateway: Return artifacts
    Gateway->>CLI: Show diff
    CLI->>User: Request approval

    User->>CLI: forge approve
    CLI->>Gateway: Apply
    Gateway->>User: ✅ Done
```

## Workspace Structure

```
project/
  PRD.md
  constraints.json
  eda/
  bom/
  .forge/
    config.json
    sessions/
    traces/
```

## Safety Model

```mermaid
graph TD
    A[Request] --> B{Permission?}
    B -->|Read| C[Allow]
    B -->|Write| D{Approved?}
    D -->|Yes| C
    D -->|No| E[Reject]

    style E fill:#e74c3c,color:#fff
    style C fill:#27ae60,color:#fff
```

**Permission Levels**:
1. **Read**: Always allowed
2. **Propose**: Requires approval
3. **Write**: Requires explicit approval
4. **Execute**: Requires review

## Technology Stack

**v0.1**:
- TypeScript + Node.js
- Commander.js (CLI)
- Express (Gateway)
- File system (State)
- Git (VCS)

## Design Principles

1. **Local-first**: Works offline
2. **Git-native**: Version control first-class
3. **Transparent**: All operations traceable
4. **Safe**: No destructive actions without approval
5. **Composable**: Skills combine into workflows

---

[← Home]({{ site.baseurl }}/) • [Quick Start →]({{ site.baseurl }}/quickstart)
