const { execSync } = require('child_process');
try {
  execSync('npx next build', { stdio: 'inherit', env: { ...process.env, PATH: '/c/Users/Hermes/AppData/Local/hermes/node:' + process.env.PATH } });
} catch (e) {
  process.exit(1);
}
