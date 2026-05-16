module.exports = {
    apps: [{
      name: "baldridge-pnpm-discordlogbot-v2",
      script: "node",
      args: "bot.ts",
      exec_mode: "fork",
      interpreter: "none", 
      env: {
        NODE_ENV: "production",
      }
    }]
  }