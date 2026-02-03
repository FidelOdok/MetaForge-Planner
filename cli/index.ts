#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { setupCommand } from './commands/setup';
import { onboardCommand } from './commands/onboard';
import { gatewayCommand } from './commands/gateway';
import { doctorCommand } from './commands/doctor';
import { runCommand } from './commands/run';
import { statusCommand } from './commands/status';
import { approveCommand } from './commands/approve';

const program = new Command();

program
  .name('forge')
  .description('From intent to hardware — a control plane for building real hardware')
  .version('0.1.0');

program
  .command('setup')
  .description('Initialize a MetaForge workspace')
  .action(setupCommand);

program
  .command('onboard')
  .description('Interactive project setup and onboarding')
  .action(onboardCommand);

program
  .command('gateway')
  .description('Start the MetaForge gateway service')
  .option('-p, --port <port>', 'Port to run gateway on', '3742')
  .option('-d, --detach', 'Run in background')
  .action(gatewayCommand);

program
  .command('doctor')
  .description('Check MetaForge dependencies and environment')
  .action(doctorCommand);

program
  .command('run <skill>')
  .description('Execute a MetaForge skill/workflow')
  .option('-i, --interactive', 'Run in interactive mode')
  .action(runCommand);

program
  .command('status')
  .description('Show current MetaForge state and active sessions')
  .action(statusCommand);

program
  .command('approve')
  .description('Approve pending changes from agents')
  .argument('[session-id]', 'Specific session to approve')
  .action(approveCommand);

program.parse();

// If no command provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
