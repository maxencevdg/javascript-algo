// POKEMON

class Pokemon {
    constructor(name, attack, defense, hp, luck) {
        this.name = name
        this.attack = attack
        this.defense = defense
        this.hp = hp
        this.luck = luck
    }

    isLucky() {
        return this.luck > Math.random()
    }

    attackPokemon(pokemon) {
        if (this.isLucky()) {
            let degats = this.attack - pokemon.defense
            pokemon.hp = pokemon.hp - degats
            console.log("le pokemon " + pokemon.name + " possède encore " + pokemon.hp + " hp car il a subit " + degats + " degats")

        } else {
            console.log("le pokemon " + this.name + " a raté son attaque")

        }

    }

}

let carapuce = new Pokemon("Carapuce", 5, 2, 9, 0.8)
let salameche = new Pokemon("Salameche", 5, 2, 9, 0.8)


function combat (pokemon1, pokemon2) {
    while (pokemon1.hp > 0 && pokemon2.hp > 0){
        pokemon1.attackPokemon(pokemon2)
        if (pokemon2.hp <= 0) {
            console.log("le pokemon " + pokemon2.name + " est mort")
            break
        }
        pokemon2.attackPokemon(pokemon1)
        if (pokemon1.hp <= 0) {
            console.log("le pokemon " + pokemon1.name + " est mort")
            break
        }
    }
}

combat(carapuce, salameche)