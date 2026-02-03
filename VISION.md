# Forge Vision

## What Forge Is

Forge is a **local-first control plane** for building real hardware.

It turns human intent into **reviewable, manufacturable artifacts**:
- Schematics
- BOMs
- PCB layouts
- Firmware scaffolds
- Manufacturing files
- Test plans

Forge is **opinionated about what matters**:
- Physics beats prompts
- Artifacts > chat
- Diffs > vibes
- Reality feedback > simulations alone
- Humans stay in the loop

## Prime Rule

**If it can't be versioned, reviewed, and built — Forge doesn't output it.**

## What Forge Is Not

- Not an EDA tool replacement (we integrate with KiCad, Altium, etc.)
- Not a chat interface for hardware design
- Not a black-box AI that designs boards for you
- Not a SaaS platform (local-first always)
- Not trying to replace engineers

## Architecture Principles

1. **Control Plane First**: Forge is the orchestrator, not the executor
2. **Agent-Driven**: Specialist agents for requirements, power, schematic, BOM, DFM
3. **Tool Adapters**: Clean interfaces to KiCad, SPICE, suppliers, firmware toolchains
4. **Git-Native**: Everything is versioned, diffed, and reviewable
5. **Safety by Default**: Read-only first, explicit approval for writes

## Success Criteria

Forge succeeds when:
- A hardware engineer can go from PRD → reviewed schematic in minutes
- Every decision is traceable
- Every output is inspectable
- Teams can collaborate on hardware like they do on software
- Reality (test data, bring-up feedback) improves the next iteration

## Non-Goals (v0.1)

- Full schematic synthesis
- Circuit optimization
- 3D mechanical design
- Simulation (beyond basic checks)
- Cloud inference
- Multi-user collaboration (yet)

## First Use Case

Educational drone flight controller:
- STM32-based
- Known constraints (power, IO, cost)
- Real manufacturing target
- Perfect for demonstrating Forge's value

## Why This Matters

Hardware development is stuck in 1995 tooling.

Forge brings hardware development into the era of:
- Infrastructure as code
- Agent-based workflows
- Continuous integration
- Rapid iteration

We're not replacing engineers.

We're giving them superpowers.
