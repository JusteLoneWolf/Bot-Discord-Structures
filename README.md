## Discord Bot Structure

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/59ed6e758c54428183a5a17b4df6533c)](https://app.codacy.com/gh/zechaos031/Bot-Discord-Structures?utm_source=github.com&utm_medium=referral&utm_content=zechaos031/Bot-Discord-Structures&utm_campaign=Badge_Grade_Settings)

For the [DJS v13](https://github.com/zechaos031/Bot-Discord-Structures/tree/Version-6.0-v13) (in dev)
### Requirements
- Nodejs v14 minimum (latest release)

- NPM version 7 minimum (latest release)
  
- Git (Optionnal)
### Installation

Download git [here](https://git-scm.com/)

#### Download the repository

`git clone https://github.com/zechaos031/Bot-Discord-Structures` or download button in repository.

#### Go to directory

`cd Bot-Discord-Structures`

#### Install package dependencies
`npm i`

#### Copy config.js.exemple to config.js
- Provide bot token
  
- Change other option if you want

### Launch

`node main`


### DiscordBotStructure options
**DiscordBotStructure#conf**: The bot config. Default: {}.

**DiscordBotStructure#clientOption**: The clientOption. Default: {}.

**DiscordBotStructure#translateModule**: The translationModule. Default: false.

**DiscordBotStructure#databaseModule**: The dataBaseModule. Default: none.

**DiscordBotStructure#commands**: The commandeModule. Default: true.

**DiscordBotStructure#cooldownManager**: The cooldownManager. Default: true.
