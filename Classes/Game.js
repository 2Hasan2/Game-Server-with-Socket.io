class Game {
    constructor(players, functions) {
        this.players = players;
        this.playersCount = players.length;
        this.functions = functions;
    }

    addPlayer(player) {
        this.players.push(player);
        this.update();
    }

    removePlayer(player) {
        this.players = this.players.filter(p => p.id !== player.id);
        this.update();
    }

    update() {
        this.playersCount = this.players.length || 0;
    }
    // execute func
    executeFunctions() {
        this.functions.forEach(func => {
            func();
        });
    }

}

module.exports = Game;