set windows-shell := ["powershell.exe", "-NoLogo", "-NoProfile", "-Command"]
export CI := "true"

#List all Just Recipes
default: 
    just --list

#Deploy script
[group('Deployment')]
[confirm]
deploy:
    git fetch origin master
    git reset --hard origin/master
    git clean -fd
    pnpm install   
    pm2 restart ecosystem.config.cjs --update-env
    pm2 save

#Min deploy script, Does not reset git status.
[group('Deployment')]
[confirm]
min-deploy:
    pnpm install
    pm2 restart ecosystem.config.cjs --update-env
    pm2 save

# Installs packages
[group('Development')]
install: 
    pnpm install

# Check for outdated packages
[group('Development')]
outdated:
    pnpm outdated

#Git pull
[group('Git')]
pull:
    git pull

# Starts the bot in command line
[group('Development')]
start:
    pnpm tsx bot.ts