// TUEUR

class Personnage {
    constructor(nom, caracteristiques, probaMort, probaDegats, probaMortDegats) {
        this.nom = nom
        this.caracteristiques = caracteristiques
        this.probaMort = probaMort
        this.probaDegats = probaDegats
        this.probaMortDegats = probaMortDegats
    }
}


let tueur = {
    prenom : "Jason",
    hp : 100,

}


let prenomList = [ 
    "Adams",
    "Baker",
    "Clark",
    "Davis",
    "Evans",
    "Frank",
    "Ghosh",
    "Hills",
    "Irwin",
    "Jones",
    "Klein",
    "Lopez",
    "Mason",
    "Nalty",
    "Ochoa",
    "Patel",
    "Quinn",
    "Reily",
    "Smith",
    "Trott",
    "Usman",
    "Valdo",
    "White",
    "Xiang",
    "Yakub",
    "Zafar"
]

let caracteristiquesList = [
    "nerd",
    "blond",
    "sportif",
    "asthmatique",
    "intelligent",
    "peureux",
    "bagarreur",
    "fetard",
    "rigolo", 
    "independent"
]

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}


let victimeList = []

for (let i = 0; i < 5; i++) {
    let nom = prenomList[getRandomInt(0, prenomList.length - 1)]
    prenomList = prenomList.filter(item => item !== nom)

    let caracteristique = caracteristiquesList[getRandomInt(0, caracteristiquesList.length - 1)]
    caracteristiquesList = caracteristiquesList.filter(item => item !== caracteristique)

    let nombre1 = Math.random()
    let nombre2 = Math.random()
    let nombre3 = Math.random()

    let total = nombre1 + nombre2 + nombre3
    nombre1 = nombre1/total
    nombre2 = nombre2/total
    nombre3 = nombre3/total

    let victime = new Personnage(nom, caracteristique, nombre1, nombre2, nombre3)
    victimeList.push(victime)
}

console.log(victimeList)


function attaque(tueur, victimeList) {
    while (tueur.hp > 0 && victimeList.length > 0) {
        victimeList.forEach((victime, index) => {
            let probTueur = Math.random()

            if (victime.probaMort > probTueur) {
                console.log("Jason a tué " + victime.nom)
                victimeList.splice(index, 1)

            } else if (probTueur > victime.probaMort && probTueur <= victime.probaMort + victime.probaDegats) {
                tueur.hp -= 10
                console.log(victime.nom + " a esquivé et infligé 10 points de dégâts à Jason (hp restants : " + tueur.hp + ")")

            } else if (probTueur > victime.probaMort + victime.probaDegats && probTueur <= 1) {
                tueur.hp -= 15
                console.log(victime.nom + " est morte mais a infligé 15 points de dégâts à Jason (hp restants : " + tueur.hp + ")")
                victimeList.splice(index, 1)

            }
            if (tueur.hp <= 0) {
                console.log("Jason est mort")
            }
        
            if (victimeList.length == 0) {
                console.log("Jason a tué tout le monde")
            }
        })
    }

}
attaque(tueur, victimeList)