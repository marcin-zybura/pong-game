// Class to hold x and y position
class Vec {
  constructor (x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

// Class to create rectangle
class Rect {
  constructor(w, h) {
    this.pos = new Vec;
    this.size = new Vec(w, h);
  }

  get left() {
    return this.pos.x - this.size.x / 2;
  }

  get right() {
    return this.pos.x + this.size.x / 2;
  }

  get top() {
    return this.pos.y - this.size.y / 2;
  }

  get bottom() {
    return this.pos.y + this.size.y / 2;
  }
}

// Class to create a ball
class Ball extends Rect {
  constructor() {
    super(10, 10);
    this.vel = new Vec;
  }
}

// Class to create players' pads
class Player extends Rect {
  constructor() {
    super(20, 100);
    this.score = 0;
  }
}

class Pong {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    // Create a ball
    this.ball = new Ball;

    // Create players' pads
    this.players = [
      new Player,
      new Player
    ];

    this.players[0].pos.x = 40;
    this.players[1].pos.x = this.canvas.width - 40;
    this.players.forEach(player => {
      player.pos.y = this.canvas.height / 2;
    })

    let lastTime;
    const callback = (milliseconds) => {
      if (lastTime) {
        this.update((milliseconds - lastTime) / 1000);
      }
      lastTime = milliseconds;
      requestAnimationFrame(callback);
    };
    callback();
    this.reset();
  }

  collide(player, ball) {
    if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top) {
      ball.vel.x = -ball.vel.x;
    }
  }

  draw() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawRect(this.ball);

    this.players.forEach(player => this.drawRect(player));
  }

  drawRect(rect) {
    this.context.fillStyle = '#fff';
    this.context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
  }

  reset() {
    this.ball.pos.x = this.canvas.width / 2;
    this.ball.pos.y = this.canvas.height / 2;
    this.ball.vel.x = 200;
    this.ball.vel.y = 200;
  }

  // Update ball position; animate ball
  update(dt) {
    this.ball.pos.x += this.ball.vel.x * dt;
    this.ball.pos.y += this.ball.vel.y * dt;

    if (this.ball.left < 0 || this.ball.right > this.canvas.width) {
      let playerId;
      if (this.ball.vel.x < 0) {
        playerId = 1;
      }
      else {
        playerId = 0;
      }
      this.players[playerId].score++;
      this.reset();
      this.ball.vel.x = -this.ball.vel.x;
      console.log(playerId);
    }

    if (this.ball.top < 0 || this.ball.bottom > this.canvas.height) {
      this.ball.vel.y = -this.ball.vel.y;
    }

    this.players[1].pos.y = this.ball.pos.y;

    this.players.forEach(player => this.collide(player, this.ball));

    this.draw();
  }
}

const canvas = document.getElementById('pong');
const pong = new Pong(canvas);

canvas.addEventListener('mousemove', event => {
pong.players[0].pos.y = event.offsetY;
});