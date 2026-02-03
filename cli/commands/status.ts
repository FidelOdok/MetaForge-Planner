import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

export async function statusCommand() {
  console.log(chalk.bold.cyan('\n📊 MetaForge Status\n'));

  const cwd = process.cwd();
  const forgePath = path.join(cwd, '.forge');

  // Check if initialized
  if (!fs.existsSync(forgePath)) {
    console.log(chalk.red('❌ MetaForge workspace not initialized'));
    console.log(chalk.gray('   Run'), chalk.bold('forge setup'), chalk.gray('first\n'));
    return;
  }

  // Load config
  const configPath = path.join(forgePath, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  console.log(chalk.bold('Workspace'));
  console.log(chalk.gray('  Location:'), cwd);
  console.log(chalk.gray('  Version:'), config.version);
  console.log(chalk.gray('  Created:'), new Date(config.created).toLocaleDateString());
  console.log();

  // Check for key files
  console.log(chalk.bold('Project Files'));
  const keyFiles = ['PRD.md', 'constraints.json', 'decisions.md'];
  keyFiles.forEach(file => {
    const exists = fs.existsSync(path.join(cwd, file));
    const icon = exists ? chalk.green('✓') : chalk.gray('○');
    console.log(icon, chalk.gray(file));
  });
  console.log();

  // Check sessions
  const sessionsPath = path.join(forgePath, 'sessions');
  const sessions = fs.existsSync(sessionsPath) ? fs.readdirSync(sessionsPath) : [];

  console.log(chalk.bold('Sessions'));
  if (sessions.length === 0) {
    console.log(chalk.gray('  No active sessions'));
  } else {
    console.log(chalk.gray(`  ${sessions.length} session(s)`));
    sessions.slice(0, 3).forEach(session => {
      console.log(chalk.gray(`  - ${session}`));
    });
  }
  console.log();

  // Gateway status
  console.log(chalk.bold('Gateway'));
  console.log(chalk.gray('  Status:'), chalk.yellow('Not running'));
  console.log(chalk.gray('  Port:'), config.gateway?.port || '3742');
  console.log();

  console.log(chalk.cyan('Next steps:'));
  console.log(chalk.gray('  Run'), chalk.bold('forge gateway'), chalk.gray('to start the control plane'));
  console.log(chalk.gray('  Run'), chalk.bold('forge run spec'), chalk.gray('to execute your first workflow\n'));
}
