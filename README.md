# MetaForge

**From intent to hardware.**

MetaForge is a local-first control plane that turns human intent into reviewable, manufacturable hardware artifacts.

## Status

⚠️ **Early Development** — v0.1 in progress

## Quick Start

```bash
# Setup MetaForge
npm install
npm run build

# Initialize a project
forge setup

# Run interactive onboarding
forge onboard

# Start the gateway
forge gateway

# Run your first workflow
forge run spec
```

## What MetaForge Does

- Turns PRDs into structured requirements
- Validates architectures against constraints
- Interfaces with KiCad, SPICE, and other EDA tools
- Generates BOMs with cost analysis and alternates
- Produces manufacturing outputs (Gerbers, pick & place)
- Creates bring-up checklists and test plans

## Architecture

```
Human Intent (PRD, constraints)
         ↓
MetaForge Gateway (control plane)
         ↓
MetaForge Agents (specialists)
         ↓
MetaForge Tools (KiCad, SPICE, BOM, firmware)
         ↓
Hardware Artifacts (versioned, reviewable)
```

## Core Principles

1. **Local-first**: Your data stays on your machine
2. **Git-native**: Everything is versioned and diffed
3. **Agent-driven**: Specialist agents, not god-mode AI
4. **Safety**: Read-only by default, explicit approval for writes
5. **Reality feedback**: Bring-up data improves the next iteration

## Project Structure

```
project/
  PRD.md                    # Human intent
  constraints.json          # Design rules
  decisions.md              # Design decisions log

  eda/
    kicad/                  # Schematic + PCB

  bom/
    bom.csv                 # Bill of materials
    alternates.csv          # Component alternates
    costing.json            # Cost breakdown

  firmware/
    src/                    # Firmware source
    pinmap.json             # Pin mapping

  manufacturing/
    gerbers/                # Gerber files
    pick_place.csv          # Pick & place

  tests/
    bringup.md              # Bring-up checklist

  .forge/
    sessions/               # Agent sessions
    traces/                 # Execution traces
```

## Example: Drone Flight Controller

See `examples/drone-fc/` for a complete worked example.

## CLI Commands

- `forge setup` — Initialize workspace
- `forge onboard` — Interactive project setup
- `forge gateway` — Start the control plane
- `forge doctor` — Check dependencies
- `forge run <skill>` — Execute a workflow
- `forge status` — Show current state
- `forge approve` — Approve pending changes

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run in dev mode
npm run dev
```

## Roadmap

### v0.1 (Current)
- [x] Project structure
- [x] Vision & architecture
- [ ] CLI skeleton
- [ ] Gateway service
- [ ] KiCad read-only adapter
- [ ] Requirements agent
- [ ] Example: drone FC

### v0.2
- [ ] Schematic planning agent
- [ ] Power budget agent
- [ ] BOM agent with supplier integration
- [ ] DFM checks

### v0.3
- [ ] Firmware scaffolding
- [ ] Bring-up agent
- [ ] Test plan generation
- [ ] Reality feedback loop

## Why MetaForge?

Hardware development is stuck with 1995 tooling.

MetaForge brings:
- **Speed**: Minutes instead of days
- **Quality**: Automated checks catch issues early
- **Traceability**: Every decision is logged
- **Collaboration**: Git-based workflows
- **Learning**: Captured knowledge improves future designs

## License

MIT

## Contributing

MetaForge is early. If you're interested in contributing, start by reading `VISION.md` and `docs/architecture.md`.

---

Built with conviction that hardware deserves better tools.
