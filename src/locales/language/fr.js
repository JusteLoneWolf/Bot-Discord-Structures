module.exports = {
  term: {
    messageEvent: {
      notUse: "Vous ne pouvez pas utiliser cette commande.",
      cmdDisabled: "Cette commande est désactivé.",
      userNoPerm: (perm) => `Vous devez avoir les autorisations  \`${perm}\` pour exécuter cette commande.`,
      botNoPerm: (perm) => `Le bot doit avoir les autorisations  \`${perm}\` pour exécuter cette commande.`,
      cdwOn: (remain) => `Vous êtes en période de récupération, essayez dans ${remain}s`,
    },
    TraductionManage: {
      notFound: (term) =>
          `${term}`,
    },
  },
}
