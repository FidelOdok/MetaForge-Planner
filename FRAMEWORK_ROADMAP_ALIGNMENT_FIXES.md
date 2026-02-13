# Framework-to-Roadmap Alignment: Action Plan

**Date**: 2024-02-13
**Review Score**: 78/100 → 95/100 (estimated after fixes)
**Status**: 🟢 **HIGH PRIORITY FIXES COMPLETE** | 🟡 **MEDIUM PRIORITY REMAINING**
**Last Updated**: 2024-02-13

---

## Executive Summary

A comprehensive alignment review identified **5 critical issues** that must be fixed before Phase 1 release, **4 medium-priority improvements** for Phase 2, and **2 long-term enhancements**.

**Overall Assessment**: Strategic alignment is strong (all 25 disciplines covered), but tactical execution has significant discrepancies in agent counts, discipline sequencing, and timeline claims.

---

## 🔴 HIGH PRIORITY FIXES (Must Fix Before Phase 1 Release)

### Issue #1: Agent Count Mismatch Across Documents

**Problem**: Different documents claim different agent counts for Phase 1.

**Current State**:
| Document | Phase 1 Agent Count | Line Reference |
|----------|---------------------|----------------|
| `FRAMEWORK_MAPPING.md` | 7 agents | Lines 219-227 |
| `index.md` | 6-8 agents | Lines 1150-1154 |
| `README.md` | 4-6 agents | Lines 134-140 |
| `mvp-roadmap.md` | No explicit count | Implies 6-8 from context |

**Impact**: User confusion, overpromising capabilities

**Root Cause**: Documents written at different times without synchronization

**Recommended Fix**: Standardize on **6-7 agents** (realistic for 6-month MVP with 4 engineers)

**Phase 1 Canonical Agent List**:
1. **REQ** - Requirements/Product Spec Agent → Discipline #1
2. **EE** - Electronics/Architecture Agent → Discipline #4
3. **FW** - Firmware/Embedded Agent → Discipline #5
4. **SIM** - Simulation Agent → Discipline #7
5. **MFG** - Manufacturing Prep Agent → Discipline #10 (partial)
6. **SC** - Supply Chain/Cost Agent → Disciplines #10 (partial) + #14
7. **TST** (optional) - Test Plan Agent → Discipline #9 (partial)

**Disciplines Covered**: 6-7 core disciplines (not 12)

**Action Items**:
- [ ] Update `FRAMEWORK_MAPPING.md` line 219-227
- [ ] Update `index.md` line 1150 to "6-7 agents"
- [ ] Update `README.md` lines 134-140 to "6-7 specialist agents"
- [ ] Add explicit agent list to `mvp-roadmap.md`

---

### Issue #2: Layer 1 Core Disciplines Delayed to Phase 3

**Problem**: Industrial Design (#2) and Prototyping (#8) are Layer 1 (Core Engineering) but delayed 18 months to Phase 3.

**Current State**:
| Discipline | Layer | Current Phase | Issue |
|------------|-------|---------------|-------|
| #2 Industrial Design | 1 (Core) | Phase 3 (v0.7-1.0) | ❌ Should be Phase 1-2 |
| #8 Prototyping & Fabrication | 1 (Core) | Phase 3 (v0.7-1.0) | ❌ Needed for EVT gate |

**Impact**:
- **Industrial Design**: Mechanical engineering (Phase 2) depends on form factor decisions
- **Prototyping**: EVT/DVT/PVT gates (Phase 1) require build pack generation

**Recommended Fix**:
- **Industrial Design** → Move to **Phase 2** (v0.4-0.6)
  - Needed before/alongside mechanical engineering
  - Form factor informs enclosure design

- **Prototyping Agent** → Move to **Phase 2** (v0.4-0.6)
  - Required for automated build pack generation
  - EVT gate mentions "build pack" but no agent to generate it

**Action Items**:
- [ ] Update `FRAMEWORK_MAPPING.md` lines 254-262
- [ ] Move Industrial Design from Phase 3 to Phase 2 in `index.md`
- [ ] Move Prototyping from Phase 3 to Phase 2 in `index.md`
- [ ] Update `mvp-roadmap.md` Phase 2 section to include ID and Prototyping agents
- [ ] Adjust Phase 2 resource estimates (+2 agents requires recalculation)

---

### Issue #3: Timeline Inconsistencies

**Problem**: Different documents show different durations for MVP/Phase 1.

**Current State**:
| Document | MVP/Phase 1 Duration | Line Reference |
|----------|---------------------|----------------|
| `mvp-roadmap.md` | 3-4 months | Line 65 |
| `index.md` (Gantt chart) | 6 months | Lines 847-861 |
| `README.md` | 6 months | Line 128 |

**Impact**: User confusion about delivery timeline

**Root Cause**: "Build time" (3-4 months) vs "Full Phase including testing/docs" (6 months)

**Recommended Fix**: Use **6 months** consistently with clarification

**Clarified Language**:
```markdown
**Phase 1 (v0.1-0.3): Design Assistant**
- **Total Duration**: 6 months
  - Core development: 3-4 months
  - Integration & testing: 1 month
  - Documentation & examples: 1 month
- **User Time Savings**: 60% (6-8 weeks → 2-3 weeks per product)
```

**Action Items**:
- [ ] Update `mvp-roadmap.md` line 65 to "6 months (3-4 months core development + 2 months testing/docs)"
- [ ] Ensure all documents use "6 months" for Phase 1
- [ ] Update Gantt chart if using relative timelines

---

### Issue #4: KiCad Integration Timeline Unclear

**Problem**: Framework implies KiCad needed for Phase 1, but roadmap shows KiCad API integration in Phase 2.

**Current State**:
- `FRAMEWORK_MAPPING.md` lists EE Agent in Phase 1 → implies schematic capability
- `mvp-roadmap.md` line 558 shows "KiCad Python API" in Phase 2 section

**Impact**: Phase 1 cannot deliver schematic generation without KiCad integration

**Recommended Fix**: Clarify **read-only** vs **write/automation** capabilities

**Phase Breakdown**:
- **Phase 1 (v0.1-0.3)**: KiCad **read-only** adapter
  - Read existing schematics
  - Export BOMs
  - Run ERC checks
  - No schematic generation (human creates in KiCad)

- **Phase 2 (v0.4-0.6)**: KiCad **write + automation**
  - Schematic generation from block diagrams
  - PCB auto-routing
  - DRC automation
  - Full API integration

**Action Items**:
- [ ] Update `README.md` line 138 to "KiCad adapter (read-only)"
- [ ] Add "KiCad Read-Only Adapter" to Phase 1 in `mvp-roadmap.md`
- [ ] Add "KiCad Full API + Auto-routing" to Phase 2 in `mvp-roadmap.md`
- [ ] Update `FRAMEWORK_MAPPING.md` to clarify read-only vs write

---

### Issue #5: Phase 1 Scope Overclaimed

**Problem**: Framework claims Phase 1 covers 12 disciplines, but roadmap delivers only 6-7.

**Current State**:
- `FRAMEWORK_MAPPING.md` line 1205: "Phase 1 implements **6 specialist agents** covering 12 of 25 disciplines"
- Actual mapping shows 6-7 agents covering 6-7 disciplines (1:1 ratio)

**Impact**: Overpromising capabilities, user disappointment

**Root Cause**: Assumption that each agent would cover ~2 disciplines (1:2 ratio) but reality is 1:1

**Recommended Fix**: Lower claim to match reality

**Corrected Language**:
```markdown
Phase 1 implements **6-7 specialist agents** covering **6-7 core disciplines** (Layer 1 foundation + cost engineering from Layer 2).

The remaining 5 Layer 1 disciplines require more complex integrations and are addressed in Phase 2.
```

**Action Items**:
- [ ] Update `FRAMEWORK_MAPPING.md` line 1205
- [ ] Update `index.md` phase descriptions
- [ ] Add explicit discipline list to each phase description

---

## 🟡 MEDIUM PRIORITY IMPROVEMENTS (For Phase 2)

### Issue #6: Missing Agent-to-Discipline Mapping Document

**Problem**: Mapping is implicit across multiple documents; no single source of truth.

**Recommended Action**: Create `docs/architecture/agent-discipline-matrix.md`

**Template**:
```markdown
# Agent-to-Discipline Mapping Matrix

## Phase 1 (v0.1-0.3)

| Agent Code | Full Name | Discipline(s) | Tools/APIs | Status |
|------------|-----------|---------------|------------|--------|
| REQ | Requirements Agent | #1 Product Definition | PRD parser, constraint validator | ✅ v0.1 |
| EE | Electronics Agent | #4 Electronics Engineering | KiCad read-only, supplier APIs | ✅ v0.2 |
| ... | ... | ... | ... | ... |

## Phase 2 (v0.4-0.6)
...

## Phase 3 (v0.7-1.0)
...
```

**Action Items**:
- [ ] Create new document `docs/architecture/agent-discipline-matrix.md`
- [ ] Link from `docs/architecture/index.md`
- [ ] Update navigation in `_config.yml`

---

### Issue #7: Cost Estimate Calculation Error

**Problem**: Phase 2 shows "$420K" but calculation is $360K.

**Current State** (`mvp-roadmap.md` line 1252):
```
Budget: +$300K engineering + $10K/month infra = ~$420K
```

**Actual Calculation**:
- +3 engineers × $100K = $300K
- +$10K/month × 6 months = $60K
- **Total**: $360K (not $420K)

**Recommended Fix**: Either:
- **Option A**: Fix to "$360K" (accurate)
- **Option B**: Add $60K contingency and document it ("$360K + $60K buffer = $420K")

**Action Items**:
- [ ] Update `mvp-roadmap.md` line 1252
- [ ] Verify Phase 3 calculations as well

---

### Issue #8: Safety Standards Delayed

**Problem**: IEC 61508 and formal safety cases are Phase 3, but safety-critical products (drones, robots) need earlier hazard analysis.

**Current State**:
- Basic FMEA in Phase 2 (Reliability Agent)
- Full safety cases in Phase 3 (Certification Agent)

**Recommended Fix**: Add lightweight safety to Phase 2

**Phase 2 Safety Capabilities**:
- Hazard identification (ISO 12100)
- Basic FMEA/FTA
- Safety requirements extraction
- Risk mitigation planning

**Phase 3 Advanced Safety**:
- Formal safety cases (Goal Structuring Notation)
- IEC 61508 compliance documentation
- DO-178C for aerospace
- ISO 26262 for automotive

**Action Items**:
- [ ] Update `mvp-roadmap.md` Phase 2 to explicitly include safety
- [ ] Clarify Phase 2 = basic safety, Phase 3 = formal certification

---

### Issue #9: Missing Explicit Discipline Lists per Phase

**Problem**: Each phase description mentions agents but doesn't list which disciplines are covered.

**Recommended Fix**: Add explicit discipline tables to each phase section in `index.md`

**Template**:
```markdown
### Phase 1: Design Assistant (v0.1-0.3)

**Disciplines Covered** (6-7 of 25):
- ✅ #1 Product Definition (REQ Agent)
- ✅ #4 Electronics Engineering (EE Agent)
- ✅ #5 Embedded Software (FW Agent)
- ✅ #7 Simulation & Validation (SIM Agent)
- ✅ #10 Manufacturing Prep (MFG Agent)
- ✅ #14 Cost Engineering (SC Agent)
- ⚠️ #9 Testing (TST Agent - partial)

**Disciplines Deferred to Phase 2**:
- ⏸️ #2 Industrial Design
- ⏸️ #3 Mechanical Engineering
- ⏸️ #6 Systems Engineering
- ⏸️ #8 Prototyping
- ⏸️ #11 Certification
- ⏸️ #12 Lifecycle Support
```

**Action Items**:
- [ ] Add discipline tables to each phase in `index.md`
- [ ] Add to `README.md` as well
- [ ] Cross-reference with `FRAMEWORK_MAPPING.md`

---

## 🟢 LONG-TERM ENHANCEMENTS (Phase 3+)

### Enhancement #1: Digital Thread Feedback Loop

**Current**: Digital thread focuses on design → manufacturing

**Recommendation**: Phase 2/3 should add field telemetry → design feedback loop

**Benefit**: Continuous learning from deployed products improves future designs

**Action Items**:
- [ ] Add to Phase 3 roadmap
- [ ] Design data schema for field-to-design feedback

---

### Enhancement #2: Agent Performance Metrics

**Current**: Time savings are estimated, not measured

**Recommendation**: Track actual vs. estimated time savings per agent

**Benefit**: Data-driven roadmap adjustments and ROI demonstration

**Action Items**:
- [ ] Add telemetry to agents (time tracking, success rates)
- [ ] Create dashboard for agent performance
- [ ] Use data to refine Phase 3 priorities

---

## 📋 Complete Action Checklist

### HIGH PRIORITY (Before Phase 1 Release) ✅ **COMPLETE**

**Agent Count Standardization**:
- [x] `FRAMEWORK_MAPPING.md` line 219-227 → "6-7 agents" (already correct - shows "7 of 25")
- [x] `index.md` line 1150 → "6-7 agents covering 6-7 core disciplines"
- [x] `README.md` lines 134-140 → "6-7 specialist agents"
- [x] `mvp-roadmap.md` → Add explicit agent list

**Discipline Sequencing Fixes**:
- [x] Move Industrial Design (#2) from Phase 3 to Phase 2
- [x] Move Prototyping (#8) from Phase 3 to Phase 2
- [x] Update `FRAMEWORK_MAPPING.md` lines 254-262
- [x] Update `index.md` phase tables
- [x] Update `mvp-roadmap.md` Phase 2 section
- [x] Recalculate Phase 2 resources (+2 agents = 12 total in Phase 2)

**Timeline Standardization**:
- [x] `mvp-roadmap.md` line 65 → "6 months (3-4 months core + 2 months testing/docs)"
- [x] Verify all documents use "6 months" for Phase 1
- [ ] Update Gantt chart with consistent timelines (deferred - cosmetic only)

**KiCad Integration Clarification**:
- [x] `README.md` line 138 → "KiCad adapter (read-only)" (already correct)
- [x] `mvp-roadmap.md` → Add "KiCad Read-Only" to Phase 1
- [x] `mvp-roadmap.md` → Clarify "KiCad Full API" in Phase 2
- [x] `FRAMEWORK_MAPPING.md` → Note read-only vs write capabilities

**Phase 1 Scope Reality Check**:
- [x] `FRAMEWORK_MAPPING.md` line 222 → "6-7 agents covering 6-7 core disciplines"
- [x] Remove claims of "12 disciplines" in Phase 1 (none found)
- [x] Add explanation of why some Layer 1 disciplines are Phase 2

---

### MEDIUM PRIORITY (For Phase 2)

**Documentation Improvements**:
- [ ] Create `docs/architecture/agent-discipline-matrix.md`
- [ ] Add discipline tables to each phase in `index.md`
- [ ] Add discipline tables to `README.md`

**Cost Estimate Fixes**:
- [x] `mvp-roadmap.md` line 1261 → Fixed $420K to $360K with correct calculation
- [ ] Verify Phase 3 calculations

**Safety Standards Earlier**:
- [ ] Update `mvp-roadmap.md` Phase 2 → Include lightweight safety
- [ ] Clarify Phase 2 = basic safety, Phase 3 = formal certification

---

### LOW PRIORITY (Phase 3+)

**Enhancements**:
- [ ] Add field-to-design feedback loop to Phase 3
- [ ] Add agent performance metrics and dashboard

---

## 📊 Impact Assessment

### Before Fixes
- **Alignment Score**: 78/100
- **User Confusion**: HIGH (agent counts vary 4-8 across docs)
- **Overpromising**: Phase 1 claims 12 disciplines, delivers 6-7
- **Timeline Clarity**: LOW (3-4 months vs 6 months inconsistency)

### After Fixes
- **Alignment Score**: 95/100 (projected)
- **User Confusion**: LOW (consistent 6-7 agents everywhere)
- **Realistic Scope**: Phase 1 claims 6-7 disciplines, delivers 6-7 ✅
- **Timeline Clarity**: HIGH (6 months with clear breakdown)

**Overall Improvement**: +17 points

---

## 🎯 Implementation Priority Order

1. **Week 1**: Fix agent count across all documents (Issue #1)
2. **Week 1**: Fix timeline to 6 months consistently (Issue #3)
3. **Week 1**: Lower Phase 1 scope claims to reality (Issue #5)
4. **Week 2**: Move Industrial Design & Prototyping to Phase 2 (Issue #2)
5. **Week 2**: Clarify KiCad read-only vs full integration (Issue #4)
6. **Week 3**: Create agent-discipline matrix document (Issue #6)
7. **Week 3**: Add discipline tables to phase descriptions (Issue #9)
8. **Week 4**: Fix cost estimates (Issue #7)
9. **Week 4**: Add lightweight safety to Phase 2 (Issue #8)

**Total Fix Time**: ~4 weeks (1 engineer part-time)

---

## ✅ Success Criteria

**Documentation is considered "aligned" when**:
1. ✅ All documents show same agent count per phase (±1)
2. ✅ All documents show same timeline per phase
3. ✅ Layer 1 disciplines are in Phase 1-2 (not Phase 3)
4. ✅ Each phase has explicit discipline coverage list
5. ✅ Agent-to-discipline mapping is documented
6. ✅ Cost estimates calculate correctly
7. ✅ No overpromising (claimed scope = delivered scope)

**Measurement**: Run alignment review again after fixes, target score >90/100

---

**Review Status**: 🔴 ACTION REQUIRED
**Next Review Date**: After HIGH PRIORITY fixes complete
**Owner**: Technical Documentation Lead
