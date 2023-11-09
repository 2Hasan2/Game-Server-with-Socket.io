
const socket = io();
const canvas = document.getElementById('ctx');
const ctx = canvas.getContext('2d');

socket.on('update', (data) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    data.forEach(obj => {
        draw(obj);
    });
});

socket.on('not_connected', (data) => {
    console.log(data);
})



// draw function
function draw(obj) {
    // obj color
    ctx.fillStyle = obj.color;
    ctx.beginPath();
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    ctx.stroke();
    ctx.closePath();
}


keysHandler();

function keysHandler() {
    const pressedKeys = {};
    let animationFrameId;
    document.addEventListener('keyup', (e) => {
        delete pressedKeys[e.keyCode];
        if (Object.keys(pressedKeys).length === 0) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    });
    document.addEventListener('keydown', (e) => {
        pressedKeys[e.keyCode] = true;
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(movePlayer);
        }
        function movePlayer() {
            const [TOP_KEY, BOTTOM_KEY, LEFT_KEY, RIGHT_KEY] = [38, 40, 37, 39];
            const speed = 5;

            if (pressedKeys[TOP_KEY]) {
                socket.emit('position', { dx: 0, dy: -speed });
            }
            if (pressedKeys[BOTTOM_KEY]) {
                socket.emit('position', { dx: 0, dy: speed });
            }
            if (pressedKeys[LEFT_KEY]) {
                socket.emit('position', { dx: -speed, dy: 0 });
            }
            if (pressedKeys[RIGHT_KEY]) {
                socket.emit('position', { dx: speed, dy: 0 });
            }
            if (Object.keys(pressedKeys).length > 0) {
                animationFrameId = requestAnimationFrame(movePlayer);
            }
        }

    });
}


