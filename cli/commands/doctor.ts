import chalk from 'chalk';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface CheckResult {
  name: string;
  status: 'ok' | 'warning' | 'error';
  message: string;
}

export async function doctorCommand() {
  console.log(chalk.bold.cyan('\n🏥 MetaForge Doctor\n'));
  console.log(chalk.gray('Checking MetaForge environment and dependencies...\n'));

  const results: CheckResult[] = [];

  // Check 1: MetaForge workspace
  const cwd = process.cwd();
  const forgePath = path.join(cwd, '.forge');

  if (fs.existsSync(forgePath)) {
    results.push({
      name: 'MetaForge workspace',
      status: 'ok',
      message: 'Found .forge directory',
    });
  } else {
    results.push({
      name: 'MetaForge workspace',
      status: 'error',
      message: 'Not initialized (run: forge setup)',
    });
  }

  // Check 2: Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

  if (majorVersion >= 18) {
    results.push({
      name: 'Node.js',
      status: 'ok',
      message: `${nodeVersion}`,
    });
  } else {
    results.push({
      name: 'Node.js',
      status: 'warning',
      message: `${nodeVersion} (recommend >= 18)`,
    });
  }

  // Check 3: Git
  try {
    const gitVersion = execSync('git --version', { encoding: 'utf-8' }).trim();
    results.push({
      name: 'Git',
      status: 'ok',
      message: gitVersion,
    });
  } catch {
    results.push({
      name: 'Git',
      status: 'warning',
      message: 'Not found',
    });
  }

  // Check 4: KiCad
  try {
    execSync('kicad-cli version', { encoding: 'utf-8', stdio: 'pipe' });
    results.push({
      name: 'KiCad',
      status: 'ok',
      message: 'kicad-cli available',
    });
  } catch {
    results.push({
      name: 'KiCad',
      status: 'warning',
      message: 'Not found (optional for v0.1)',
    });
  }

  // Check 5: Python (for future tools)
  try {
    const pythonVersion = execSync('python3 --version', { encoding: 'utf-8' }).trim();
    results.push({
      name: 'Python',
      status: 'ok',
      message: pythonVersion,
    });
  } catch {
    results.push({
      name: 'Python',
      status: 'warning',
      message: 'Not found (may be needed for tools)',
    });
  }

  // Check 6: Gateway status
  // TODO: Implement gateway health check
  results.push({
    name: 'Gateway',
    status: 'warning',
    message: 'Not running (start with: forge gateway)',
  });

  // Display results
  let hasErrors = false;
  let hasWarnings = false;

  for (const result of results) {
    let icon: string;
    let color: typeof chalk.green;

    switch (result.status) {
      case 'ok':
        icon = '✓';
        color = chalk.green;
        break;
      case 'warning':
        icon = '⚠';
        color = chalk.yellow;
        hasWarnings = true;
        break;
      case 'error':
        icon = '✗';
        color = chalk.red;
        hasErrors = true;
        break;
    }

    console.log(
      color(icon),
      chalk.bold(result.name.padEnd(20)),
      chalk.gray(result.message)
    );
  }

  // Summary
  console.log();
  if (hasErrors) {
    console.log(chalk.red('❌ Some checks failed'));
  } else if (hasWarnings) {
    console.log(chalk.yellow('⚠️  Some warnings (non-critical)'));
  } else {
    console.log(chalk.green('✅ All checks passed'));
  }

  console.log(chalk.gray('\nRun'), chalk.bold('forge gateway'), chalk.gray('to start the control plane\n'));
}
