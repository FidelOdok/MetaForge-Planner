# MetaForge — Quick Start Guide

## 🔥 What You Have

MetaForge v0.1 foundation:
- **CLI skeleton** (TypeScript)
- **Documentation site** (Jekyll + Mermaid)
- **Brand identity** (Anvil + Fire)
- **Example project** (Drone flight controller)

## 📂 Project Structure

```
MetaForge/
├── cli/                    # CLI commands (TypeScript)
│   ├── index.ts           # Main CLI entry
│   └── commands/          # Command implementations
├── docs/                   # Documentation site (Jekyll)
│   ├── Dockerfile         # Docker for docs
│   ├── docker-compose.yml # Docker Compose
│   ├── index.md           # Homepage
│   ├── quickstart.md      # Quick start guide
│   ├── architecture.md    # Architecture docs
│   └── assets/            # CSS, images, etc.
├── examples/              # Example projects
│   └── drone-fc/         # Drone flight controller
│       └── PRD.md        # Product requirements
├── agents/                # Agent implementations (empty)
├── gateway/               # Gateway service (empty)
├── tools/                 # Tool adapters (empty)
├── README.md             # Main README
├── VISION.md             # Philosophy & vision
├── roadmap.md            # Development roadmap
├── package.json          # Node.js dependencies
└── tsconfig.json         # TypeScript config
```

## 🚀 Launch Documentation Site

```bash
cd docs
docker-compose up

# Visit: http://localhost:4000
```

The docs will auto-reload when you edit files.

## 🎨 Brand Colors

From your logo (anvil + fire):

- **Orange** `#E67E22` — Primary (flame)
- **Amber** `#F39C12` — Secondary (flame gradient)
- **Dark Gray** `#2C3E50` — Anvil
- **Silver** `#BDC3C7` — Highlights
- **Red-Orange** `#E74C3C` — Spark/Accent

## 📋 Next Steps (Choose Your Path)

### Path 1: Install & Test CLI

```bash
# Install dependencies
npm install

# Build
npm run build

# Test CLI commands
npm run forge setup
npm run forge doctor
npm run forge status
```

### Path 2: Architecture First

Review and refine:
1. `docs/architecture.md` — System design
2. `VISION.md` — Philosophy
3. `roadmap.md` — Development plan

### Path 3: Start Building

Pick ONE to implement first:
- **Gateway** (`gateway/`) — Control plane service
- **Requirements Agent** (`agents/requirements/`) — First agent
- **KiCad Adapter** (`tools/kicad/`) — Tool integration

## 🧠 Recommended Order

1. **Review architecture** (30 min)
2. **Install dependencies** `npm install`
3. **Test CLI skeleton** `npm run forge doctor`
4. **Launch docs** `cd docs && docker-compose up`
5. **Pick first implementation target**

## 📖 Key Documents

- `VISION.md` — What MetaForge is (and isn't)
- `README.md` — Front door
- `docs/architecture.md` — System design
- `roadmap.md` — Development timeline
- `examples/drone-fc/PRD.md` — Reference project

## 🐳 Docker Commands

```bash
# Start docs
cd docs && docker-compose up

# Rebuild docs
cd docs && docker-compose up --build

# Stop docs
docker-compose down
```

## 💡 Tips

- **Docs auto-reload** — Edit `.md` files and refresh browser
- **Mermaid diagrams** — Automatically themed with brand colors
- **Git-native** — Commit often, everything is versioned
- **Architecture-first** — Think before coding

## 🎯 First Milestone (v0.1)

Goal: PRD → Structured Requirements

**What to build**:
1. Gateway HTTP service
2. Requirements agent (LLM-powered)
3. End-to-end demo

**Timeline**: 1-2 weeks

## 🔗 Resources

- Docs: http://localhost:4000 (after `docker-compose up`)
- Vision: `VISION.md`
- Roadmap: `roadmap.md`
- Example: `examples/drone-fc/`

---

**Ready to build?**

```bash
npm install && cd docs && docker-compose up
```

Then visit http://localhost:4000 🔥
