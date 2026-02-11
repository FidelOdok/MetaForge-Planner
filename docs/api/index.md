---
layout: default
title: API Reference
nav_order: 6
description: "MetaForge Gateway API documentation"
mermaid: true
---

# API Reference
{: .no_toc }

Complete REST API documentation for MetaForge Gateway
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Base URL

```
http://localhost:3000/api/v1
```

---

## Authentication

Currently no authentication required for local deployment. Future versions will support API keys for team deployments.

---

## Session Management

### Create Session

Create a new execution session.

**Endpoint**: `POST /session/create`

**Request Body**:
```json
{
  "skill": "spec",
  "input": {
    "files": ["PRD.md"],
    "args": {}
  }
}
```

**Response**:
```json
{
  "id": "session-abc123",
  "skill": "spec",
  "status": "created",
  "created": "2024-02-03T10:30:00Z"
}
```

---

### Get Session

Retrieve session details.

**Endpoint**: `GET /session/:id`

**Response**:
```json
{
  "id": "session-abc123",
  "skill": "spec",
  "status": "completed",
  "created": "2024-02-03T10:30:00Z",
  "updated": "2024-02-03T10:30:45Z",
  "output": {
    "artifacts": [
      {
        "path": "constraints.json",
        "type": "file",
        "size": 2048
      }
    ]
  }
}
```

---

### List Sessions

Get all sessions.

**Endpoint**: `GET /sessions`

**Query Parameters**:
- `limit` (number): Max results (default: 50)
- `offset` (number): Pagination offset
- `status` (string): Filter by status

**Response**:
```json
{
  "sessions": [
    {
      "id": "session-abc123",
      "skill": "spec",
      "status": "completed",
      "created": "2024-02-03T10:30:00Z"
    }
  ],
  "total": 10,
  "limit": 50,
  "offset": 0
}
```

---

### Delete Session

Delete a session and its artifacts.

**Endpoint**: `DELETE /session/:id`

**Response**:
```json
{
  "success": true,
  "deleted": "session-abc123"
}
```

---

## Agent Execution

### Run Agent

Execute an agent workflow.

**Endpoint**: `POST /agent/run`

**Request Body**:
```json
{
  "skill": "architecture",
  "input": {
    "files": ["constraints.json"]
  },
  "options": {
    "temperature": 0.3,
    "verbose": false
  }
}
```

**Response**:
```json
{
  "session_id": "session-def456",
  "status": "running",
  "agent": "architecture-agent"
}
```

---

### Get Agent Status

Check agent execution status.

**Endpoint**: `GET /agent/:id/status`

**Response**:
```json
{
  "session_id": "session-def456",
  "status": "pending_approval",
  "agent": "architecture-agent",
  "artifacts": [
    {
      "path": "architecture.md",
      "diff": "+50 -0"
    }
  ]
}
```

---

## Approval Workflow

### List Pending Approvals

Get all pending approvals.

**Endpoint**: `GET /pending`

**Response**:
```json
{
  "pending": [
    {
      "session_id": "session-def456",
      "skill": "architecture",
      "created": "2024-02-03T10:35:00Z",
      "artifacts": [
        {
          "path": "architecture.md",
          "size": 3072,
          "diff": "+85 -0"
        }
      ]
    }
  ]
}
```

---

### Approve Session

Approve pending changes.

**Endpoint**: `POST /approve/:session`

**Request Body** (optional):
```json
{
  "comment": "LGTM"
}
```

**Response**:
```json
{
  "session_id": "session-def456",
  "status": "approved",
  "applied": true,
  "artifacts": [
    "architecture.md"
  ]
}
```

---

### Reject Session

Reject pending changes.

**Endpoint**: `POST /reject/:session`

**Request Body**:
```json
{
  "reason": "Need to revise power requirements"
}
```

**Response**:
```json
{
  "session_id": "session-def456",
  "status": "rejected",
  "reason": "Need to revise power requirements"
}
```

---

## System Status

### Health Check

Check gateway health.

**Endpoint**: `GET /health`

**Response**:
```json
{
  "status": "healthy",
  "version": "0.1.0",
  "uptime": 3600,
  "components": {
    "gateway": "ok",
    "llm_provider": "ok",
    "tools": {
      "kicad": "detected",
      "ngspice": "not_found"
    }
  }
}
```

---

### System Status

Get detailed system status.

**Endpoint**: `GET /status`

**Response**:
```json
{
  "version": "0.1.0",
  "workspace": "/path/to/workspace",
  "sessions": {
    "active": 1,
    "pending": 2,
    "completed": 15
  },
  "tools": [
    {
      "name": "kicad",
      "version": "8.0.0",
      "available": true
    }
  ],
  "agents": [
    {
      "name": "requirements",
      "version": "1.0.0",
      "loaded": true
    }
  ]
}
```

---

## WebSocket API

### Connect

```javascript
const ws = new WebSocket('ws://localhost:3000/ws');

ws.on('open', () => {
  console.log('Connected to MetaForge Gateway');
});

ws.on('message', (data) => {
  const event = JSON.parse(data);
  console.log('Event:', event);
});
```

---

### Events

**Session Started**:
```json
{
  "event": "session.started",
  "data": {
    "session_id": "session-abc123",
    "skill": "spec"
  }
}
```

**Agent Progress**:
```json
{
  "event": "agent.progress",
  "data": {
    "session_id": "session-abc123",
    "agent": "requirements-agent",
    "progress": 0.5,
    "message": "Parsing constraints..."
  }
}
```

**Session Complete**:
```json
{
  "event": "session.complete",
  "data": {
    "session_id": "session-abc123",
    "status": "pending_approval",
    "artifacts": ["constraints.json"]
  }
}
```

---

## Error Responses

### Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input: missing required field 'skill'",
    "details": {
      "field": "skill",
      "expected": "string"
    }
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request body |
| `NOT_FOUND` | 404 | Resource not found |
| `AGENT_ERROR` | 500 | Agent execution failed |
| `TOOL_ERROR` | 500 | Tool execution failed |
| `TIMEOUT` | 504 | Operation timed out |

---

## Rate Limits

No rate limits for local deployment. Future cloud deployment will implement:

- 100 requests/minute per API key
- 10 concurrent agent executions

---

## Examples

### Complete Workflow

```javascript
// 1. Create session
const createResponse = await fetch('http://localhost:3000/api/v1/session/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    skill: 'spec',
    input: { files: ['PRD.md'] }
  })
});

const { id: sessionId } = await createResponse.json();

// 2. Run agent
await fetch('http://localhost:3000/api/v1/agent/run', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    skill: 'spec',
    input: { files: ['PRD.md'] }
  })
});

// 3. Poll for completion
let status;
do {
  const statusResponse = await fetch(`http://localhost:3000/api/v1/agent/${sessionId}/status`);
  status = await statusResponse.json();
  await sleep(1000);
} while (status.status === 'running');

// 4. Approve if pending
if (status.status === 'pending_approval') {
  await fetch(`http://localhost:3000/api/v1/approve/${sessionId}`, {
    method: 'POST'
  });
}
```

---

## Client Libraries

### TypeScript/JavaScript

```bash
npm install @metaforge/client
```

```typescript
import { MetaForgeClient } from '@metaforge/client';

const client = new MetaForgeClient('http://localhost:3000');

// Run workflow
const session = await client.runSkill('spec', {
  files: ['PRD.md']
});

// Wait for completion
await session.waitForCompletion();

// Approve
if (session.status === 'pending_approval') {
  await session.approve();
}
```

### Python

```bash
pip install metaforge-client
```

```python
from metaforge import MetaForgeClient

client = MetaForgeClient('http://localhost:3000')

# Run workflow
session = client.run_skill('spec', files=['PRD.md'])

# Wait and approve
session.wait_for_completion()
if session.status == 'pending_approval':
    session.approve()
```

---

[← Tools](../tools/) • [Examples →](../examples/)
