// Játékállapot
export const gameState = {
    money: 10,
    planks: 0,
    ownedTiles: 0,
    map: [],
    camera: {
        x: 0,
        y: 0,
        zoom: 5
    },
    activeBubble: null,
    cuttingTrees: new Map()
};

