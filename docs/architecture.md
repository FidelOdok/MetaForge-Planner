---
layout: default
title: Architecture
description: Internal technical documentation for Forge system architecture and data flows
---

# Forge System Architecture

> **Internal Technical Documentation**
> This document describes the internal architecture, component interactions, and data flows within Forge.

## Overview

Forge is structured as a **control plane** that orchestrates specialist agents and tool adapters to transform human intent into manufacturable hardware artifacts.

## 1. High-Level System Architecture

```mermaid
graph TB
    subgraph "User Layer"
        A[Human Intent<br/>PRD, Constraints]
        B[Forge CLI<br/>Command Interface]
    end

    subgraph "Control Plane"
        C[Gateway Service<br/>HTTP/WebSocket]
        D[Session Manager<br/>State & Lifecycle]
        E[Permission System<br/>Access Control]
        F[Trace Logger<br/>Audit Trail]
    end

    subgraph "Agent Layer"
        G1[Requirements<br/>Agent]
        G2[Architecture<br/>Agent]
        G3[Power Budget<br/>Agent]
        G4[Schematic<br/>Agent]
        G5[BOM<br/>Agent]
        G6[DFM<br/>Agent]
    end

    subgraph "Tool Integration Layer"
        H1[KiCad<br/>Adapter]
        H2[SPICE<br/>Adapter]
        H3[Supplier APIs<br/>Adapter]
        H4[Firmware<br/>Toolchain]
    end

    subgraph "Storage Layer"
        I1[.forge/<br/>State]
        I2[Git<br/>Version Control]
        I3[File System<br/>Artifacts]
    end

    A --> B
    B <--> C
    C --> D
    C --> E
    C --> F

    D --> G1
    D --> G2
    D --> G3
    D --> G4
    D --> G5
    D --> G6

    G1 --> H1
    G2 --> H1
    G3 --> H2
    G4 --> H1
    G5 --> H3
    G6 --> H1

    F --> I1
    D --> I1
    H1 --> I3
    H2 --> I3
    H3 --> I3
    H4 --> I3

    I3 --> I2

    style C fill:#2C3E50,color:#fff,stroke:#E67E22,stroke-width:3px
    style A fill:#E67E22,color:#fff
    style I2 fill:#27ae60,color:#fff
```

## 2. Component Architecture

### 2.1 Forge CLI

**Purpose**: Primary user interface and command executor

```mermaid
graph LR
    subgraph "CLI Commands"
        A1[setup]
        A2[onboard]
        A3[gateway]
        A4[doctor]
        A5[run]
        A6[approve]
        A7[status]
    end

    subgraph "CLI Core"
        B[Commander.js<br/>Parser]
        C[HTTP Client<br/>Gateway API]
        D[Terminal UI<br/>Inquirer/Chalk]
    end

    A1 --> B
    A2 --> B
    A3 --> B
    A4 --> B
    A5 --> B
    A6 --> B
    A7 --> B

    B --> C
    B --> D
    C --> E[Gateway Service]

    style B fill:#3498db,color:#fff
    style E fill:#2C3E50,color:#fff
```

**Command Flow**:
1. User invokes CLI command
2. Commander.js parses arguments
3. HTTP client sends request to Gateway
4. Terminal UI displays results/prompts

### 2.2 Gateway Service

**Purpose**: Control plane, orchestration, and state management

```mermaid
graph TB
    subgraph "Gateway Core"
        A[HTTP Server<br/>Express/Fastify]
        B[WebSocket Server<br/>Real-time Updates]
    end

    subgraph "Request Handlers"
        C1[Session Handler]
        C2[Agent Handler]
        C3[Approval Handler]
        C4[Status Handler]
    end

    subgraph "Core Services"
        D1[Session Manager]
        D2[Agent Router]
        D3[Permission Enforcer]
        D4[State Store]
        D5[Trace Logger]
    end

    A --> C1
    A --> C2
    A --> C3
    A --> C4
    B --> C1

    C1 --> D1
    C2 --> D2
    C3 --> D3
    C4 --> D4

    D1 --> D4
    D2 --> D4
    D3 --> D4
    D2 --> D5
    D3 --> D5

    style A fill:#2C3E50,color:#fff
    style D4 fill:#E67E22,color:#fff
```

**API Endpoints** (v0.1):

```typescript
// Session Management
POST   /api/v1/session/create
GET    /api/v1/session/:id
DELETE /api/v1/session/:id
GET    /api/v1/sessions

// Agent Execution
POST   /api/v1/agent/run
GET    /api/v1/agent/:id/status

// Approval Workflow
GET    /api/v1/pending
POST   /api/v1/approve/:session
POST   /api/v1/reject/:session

// System Status
GET    /api/v1/status
GET    /api/v1/health
```

### 2.3 Agent System

**Purpose**: Specialist task executors with LLM integration

```mermaid
graph TB
    subgraph "Agent Base"
        A[Agent Interface]
        B[LLM Provider<br/>OpenAI/Anthropic]
        C[Tool Registry]
        D[Context Manager]
    end

    subgraph "Specialist Agents"
        E1[Requirements Agent<br/>PRD → Constraints]
        E2[Architecture Agent<br/>Constraints → Design]
        E3[Power Agent<br/>Design → Budget]
        E4[Schematic Agent<br/>Design → Plan]
        E5[BOM Agent<br/>Schematic → BOM]
        E6[DFM Agent<br/>PCB → Report]
    end

    A --> E1
    A --> E2
    A --> E3
    A --> E4
    A --> E5
    A --> E6

    E1 --> B
    E2 --> B
    E3 --> B
    E4 --> B
    E5 --> B
    E6 --> B

    E1 --> C
    E2 --> C
    E5 --> C

    B --> D
    C --> D

    style A fill:#9b59b6,color:#fff
    style B fill:#3498db,color:#fff
```

**Agent Lifecycle**:

```mermaid
stateDiagram-v2
    [*] --> Created: Gateway spawns agent
    Created --> Loading: Load context
    Loading --> Executing: Run LLM
    Executing --> Processing: Process response
    Processing --> Validating: Validate output
    Validating --> Completed: Success
    Validating --> Failed: Error
    Completed --> [*]
    Failed --> [*]

    note right of Executing
        Agent calls LLM
        Uses tools as needed
        Generates artifacts
    end note

    note right of Validating
        Schema validation
        Safety checks
        Output verification
    end note
```

### 2.4 Tool Adapters

**Purpose**: Clean interfaces to external tools and services

```mermaid
graph TB
    subgraph "Tool Adapter Base"
        A[Tool Interface]
        B[Capability Detection]
        C[Error Handling]
    end

    subgraph "EDA Tools"
        D1[KiCad Adapter]
        D2[Altium Adapter]
        D3[Eagle Adapter]
    end

    subgraph "Simulation Tools"
        E1[SPICE Adapter]
        E2[LTspice Adapter]
    end

    subgraph "Supply Chain"
        F1[Octopart API]
        F2[Mouser API]
        F3[Digi-Key API]
        F4[LCSC API]
    end

    subgraph "Firmware Tools"
        G1[GCC Toolchain]
        G2[Make/CMake]
        G3[Flash Tools]
    end

    A --> D1
    A --> D2
    A --> D3
    A --> E1
    A --> E2
    A --> F1
    A --> F2
    A --> F3
    A --> F4
    A --> G1
    A --> G2
    A --> G3

    B --> A
    C --> A

    style A fill:#e67e22,color:#fff
```

**Example: KiCad Adapter Interface**

```typescript
interface KiCadAdapter extends ToolAdapter {
  // Detection
  detect(): Promise<KiCadInstall | null>;
  getVersion(): Promise<string>;

  // Project Operations
  openProject(path: string): Promise<void>;
  closeProject(): Promise<void>;

  // Schematic Operations
  runERC(): Promise<ERCResult>;
  exportNetlist(format: string): Promise<string>;
  exportBOM(format: string): Promise<BOMData>;

  // PCB Operations
  runDRC(): Promise<DRCResult>;
  exportGerbers(config: GerberConfig): Promise<void>;
  exportPickPlace(): Promise<string>;

  // Utilities
  getComponents(): Promise<Component[]>;
  getPinMapping(): Promise<PinMap>;
}
```

## 3. Data Flow Architecture

### 3.1 Complete Workflow: PRD → Requirements

```mermaid
sequenceDiagram
    participant User
    participant CLI
    participant Gateway
    participant SessionMgr as Session Manager
    participant PermSys as Permission System
    participant Agent as Requirements Agent
    participant LLM as LLM Provider
    participant Store as State Store
    participant FS as File System

    User->>CLI: forge run spec
    CLI->>Gateway: POST /api/v1/agent/run {skill: "spec"}

    Gateway->>SessionMgr: Create session
    SessionMgr->>Store: Write session metadata
    Store-->>SessionMgr: Session ID
    SessionMgr-->>Gateway: Session created

    Gateway->>PermSys: Check permissions
    PermSys-->>Gateway: Read permission OK

    Gateway->>FS: Read PRD.md
    FS-->>Gateway: PRD content

    Gateway->>Agent: Execute(PRD content)
    Agent->>LLM: Prompt with PRD
    LLM-->>Agent: Structured response
    Agent->>Agent: Parse & validate
    Agent-->>Gateway: Artifacts {constraints.json, assumptions.md}

    Gateway->>Store: Write pending changes
    Gateway->>Store: Write trace log
    Store-->>Gateway: Changes staged

    Gateway-->>CLI: Response {session_id, diff, artifacts}
    CLI->>User: Display diff & request approval

    User->>CLI: forge approve
    CLI->>Gateway: POST /api/v1/approve/:session

    Gateway->>PermSys: Check write permission
    PermSys-->>Gateway: Approval required → OK

    Gateway->>FS: Write constraints.json
    Gateway->>FS: Write assumptions.md
    FS-->>Gateway: Files written

    Gateway->>SessionMgr: Mark session complete
    SessionMgr->>Store: Update session status

    Gateway-->>CLI: Success
    CLI-->>User: ✅ Changes applied
```

### 3.2 Session Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Created: CLI request
    Created --> Running: Agent starts
    Running --> Processing: Agent executing
    Processing --> PendingApproval: Has file changes
    Processing --> Completed: No changes needed
    PendingApproval --> Approved: User approves
    PendingApproval --> Rejected: User rejects
    Approved --> Applying: Writing files
    Applying --> Completed: Success
    Applying --> Failed: Write error
    Running --> Failed: Agent error
    Completed --> [*]
    Failed --> [*]
    Rejected --> [*]

    note right of Created
        Session metadata:
        - ID, timestamp
        - Skill name
        - Input files
        - User context
    end note

    note right of PendingApproval
        Staged changes:
        - Diffs
        - New files
        - Safety warnings
    end note

    note right of Completed
        Final state:
        - Artifacts committed
        - Trace logged
        - Git commit (optional)
    end note
```

### 3.3 Agent Execution Flow

```mermaid
flowchart TD
    A[Agent Invoked] --> B{Load Context}
    B --> C[Read Input Files]
    C --> D[Build Prompt]
    D --> E{Has Tools?}

    E -->|Yes| F[Register Tools]
    E -->|No| G[Call LLM]
    F --> G

    G --> H{Tool Calls?}
    H -->|Yes| I[Execute Tools]
    I --> J{More Calls?}
    J -->|Yes| G
    J -->|No| K[Parse Response]

    H -->|No| K

    K --> L{Validate Output}
    L -->|Invalid| M[Retry with Feedback]
    M --> G

    L -->|Valid| N[Generate Artifacts]
    N --> O{Safety Check}

    O -->|Fail| P[Reject & Log]
    O -->|Pass| Q[Stage Changes]

    Q --> R[Return to Gateway]
    P --> S[Return Error]

    style G fill:#3498db,color:#fff
    style O fill:#e74c3c,color:#fff
    style Q fill:#27ae60,color:#fff
```

### 3.4 Multi-Agent Workflow

```mermaid
flowchart TD
    A[User: forge run architecture] --> B[Gateway]

    B --> C{Dependencies Met?}
    C -->|No constraints.json| D[Error: Run spec first]
    C -->|Yes| E[Spawn Architecture Agent]

    E --> F[Architecture Agent]
    F --> G[Generate Block Diagram]
    G --> H[Select Components]
    H --> I[Create architecture.md]

    I --> J[Stage for Approval]
    J --> K{User Approves?}

    K -->|No| L[Discard]
    K -->|Yes| M[Write Files]

    M --> N{Next Workflow?}
    N -->|User: forge run schematic-plan| O[Spawn Schematic Agent]
    N -->|Stop| P[Done]

    O --> Q[Schematic Agent]
    Q --> R[Read architecture.md]
    R --> S[Plan Schematic Approach]
    S --> T[Stage for Approval]

    T --> U{Approve?}
    U -->|Yes| V[Write schematic-plan.md]
    U -->|No| L

    V --> P

    style B fill:#2C3E50,color:#fff
    style F fill:#9b59b6,color:#fff
    style Q fill:#9b59b6,color:#fff
```

## 4. Workspace & State Management

### 4.1 Workspace Structure

```mermaid
graph TD
    A[Project Root] --> B[User Files]
    A --> C[Generated]
    A --> D[.forge/]

    B --> B1[PRD.md]
    B --> B2[decisions.md]

    C --> C1[constraints.json]
    C --> C2[architecture.md]
    C --> C3[eda/]
    C --> C4[bom/]
    C --> C5[firmware/]
    C --> C6[manufacturing/]

    D --> D1[config.json]
    D --> D2[sessions/]
    D --> D3[runs/]
    D --> D4[traces/]
    D --> D5[artifacts/]

    D2 --> D2A[session-123/<br/>metadata.json<br/>trace.jsonl<br/>artifacts/]

    D4 --> D4A[2024-02-03.jsonl]

    style A fill:#E67E22,color:#fff
    style D fill:#2C3E50,color:#fff
    style D1 fill:#F39C12,color:#000
```

**Directory Details**:

```
project/
├── PRD.md                      # User-written requirements
├── constraints.json            # Generated by requirements agent
├── decisions.md                # Design decision log
│
├── eda/                        # EDA tool files
│   └── kicad/
│       ├── board.kicad_sch
│       └── board.kicad_pcb
│
├── bom/                        # Bill of materials
│   ├── bom.csv
│   ├── alternates.csv
│   └── costing.json
│
├── firmware/                   # Firmware source
│   ├── src/
│   ├── pinmap.json
│   └── CMakeLists.txt
│
├── manufacturing/              # Manufacturing outputs
│   ├── gerbers/
│   ├── pick_place.csv
│   └── assembly_notes.md
│
├── tests/                      # Test plans
│   └── bringup.md
│
└── .forge/                     # Forge internal state
    ├── config.json             # Workspace config
    │
    ├── sessions/               # Active & completed sessions
    │   └── abc123/
    │       ├── metadata.json   # Session info
    │       ├── trace.jsonl     # Execution trace
    │       └── artifacts/      # Staged changes
    │
    ├── runs/                   # Historical run data
    │   └── run-456.json
    │
    ├── traces/                 # Daily trace logs
    │   └── 2024-02-03.jsonl
    │
    └── artifacts/              # Cached artifacts
        └── component-db.json
```

### 4.2 State Store Schema

```mermaid
erDiagram
    CONFIG {
        string version
        string workspace_path
        object gateway_config
        object permissions
        object tools
    }

    SESSION {
        string id
        string skill
        string status
        datetime created
        datetime updated
        object input
        object output
        array traces
    }

    TRACE {
        datetime timestamp
        string session_id
        string agent
        string action
        object data
        string level
    }

    ARTIFACT {
        string path
        string type
        string content
        string hash
        datetime created
    }

    CONFIG ||--o{ SESSION : configures
    SESSION ||--|{ TRACE : contains
    SESSION ||--o{ ARTIFACT : produces
```

## 5. Permission & Safety Model

### 5.1 Permission Flow

```mermaid
flowchart TD
    A[Request Received] --> B{Request Type?}

    B -->|Read| C{File Accessible?}
    C -->|Yes| D[Allow]
    C -->|No| E[Reject: Access Denied]

    B -->|Write| F{Requires Approval?}
    F -->|Yes| G{Approved?}
    F -->|No| H{Safe Operation?}

    G -->|Yes| I[Execute & Log]
    G -->|No| J[Stage for Review]

    H -->|Yes| I
    H -->|No| K[Reject: Unsafe]

    B -->|Execute| L{Tool Safe?}
    L -->|Yes| M{Has Permission?}
    L -->|No| N[Reject: Dangerous Tool]

    M -->|Yes| I
    M -->|No| O[Require Explicit Grant]

    I --> P[Write Trace]
    J --> Q[Notify User]

    D --> R[Success]
    E --> S[Error]
    K --> S
    N --> S
    P --> R

    style D fill:#27ae60,color:#fff
    style E fill:#e74c3c,color:#fff
    style I fill:#3498db,color:#fff
    style J fill:#f39c12,color:#000
```

### 5.2 Permission Levels

```mermaid
graph LR
    subgraph "Permission Hierarchy"
        A[Read Only] --> B[Propose]
        B --> C[Write]
        C --> D[Execute]
        D --> E[Admin]
    end

    A -.->|Can| A1[Read files<br/>Run checks<br/>View status]
    B -.->|Can| B1[+ Stage changes<br/>+ Generate artifacts]
    C -.->|Can| C1[+ Write files<br/>+ Modify state]
    D -.->|Can| D1[+ Run tools<br/>+ External calls]
    E -.->|Can| E1[+ Config changes<br/>+ Full control]

    style A fill:#95a5a6,color:#fff
    style B fill:#3498db,color:#fff
    style C fill:#f39c12,color:#000
    style D fill:#e67e22,color:#fff
    style E fill:#e74c3c,color:#fff
```

**Permission Matrix**:

| Operation | Read | Propose | Write | Execute | Admin |
|-----------|------|---------|-------|---------|-------|
| Read PRD.md | ✅ | ✅ | ✅ | ✅ | ✅ |
| Generate constraints.json | ❌ | ✅ | ✅ | ✅ | ✅ |
| Write constraints.json | ❌ | ❌ | ✅ | ✅ | ✅ |
| Run KiCad ERC | ❌ | ❌ | ❌ | ✅ | ✅ |
| Modify config.json | ❌ | ❌ | ❌ | ❌ | ✅ |

### 5.3 Safety Checks

```mermaid
flowchart TD
    A[Agent Output] --> B{Schema Valid?}
    B -->|No| C[Reject]
    B -->|Yes| D{Contains Secrets?}

    D -->|Yes| E[Warn & Redact]
    D -->|No| F{File Size OK?}

    F -->|No| G[Reject: Too Large]
    F -->|Yes| H{Path Safe?}

    H -->|No| I[Reject: Path Traversal]
    H -->|Yes| J{Overwrites Exist?}

    J -->|Yes| K[Require Explicit Approval]
    J -->|No| L{Destructive?}

    L -->|Yes| M[Warn User]
    L -->|No| N[Stage Changes]

    K --> O{Approved?}
    O -->|Yes| N
    O -->|No| C

    M --> N
    N --> P[Apply]

    style C fill:#e74c3c,color:#fff
    style G fill:#e74c3c,color:#fff
    style I fill:#e74c3c,color:#fff
    style P fill:#27ae60,color:#fff
```

## 6. Technology Stack

### 6.1 Implementation Stack (v0.1)

```mermaid
graph TB
    subgraph "Frontend"
        A1[CLI - TypeScript]
        A2[Commander.js]
        A3[Inquirer.js]
        A4[Chalk]
    end

    subgraph "Backend"
        B1[Gateway - Node.js]
        B2[Express/Fastify]
        B3[TypeScript]
    end

    subgraph "Agent Runtime"
        C1[TypeScript]
        C2[OpenAI SDK]
        C3[Anthropic SDK]
    end

    subgraph "Storage"
        D1[File System]
        D2[JSON/JSONL]
        D3[Git]
    end

    subgraph "External"
        E1[KiCad CLI]
        E2[ngspice]
        E3[REST APIs]
    end

    A1 --> B1
    B1 --> C1
    C1 --> D1
    C1 --> E1
    C1 --> E2
    C1 --> E3

    style B1 fill:#2C3E50,color:#fff
    style C1 fill:#9b59b6,color:#fff
    style D1 fill:#27ae60,color:#fff
```

### 6.2 Dependencies

**CLI**:
- `commander` — CLI framework
- `inquirer` — Interactive prompts
- `chalk` — Terminal colors
- `axios` — HTTP client

**Gateway**:
- `express` or `fastify` — HTTP server
- `ws` — WebSocket support
- `zod` — Schema validation
- `pino` — Structured logging

**Agents**:
- `openai` — OpenAI API client
- `@anthropic-ai/sdk` — Anthropic API client
- `ajv` — JSON schema validation

**Tools**:
- `execa` — Process execution
- `glob` — File pattern matching
- `chokidar` — File watching

## 7. Design Principles & Patterns

### 7.1 Core Principles

```mermaid
mindmap
    root((Forge<br/>Principles))
        Local-First
            No cloud dependency
            Works offline
            Data sovereignty
        Git-Native
            Version all artifacts
            Diffs for review
            Commit history
        Transparent
            Traceable operations
            Audit logs
            Explainable decisions
        Safe
            Explicit approval
            No destructive actions
            Rollback capable
        Composable
            Skills as units
            Workflows as chains
            Extensible architecture
```

### 7.2 Architectural Patterns

**1. Command Pattern (CLI)**
```typescript
interface Command {
  name: string;
  execute(args: Args): Promise<Result>;
}
```

**2. Adapter Pattern (Tools)**
```typescript
interface ToolAdapter {
  detect(): Promise<boolean>;
  execute(action: Action): Promise<Result>;
}
```

**3. Chain of Responsibility (Permissions)**
```typescript
interface PermissionHandler {
  next?: PermissionHandler;
  handle(request: Request): boolean;
}
```

**4. Observer Pattern (Sessions)**
```typescript
interface SessionObserver {
  onStateChange(session: Session): void;
}
```

**5. Strategy Pattern (Agents)**
```typescript
interface AgentStrategy {
  execute(context: Context): Promise<Artifacts>;
}
```

## 8. Deployment Architecture

### 8.1 Local Deployment (v0.1)

```mermaid
graph TB
    subgraph "User Machine"
        A[Terminal] --> B[Forge CLI]
        B <--> C[Gateway Process]

        C --> D[.forge/ State]
        C --> E[Git Repo]
        C --> F[KiCad Install]
        C --> G[Text Editor]

        C <--> H[OpenAI API]
        C <--> I[Anthropic API]
    end

    style A fill:#E67E22,color:#fff
    style C fill:#2C3E50,color:#fff
```

### 8.2 Future: Team Deployment

```mermaid
graph TB
    subgraph "Client Machines"
        A1[User 1 CLI]
        A2[User 2 CLI]
        A3[User 3 CLI]
    end

    subgraph "Shared Server"
        B[Gateway Service]
        C[Redis Cache]
        D[PostgreSQL]
    end

    subgraph "Shared Storage"
        E[Git Remote]
        F[Artifact Store]
    end

    A1 <--> B
    A2 <--> B
    A3 <--> B

    B --> C
    B --> D
    B <--> E
    B <--> F

    style B fill:#2C3E50,color:#fff
```

## 9. Scalability Considerations

### 9.1 Performance Targets (v0.1)

| Operation | Target | Notes |
|-----------|--------|-------|
| CLI startup | <500ms | Cold start |
| Gateway response | <100ms | Non-agent requests |
| Agent execution | <30s | Depends on LLM |
| File write | <1s | Local FS |
| Session creation | <200ms | State write |

### 9.2 Resource Limits

| Resource | Limit | Reason |
|----------|-------|--------|
| Session size | 10MB | Memory constraint |
| Trace log | 100MB/day | Disk space |
| Concurrent agents | 3 | LLM rate limits |
| File size | 10MB | Safety limit |

## 10. Future Enhancements

### 10.1 Planned Features

```mermaid
timeline
    title Forge Roadmap
    section v0.2
        Gateway HTTP : Requirements Agent : KiCad Read
    section v0.3
        Architecture Agent : Power Agent : BOM Agent
    section v0.4
        Schematic Agent : DFM Agent : Supplier Integration
    section v0.5
        Firmware Scaffolding : Bring-up Agent : Reality Feedback
    section v1.0
        Multi-user : Cloud Sync : Advanced Agents
```

### 10.2 Extension Points

1. **Custom Agents**: Plugin system for domain-specific agents
2. **Tool Adapters**: Support for additional EDA tools
3. **LLM Providers**: Pluggable LLM backends
4. **Storage Backends**: Database options for scale
5. **Web UI**: Optional web interface for teams

---

## Appendix: Key Data Structures

### Session Metadata

```typescript
interface Session {
  id: string;
  skill: string;
  status: SessionStatus;
  created: Date;
  updated: Date;
  input: {
    files: string[];
    args: Record<string, any>;
  };
  output: {
    artifacts: Artifact[];
    errors: Error[];
  };
  traces: Trace[];
}
```

### Trace Entry

```typescript
interface Trace {
  timestamp: Date;
  session_id: string;
  agent: string;
  action: string;
  data: any;
  level: 'debug' | 'info' | 'warn' | 'error';
}
```

### Artifact

```typescript
interface Artifact {
  path: string;
  type: 'file' | 'directory';
  content?: string;
  hash: string;
  size: number;
  created: Date;
}
```

---

**Document Version**: v0.1
**Last Updated**: 2024-02-03
**Status**: Internal Architecture Documentation

[← Home]({{ site.baseurl }}/) • [Quick Start →]({{ site.baseurl }}/quickstart)
