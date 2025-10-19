import type p5 from 'p5';

export interface Camera {
	pos: p5.Vector;
	dir: p5.Vector;
	fov: number;
	speed: number;
	turnSpeed: number;

	update: () => void;
	draw: (size: number) => void;
}

export function createCamera(sketch: p5, pos: p5.Vector, dir: p5.Vector): Camera {
	return {
		pos,
		dir,
		fov: sketch.PI / 3,
		speed: 0.001,
		turnSpeed: 0.02,

		update() {
			if (sketch.keyIsDown('w')) {
				this.pos.x = sketch.constrain(this.pos.x + this.dir.x * this.speed, 0, 1);
				this.pos.y = sketch.constrain(this.pos.y + this.dir.y * this.speed, 0, 1);
			}
			if (sketch.keyIsDown('s')) {
				this.pos.x = sketch.constrain(this.pos.x - this.dir.x * this.speed, 0, 1);
				this.pos.y = sketch.constrain(this.pos.y - this.dir.y * this.speed, 0, 1);
			}

			if (sketch.keyIsDown('a')) {
				this.pos.x = sketch.constrain(this.pos.x + this.dir.y * this.speed, 0, 1);
				this.pos.y = sketch.constrain(this.pos.y - this.dir.x * this.speed, 0, 1);
			}
			if (sketch.keyIsDown('d')) {
				this.pos.x = sketch.constrain(this.pos.x - this.dir.y * this.speed, 0, 1);
				this.pos.y = sketch.constrain(this.pos.y + this.dir.x * this.speed, 0, 1);
			}

			if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
				this.dir.rotate(-this.turnSpeed);
			}
			if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
				this.dir.rotate(this.turnSpeed);
			}
		},

		draw(size) {
			sketch.fill('black');
			sketch.circle(this.pos.x * size, this.pos.y * size, size * 0.008);
		}
	};
}
