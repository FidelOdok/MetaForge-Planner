import chalk from 'chalk';
import inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';

export async function onboardCommand() {
  console.log(chalk.bold.cyan('\n🚀 Forge Onboarding\n'));

  const cwd = process.cwd();
  const forgePath = path.join(cwd, '.forge');

  // Check if initialized
  if (!fs.existsSync(forgePath)) {
    console.log(chalk.red('❌ Forge workspace not initialized'));
    console.log(chalk.gray('   Run'), chalk.bold('forge setup'), chalk.gray('first\n'));
    return;
  }

  console.log(chalk.gray('Answer a few questions to configure your project:\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: path.basename(cwd),
    },
    {
      type: 'list',
      name: 'projectType',
      message: 'Project type:',
      choices: [
        'PCB / Hardware Module',
        'Drone Flight Controller',
        'Power Supply',
        'Sensor Board',
        'Development Board',
        'Other',
      ],
    },
    {
      type: 'list',
      name: 'eda',
      message: 'EDA tool:',
      choices: ['KiCad', 'Altium', 'Eagle', 'None yet'],
    },
    {
      type: 'input',
      name: 'constraints',
      message: 'Key constraints (e.g., "5V, <£20 BOM, 50x50mm"):',
    },
  ]);

  // Create project structure
  console.log(chalk.gray('\nCreating project structure...\n'));

  const dirs = [
    'eda',
    'bom',
    'firmware',
    'manufacturing',
    'tests',
    'docs',
  ];

  for (const dir of dirs) {
    const dirPath = path.join(cwd, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(chalk.green('✓'), chalk.gray(dir + '/'));
    }
  }

  // Create PRD template
  if (!fs.existsSync(path.join(cwd, 'PRD.md'))) {
    const prdTemplate = `# ${answers.projectName} — Product Requirements

## Overview

${answers.projectType}

## Core Requirements

### Functionality
- [Add key functional requirements]

### Performance
- [Add performance requirements]

### Physical
- [Add size, weight, mounting requirements]

## Constraints

${answers.constraints || '[Add constraints]'}

### Budget
- Target BOM cost: £X

### Key Components
- MCU: [TBD]
- Sensors: [TBD]
- Power: [TBD]

## Success Criteria

1. [Add success criteria]

## Timeline

- Schematic: X weeks
- PCB layout: X weeks
- Manufacturing: X weeks
- Bring-up: X weeks
`;

    fs.writeFileSync(path.join(cwd, 'PRD.md'), prdTemplate);
    console.log(chalk.green('✓'), chalk.gray('PRD.md'));
  }

  // Create constraints.json
  const constraints = {
    project: answers.projectName,
    type: answers.projectType,
    eda: answers.eda,
    constraints: {
      raw: answers.constraints,
    },
    created: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(cwd, 'constraints.json'),
    JSON.stringify(constraints, null, 2)
  );
  console.log(chalk.green('✓'), chalk.gray('constraints.json'));

  // Create decisions.md
  if (!fs.existsSync(path.join(cwd, 'decisions.md'))) {
    const decisionsTemplate = `# ${answers.projectName} — Design Decisions

This file tracks key design decisions and their rationale.

## Format

Each decision should include:
- Date
- Decision
- Rationale
- Alternatives considered
- Trade-offs

---

## [Date] — [Decision Title]

**Decision**: [What was decided]

**Rationale**: [Why this decision was made]

**Alternatives**: [What else was considered]

**Trade-offs**: [What was sacrificed]

---
`;
    fs.writeFileSync(path.join(cwd, 'decisions.md'), decisionsTemplate);
    console.log(chalk.green('✓'), chalk.gray('decisions.md'));
  }

  console.log(chalk.green('\n✅ Project initialized'));
  console.log(chalk.cyan('\nNext steps:'));
  console.log(chalk.gray('   1. Edit'), chalk.bold('PRD.md'), chalk.gray('with your requirements'));
  console.log(chalk.gray('   2. Run'), chalk.bold('forge doctor'), chalk.gray('to check tools'));
  console.log(chalk.gray('   3. Run'), chalk.bold('forge gateway'), chalk.gray('to start the control plane'));
  console.log(chalk.gray('   4. Run'), chalk.bold('forge run spec'), chalk.gray('to generate structured requirements\n'));
}
