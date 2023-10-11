// TAXI

let personnage = {
    prenom : "John",
    mental : 10
}

let musiques = ["Anissa - Wejdene", 
                "Deux freres - PNL", 
                "Nocif - Hamza", 
                "Jour de plus - Freeze Corleone", 
                "J'comprends pas - PNL"]


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

                
let trajet = {
    radio : musiques[getRandomInt(0, musiques.length - 1 )],
    nbsChangements : 0,
    nbsFeuxRouges : 30
}

function rentrer (personnage, trajet, musiques) {
    while (trajet.nbsFeuxRouges > 0 && personnage.mental > 0) {
        trajet.radio = musiques[getRandomInt(0, musiques.length - 1 )]
        if (trajet.radio === "Anissa - Wejdene") {
            personnage.mental --
            trajet.nbsChangements ++
            if (personnage.mental === 0) {
                console.log("EXPLOSION")
            }
        }
        trajet.nbsFeuxRouges --

    }
    if (trajet.nbsFeuxRouges == 0 && personnage.mental != 0) {
        console.log(personnage.prenom + " est bien arrive chez lui et il lui a fallu " + trajet.nbsChangements + 
        " changements (sante mental : " + personnage.mental + ")")
    }
}

rentrer(personnage, trajet, musiques)