interface Troop {
    carryCapacity: number,
    attack: number,
    defenceInfantry: number,
    defenceCavalry: number,
    costWood: number,
    costClay: number,
    costIron: number,
    costCrop: number,
    upkeep: number,
    speed: number,
    trainingDuration: number,
    scout: boolean
    name: string
}

export default Troop;