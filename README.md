# Bot-Discord-Structures [![Codacy Badge](https://api.codacy.com/project/badge/Grade/2c86abc76f4c4d8c8ec9801ad9da4c81)](https://www.codacy.com/manual/zechaos031/Bot-Discord-Structure?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=zechaos031/Bot-Discord-Structure&amp;utm_campaign=Badge_Grade)[![CodeFactor](https://www.codefactor.io/repository/github/zechaos031/bot-discord-structures/badge)](https://www.codefactor.io/repository/github/zechaos031/bot-discord-structures) 

A repository for a basic discord bot with a command handler
## Requirement
- Windows
>- [NodeJS](https://nodejs.org/dist/v12.10.0/node-v12.10.0-x64.msi)
>- **Execute this commands only powershell has administrator** `
npm i -g --add-python-to-path --vs2015 --production windows-build-tools`

- Linux
```
wget -qO- https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install -y nodejs
```

## Download
1. Download File on zip or via 
> Git:
  `
  git clone https://github.com/zechaos031/Bot-Discord-Structures.git
  `
  
## Installation
```
npm i 
```

- If you have some error with modules
> *Discord JS*
```
npm i discordjs
```

> *Enmap*

```
npm i enmap@5.0.0
```

> *Better Sqlite 3*

```
npm i better-sqlite3
``` 

> *Chalk*
```
npm i chalk
```

> *Moment*
```
npm i moment
```

### NOTES
Before the first launch create folder `database/guilddb` 

## Launch
> Run
 ```
node shards.js
```
