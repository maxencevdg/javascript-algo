// Valorant

// equipe 1 
// equipe 2
// attaque ou defense (random)
// equipes de 5 (random) = Omen - Fade - Phoenix - Chamber - Jett
// défenseurs = tuer les attaquants + désamorcer la bombe si elle a été amorcée.​
// 13 manches gagnantes
//​ Tant qu’une des deux équipes n’a pas 13 manches gagnées :​
//  - Début d’une manche :​
//      - 1 joueur aléatoire d’une équipe aléatoire tue son adversaire​
//      - si le joueur mort est défenseur : 60% de chance d’amorcer le spike, ​si le joueur mort est attaquant, 40% de chance.​
//      - si le spike est amorcé, 70% de chance que lors d’un duel, l’attaquant ​l’emporte sur le défenseur, donc 30% pour le défenseur de tuer.​
//      ​- si le spike n’est pas amorcé, 50% de chance pour chaque duel.​
//​      - Une manche est terminée lorsqu’il ne reste plus que des joueurs d’une même équipe. Chaque action doit être notifiée dans la console.​


// fonction qui choisi un nombre entier aléatoire
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}


// class equipe attaquant ou defenseur qui permet d'incrémenter de 1 le score de son equipe en cas de victoire
class Equipe {
    constructor(nom, compo) {
        this.nom = nom
        this.compo = compo
        this.manchesGagnees = 0
    }

    gagnerManche() {
        this.manchesGagnees++
    }
}

// class de l'agent attaquant afin de savoir s'il gagne ou perd son duel 
class Joueur {
    constructor(nom, equipe) {
        this.nom = nom
        this.equipe = equipe
    }

    remporterDuel(defenseur) {
        let attaquantGagneProbabilite = this.equipe === "Attaquants" ? 0.7 : 0.5
        let duelGagne = Math.random() < attaquantGagneProbabilite
        if (duelGagne) {
            console.log(this.nom + " de l'équipe " + this.equipe + " remporte le duel contre " + defenseur.nom + " de l'équipe " + defenseur.equipe)
            return true
        } else {
            console.log(this.nom + " de l'équipe " + this.equipe + " perd le duel contre " + defenseur.nom + " de l'équipe " + defenseur.equipe)
            return false
        }
    }
}


// class de la partie 
class Jeu {
    constructor() {
        this.attaquants = new Equipe("Attaquants", joueurList.slice())
        this.defenseurs = new Equipe("Défenseurs", joueurList.slice())
    }

    // ca definit une manche (donc cette partie est répétée autant de fois que necessaire afin de faire tout les rounds d'une game)
    jouerRound() {
        console.log("\nRound en cours...");

        // liste temporaire des joueurs pour chaque équipe
        let attaquantsTemp = this.attaquants.compo.slice()
        let defenseursTemp = this.defenseurs.compo.slice()
        let spikeAmorce = false;
        // sélection d'un joueur aléatoire d'une équipe aléatoire
        let randomAttaqueIndex = getRandomInt(0, attaquantsTemp.length - 1)
        let randomDefenseIndex = getRandomInt(0, defenseursTemp.length - 1)
        let attaquant = new Joueur(attaquantsTemp[randomAttaqueIndex], this.attaquants.nom)
        let defenseur = new Joueur(defenseursTemp[randomDefenseIndex], this.defenseurs.nom)

        if (attaquant.equipe !== defenseur.equipe) {
            // nombre aléatoire pour savoir si le spike va être planté ou non
            let action = Math.random()
            
            while (attaquantsTemp.length > 0 && defenseursTemp.length > 0) {
                // sélection d'un joueur aléatoire d'une équipe aléatoire
                let randomAttaqueIndex = getRandomInt(0, attaquantsTemp.length - 1)
                let randomDefenseIndex = getRandomInt(0, defenseursTemp.length - 1)
                let attaquant = new Joueur(attaquantsTemp[randomAttaqueIndex], this.attaquants.nom)
                let defenseur = new Joueur(defenseursTemp[randomDefenseIndex], this.defenseurs.nom)
                if (action < 0.6 && !spikeAmorce) {
                    console.log("Spike amorcé par " + attaquant.nom)
                    spikeAmorce = true
                }

                if (spikeAmorce) {
                    let attaquantGagne = attaquant.remporterDuel(defenseur)
                    if (attaquantGagne) {
                        defenseursTemp.splice(randomDefenseIndex, 1)
                    } else {
                        attaquantsTemp.splice(randomAttaqueIndex, 1)
                    }
                } else {
                    let attaquantGagne = Math.random() < 0.5
                    if (attaquantGagne) {
                        console.log(attaquant.nom + " de l'équipe " + attaquant.equipe + " remporte le duel contre " + defenseur.nom + " de l'équipe " + defenseur.equipe)
                        defenseursTemp.splice(randomDefenseIndex, 1)
                    } else {
                        console.log(attaquant.nom + " de l'équipe " + attaquant.equipe + " perd le duel contre " + defenseur.nom + " de l'équipe " + defenseur.equipe)
                        attaquantsTemp.splice(randomAttaqueIndex, 1)
                    }
                }
            }
            
        
        }

        // Définis qui a gagné le round
        if (defenseursTemp.length === 0) {
            this.attaquants.gagnerManche()
            console.log("Les attaquants ont remportés la manche")
        } else {
            this.defenseurs.gagnerManche()
            console.log("Les defenseurs ont remportés la manche")
        }

        console.log("Attaquants : " + this.attaquants.manchesGagnees + "\nDéfenseurs : " + this.defenseurs.manchesGagnees)
    }

    jouerPartie() {
        while (this.attaquants.manchesGagnees < 13 && this.defenseurs.manchesGagnees < 13) {
            // Réinitialise les équipes avant le début de la partie
            this.attaquants.compo = joueurList.slice()
            this.defenseurs.compo = joueurList.slice()
            this.jouerRound()
        }

        // affiche qui remporte la partie
        if (this.attaquants.manchesGagnees >= 13) {
            console.log("Les attaquants ont gagné la partie !")
        } else {
            console.log("Les défenseurs ont gagné la partie !")
        }
    }
}


// liste des agents
let joueurList = [
    "Omen",
    "Fade",
    "Phoenix",
    "Chamber",
    "Jett"
]

let jeu = new Jeu()
jeu.jouerPartie()

