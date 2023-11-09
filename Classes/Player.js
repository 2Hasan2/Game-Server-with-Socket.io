class Player {
    constructor(id, x, y, width, height, color, name) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.name = name;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

module.exports = Player;