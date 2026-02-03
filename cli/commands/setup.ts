import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

export async function setupCommand() {
  console.log(chalk.bold.cyan('\n🔥 MetaForge Setup\n'));

  const cwd = process.cwd();
  const forgePath = path.join(cwd, '.forge');

  // Check if already initialized
  if (fs.existsSync(forgePath)) {
    console.log(chalk.yellow('⚠️  MetaForge workspace already initialized'));
    console.log(chalk.gray(`   Found: ${forgePath}`));
    return;
  }

  console.log(chalk.gray('Creating MetaForge workspace structure...\n'));

  // Create .forge directory structure
  const dirs = [
    '.forge',
    '.forge/sessions',
    '.forge/runs',
    '.forge/traces',
    '.forge/artifacts',
  ];

  for (const dir of dirs) {
    const dirPath = path.join(cwd, dir);
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(chalk.green('✓'), chalk.gray(dir));
  }

  // Create config.json
  const config = {
    version: '0.1.0',
    created: new Date().toISOString(),
    workspace: cwd,
    gateway: {
      port: 3742,
      autoStart: false,
    },
    permissions: {
      readOnly: false,
      requireApproval: true,
    },
    tools: {
      kicad: {
        enabled: false,
        path: null,
      },
      spice: {
        enabled: false,
        path: null,
      },
    },
  };

  const configPath = path.join(forgePath, 'config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(chalk.green('✓'), chalk.gray('.forge/config.json'));

  // Create .gitignore for .forge
  const gitignorePath = path.join(forgePath, '.gitignore');
  const gitignoreContent = `# MetaForge runtime artifacts
sessions/
runs/
traces/
*.log

# Keep config
!config.json
`;
  fs.writeFileSync(gitignorePath, gitignoreContent);

  console.log(chalk.green('\n✅ MetaForge workspace initialized'));
  console.log(chalk.gray(`   ${forgePath}`));
  console.log(chalk.cyan('\nNext steps:'));
  console.log(chalk.gray('   1. Run'), chalk.bold('forge onboard'), chalk.gray('to set up your project'));
  console.log(chalk.gray('   2. Run'), chalk.bold('forge doctor'), chalk.gray('to check dependencies'));
  console.log(chalk.gray('   3. Run'), chalk.bold('forge gateway'), chalk.gray('to start the control plane\n'));
}
