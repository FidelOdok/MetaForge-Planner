---
layout: default
title: Contributing
nav_order: 8
description: "How to contribute to MetaForge"
---

# Contributing to MetaForge
{: .no_toc }

Help build the future of hardware development
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Welcome!

Thank you for your interest in contributing to MetaForge! We're building the tools hardware engineers deserve, and we need your help.

---

## Ways to Contribute

### 1. Code Contributions
- Implement new agents
- Add tool adapters
- Improve core functionality
- Fix bugs

### 2. Documentation
- Improve existing docs
- Add tutorials
- Create example projects
- Fix typos

### 3. Testing
- Test on different platforms
- Report bugs
- Suggest improvements
- Beta test new features

### 4. Community
- Answer questions
- Share your projects
- Write blog posts
- Give talks

---

## Getting Started

### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/metaforge-labs/forge.git
cd forge

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run in dev mode
npm run dev
```

### Project Structure

```
forge/
├── cli/                # CLI implementation
├── gateway/            # Gateway service
├── agents/             # Agent implementations
├── tools/              # Tool adapters
├── core/               # Core utilities
├── tests/              # Test suites
└── docs/               # Documentation
```

---

## Development Workflow

### 1. Create Issue

Before starting work:
1. Check existing issues
2. Create new issue describing your proposal
3. Wait for feedback/approval

### 2. Fork & Branch

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR-USERNAME/forge.git
cd forge

# Create feature branch
git checkout -b feature/your-feature-name
```

### 3. Make Changes

- Write clear, concise code
- Follow existing code style
- Add tests for new features
- Update documentation

### 4. Test Thoroughly

```bash
# Run all tests
npm test

# Run specific test
npm test -- agents/requirements

# Type check
npm run typecheck

# Lint
npm run lint
```

### 5. Commit

Follow conventional commits:

```bash
git commit -m "feat: add architecture agent"
git commit -m "fix: handle missing KiCad installation"
git commit -m "docs: update API reference"
```

Commit types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `test`: Tests
- `refactor`: Code refactoring
- `chore`: Maintenance

### 6. Submit PR

```bash
# Push to your fork
git push origin feature/your-feature-name
```

Then create PR on GitHub with:
- Clear title and description
- Link to related issue
- Screenshots/examples if applicable

---

## Code Guidelines

### TypeScript Style

```typescript
// ✅ Good: Clear types, descriptive names
interface AgentResult {
  artifacts: Artifact[];
  metadata: ExecutionMetadata;
  traces: Trace[];
}

async function executeAgent(
  agent: Agent,
  context: ExecutionContext
): Promise<AgentResult> {
  // Implementation
}

// ❌ Bad: Vague types, unclear purpose
interface Result {
  data: any;
  info: object;
}

async function run(a: any, c: any): Promise<any> {
  // Implementation
}
```

### Error Handling

```typescript
// ✅ Good: Specific error types
class AgentError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error,
    public readonly context?: Record<string, any>
  ) {
    super(message);
    this.name = 'AgentError';
  }
}

// Use try-catch with specific handling
try {
  await agent.execute(context);
} catch (error) {
  if (error instanceof ToolError) {
    logger.error('Tool execution failed', { error });
    throw new AgentError('Agent failed due to tool error', error);
  }
  throw error;
}
```

### Testing

```typescript
// Write clear, focused tests
describe('RequirementsAgent', () => {
  describe('validateInput', () => {
    it('accepts valid PRD', () => {
      const agent = new RequirementsAgent();
      const result = agent.validateInput({
        prd: 'Valid PRD content'
      });

      expect(result.valid).toBe(true);
    });

    it('rejects empty PRD', () => {
      const agent = new RequirementsAgent();
      const result = agent.validateInput({
        prd: ''
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('PRD cannot be empty');
    });
  });
});
```

---

## Adding a New Agent

### 1. Create Agent File

```typescript
// agents/my-agent/index.ts
import { Agent, AgentConfig, ExecutionContext } from '@metaforge/core';

export class MyAgent implements Agent {
  name = 'my-agent';
  version = '1.0.0';
  description = 'Does something useful';

  async initialize(config: AgentConfig): Promise<void> {
    // Setup
  }

  async execute(context: ExecutionContext): Promise<AgentResult> {
    // Implementation
  }

  validateInput(input: any): ValidationResult {
    // Validation
  }

  validateOutput(output: any): ValidationResult {
    // Validation
  }
}
```

### 2. Add Tests

```typescript
// agents/my-agent/my-agent.test.ts
import { describe, it, expect } from 'vitest';
import { MyAgent } from './index';

describe('MyAgent', () => {
  it('executes successfully', async () => {
    const agent = new MyAgent();
    await agent.initialize(mockConfig);

    const result = await agent.execute(mockContext);

    expect(result.artifacts).toBeDefined();
  });
});
```

### 3. Register Agent

```typescript
// gateway/agents.ts
import { MyAgent } from '../agents/my-agent';

export const agents = {
  'requirements': RequirementsAgent,
  'architecture': ArchitectureAgent,
  'my-agent': MyAgent  // Add here
};
```

### 4. Add Documentation

```markdown
<!-- docs/agents/my-agent.md -->
# My Agent

Description of what this agent does...

## Usage

...
```

---

## Adding a Tool Adapter

### 1. Implement Adapter

```typescript
// tools/my-tool/index.ts
import { ToolAdapter } from '@metaforge/core';

export class MyToolAdapter implements ToolAdapter {
  name = 'my-tool';

  async detect(): Promise<ToolInstall | null> {
    // Detection logic
  }

  async execute(action: Action): Promise<Result> {
    // Execution logic
  }
}
```

### 2. Add Tests

```typescript
describe('MyToolAdapter', () => {
  it('detects tool installation', async () => {
    const adapter = new MyToolAdapter();
    const install = await adapter.detect();

    expect(install).toBeDefined();
  });
});
```

---

## Review Process

### What We Look For

1. **Functionality**: Does it work as intended?
2. **Tests**: Are there adequate tests?
3. **Documentation**: Is it documented?
4. **Code Quality**: Is it clean and maintainable?
5. **Performance**: Is it efficient?

### Review Timeline

- Initial review: 2-3 days
- Follow-up: 1-2 days
- Merge: After approval

---

## Community Guidelines

### Be Respectful
- Treat everyone with respect
- Be open to feedback
- Assume good intentions

### Be Constructive
- Provide helpful feedback
- Suggest improvements
- Celebrate successes

### Be Collaborative
- Share knowledge
- Help others
- Build together

---

## Resources

- [GitHub Repository](https://github.com/metaforge-labs/forge)
- [Issue Tracker](https://github.com/metaforge-labs/forge/issues)
- [Discussions](https://github.com/metaforge-labs/forge/discussions)
- [Discord Server](https://discord.gg/metaforge) (coming soon)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Questions?

- Create an issue: [GitHub Issues](https://github.com/metaforge-labs/forge/issues)
- Start a discussion: [GitHub Discussions](https://github.com/metaforge-labs/forge/discussions)

---

**Thank you for contributing to MetaForge!** 🔥

[← Examples](../examples/) • [Home →](../)
