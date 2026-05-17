module.exports = {
  apps: [{
    name: "baldridge-discord-logbot",
    script: "./bot.ts",
    exec_mode: "fork",    
    interpreter: "/home/arobinson/.local/share/fnm/aliases/default/bin/node",
    interpreter_args: "--import tsx", 
    
    restart_delay: 5000,
    env: {
      NODE_ENV: "production",
    }
  }]
}