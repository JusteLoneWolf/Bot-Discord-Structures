
const Discord = require('discord.js');
module.exports = client => {
const moment = require ('moment')
const LogHeure = (`${moment().add(2, 'hours').format('Do MMMM  YYYY, H:mm:ss')}`)
console.log('Je suis reconnecté a '  +LogHeure );
  };
