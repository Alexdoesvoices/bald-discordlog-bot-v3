const os = require('os');
const path = require('path');

//Detect if we are running on Windows
const isWindows = os.platform() === 'win32';

// Set the interpreter dynamically based on the Operating System
const interpreterPath = isWindows
  ? 'node' //Windows
  : '/home/arobinson/.local/share/fnm/aliases/default/bin/node'; //Linux

module.exports = {
  apps: [{
    name: "baldridge-discord-logbot",
    script: "./bot.ts",
    
    cwd: path.resolve(__dirname), 
    
    exec_mode: "fork",
    
    interpreter: interpreterPath,
    interpreter_args: "--import tsx", 
    
    restart_delay: 5000,
    env: {
      NODE_ENV: "production",
    }
  }]
};