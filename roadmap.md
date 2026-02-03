# Forge Roadmap

## v0.1 — Foundation (Weeks 1-2) 🔥 IN PROGRESS

**Goal**: CLI + workspace + example

- [x] Project structure
- [x] Vision & README
- [x] CLI skeleton (TypeScript)
  - [x] `forge setup`
  - [x] `forge onboard`
  - [x] `forge doctor`
  - [x] `forge status`
  - [x] `forge gateway` (stub)
  - [x] `forge run` (stub)
  - [x] `forge approve` (stub)
- [x] Example: drone FC PRD
- [ ] Gateway service (basic)
- [ ] KiCad adapter (read-only)
- [ ] Requirements agent (first real agent)
- [ ] End-to-end demo: PRD → constraints.json

**Demo**: "Natural language PRD → structured requirements"

---

## v0.2 — First Real Workflow (Weeks 3-4)

**Goal**: PRD → Architecture → Component Selection

**Features**:
- [ ] Architecture agent
  - [ ] Generate block diagram
  - [ ] Select MCU
  - [ ] Select key components
  - [ ] Output: `architecture.md`
- [ ] Power budget agent
  - [ ] Calculate power requirements
  - [ ] Validate against input
  - [ ] Output: `power-budget.md`
- [ ] Gateway improvements
  - [ ] Session management
  - [ ] Trace logging
  - [ ] Approval workflow
- [ ] KiCad adapter (write mode)
  - [ ] Create new project
  - [ ] Basic schematic generation

**Demo**: "PRD → architecture → component list with justifications"

---

## v0.3 — BOM & Manufacturing (Weeks 5-6)

**Goal**: Complete flow to manufacturing outputs

**Features**:
- [ ] Schematic planning agent
  - [ ] Analyze architecture
  - [ ] Propose schematic approach
  - [ ] Reference design integration
- [ ] BOM agent
  - [ ] Extract from schematic
  - [ ] Supplier integration (Octopart API)
  - [ ] Cost analysis
  - [ ] Alternates suggestion
  - [ ] Lifecycle checking
- [ ] DFM agent
  - [ ] Basic design rule checks
  - [ ] Component availability
  - [ ] Assembly complexity
- [ ] Manufacturing outputs
  - [ ] Gerber export
  - [ ] Pick & place
  - [ ] Assembly docs

**Demo**: "Complete flow: PRD → BOM with pricing → Gerbers"

---

## v0.4 — Firmware Integration (Weeks 7-8)

**Goal**: Hardware + firmware coordination

**Features**:
- [ ] Firmware scaffolding
  - [ ] Pin mapping sync
  - [ ] HAL generation
  - [ ] Build scripts
- [ ] Bring-up agent
  - [ ] Generate test plan
  - [ ] Checklist generation
  - [ ] SCPI integration (basic)
- [ ] Reality feedback loop
  - [ ] Capture test results
  - [ ] Feed back to agents
  - [ ] Improve next iteration

**Demo**: "Hardware design → firmware scaffold → bring-up plan"

---

## v0.5 — Polish & Testing (Weeks 9-10)

**Goal**: Robust, documented, tested

**Features**:
- [ ] Comprehensive tests
- [ ] Error handling
- [ ] Better logging
- [ ] Documentation improvements
- [ ] Performance optimization
- [ ] Security audit

**Demo**: "Production-ready workflow on real project"

---

## v1.0 — Public Release (Week 12)

**Goal**: Open source launch

**Features**:
- [ ] Full documentation
- [ ] Multiple examples
- [ ] Video tutorials
- [ ] Community guidelines
- [ ] CI/CD setup
- [ ] Release automation

**Launch**:
- GitHub release
- HN launch
- YouTube demo
- Twitter thread
- Blog post

---

## Future (Post v1.0)

### Agent Enhancements
- Multi-page schematic support
- Advanced component selection (ML)
- Cost optimization
- Supply chain monitoring
- Reliability analysis

### Tool Integrations
- Altium support
- EAGLE support
- LTspice integration
- Cadence integration
- More suppliers (Mouser, Digi-Key, LCSC)

### Collaboration
- Team workflows
- Design reviews
- Shared component libraries
- Cloud sync (optional)

### Advanced Features
- PCB layout agent (experimental)
- Simulation automation
- Thermal analysis
- Signal integrity checks
- EMC pre-compliance

### Platform
- Web UI (optional)
- VS Code extension
- GitHub integration
- Slack/Discord bots
- API for custom integrations

---

## Milestones

| Milestone | Target | Status |
|-----------|--------|--------|
| v0.1 Foundation | Week 2 | 🔥 In Progress |
| v0.2 First Workflow | Week 4 | ⏳ Planned |
| v0.3 BOM & Mfg | Week 6 | ⏳ Planned |
| v0.4 Firmware | Week 8 | ⏳ Planned |
| v0.5 Polish | Week 10 | ⏳ Planned |
| v1.0 Launch | Week 12 | ⏳ Planned |

---

## Non-Goals (Explicitly Out of Scope)

- ❌ Full EDA replacement
- ❌ AI-designed circuits (no human review)
- ❌ Mechanical CAD
- ❌ 3D modeling
- ❌ Simulation (beyond basic checks)
- ❌ SaaS platform (local-first always)
- ❌ Multi-tenant (single user/team)

---

Built with focus. One feature at a time. 🔥
