const fr = {
  "reminders.signup":
    "Bonjour {user} !  Pour faciliter l'utilisation de ce groupe je me demande à chaque utilisateur de me fournir leur pseudo lichess et leur licence FFE.  Vous pouvez me les fournir en utilisant la commande « !jesuis ».\nEnsuite je peux vous aidez avec cette selectionne de commande bien utile :",
  "reminders.signupRecall":
    "Bonjour {user} !  N'oubliez pas de me fournir leur pseudo lichess et leur licence FFE !  Vous pouvez me les fournir en utilisant la commande « !jesuis ».",

  "commands.help.help": "Afficher cette aide !",
  "commands.help.title": "Ce que vous pouvez faire...",

  "commands.iam.help":
    "Rattacher votre pseudo Discord à vos comptes lichess et FFE",
  "commands.iam.hint":
    "Faites « !jesuis lichess <pseudo> » ou « !jesuis FFE <numéro de license> »",

  "commands.lichess.help": "Lister les members notre équipe lichess",
  "commands.lichess.title": "L'équipe en ligne",
  "commands.lichess.active": "Actif",
  "commands.lichess.user": "User",
  "commands.lichess.discord": "Pseudo Discord",

  "commands.list.help:": "Lister les membres Discord avec leurs nom/pseudo",
  "commands.list.title": "Voici ceux qui se sont déclaré(é)s :",
  "commands.list.discord": "Pseudo Discord",
  "commands.list.lichess": "Pseudo Lichess",
  "commands.list.name": "Nom",

  "commands.play.help": "Jouer contre un autre membre !",
  "commands.play.hint": "Faites « !partie @<discord pseudo> »",
  "commands.play.unknown":
    "Je ne connais pas le pseudo lichess de cette personne",
  "commands.play.visit": "Visitez {link}",

  "commands.register.help":
    "Rattacher un pseudo Discord à ses comptes lichess et FFE",
  "commands.register.hint":
    "Faites « !register @<discord pseudo> lichess <lichess pseudo> » ou « !register @<discord pseudo> FFE <numéro de license> »",
  "commands.register.needAdmin":
    "Cette commands et pour les admins, utilise plutot « !jesuis lichess <pseudo> » ou « !jesuis FFE <numéro de license> »",

  "commands.remove.help": "Supprimer toutes les informations d'un compte",
  "commands.remove.hint": "Faites « !remove <pseudo> »",
  "commands.reset.notFound": "Utilisateur pas connu.",

  "commands.reset.help": "Resetter la base",
  "commands.reset.done": "Fait.",

  "commands.search.help": "Rechercher un utilistateur par nom/pseudo",
  "commands.search.hint": "Faites « !cqui <nom / pseudo> »",
  "commands.search.unknown": "Je ne sais pas !",
  "commands.search.title": "Voici ce que je trouve :",
  "commands.search.discord": "Pseud Discord",
  "commands.search.lichess": "Pseudo Lichess",
  "commands.search.name": "Nom",

  "config.ffe.unknown": "Désole, nous ne trouvons pas ce numéro de licence...",
  "config.ffe.alreadyAssigned": "Désole, ce numéro est déjà assigné à {user}",

  "config.lichess.unknown":
    "Désole, ce pseudo ne fait pas encore parti de notre équipe...",
  "config.lichess.alreadyAssigned":
    "Désole, ce pseudo est déjà assigné à {user}",

  "config.thanks": "Merci, c'est noté !",

  "errors.lichess":
    "Désole, je ne peux pas contacter le serveur lichess en ce moment !",
  "errors.mongo": "Désole, je ne peux pas contacter notre base en ce moment !",
  "errors.ffe":
    "Désole, je ne peux pas contacter le serveur FFE en ce moment !",

  "request.multiple":
    "J'ai trouvé plusieurs membres, merci d'être plus precis...",
};

export default fr;
