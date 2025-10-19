import type p5 from 'p5';
import type { Hit, Ray, SceneObject } from '.';
import type { Camera } from '../Camera';

export function createTexturedLine(sketch: p5, pos: p5.Vector, dir: p5.Vector, texture: p5.Graphics, lineHeight = 1, lineOffset = 0) {
	return {
		...createLine(sketch, pos, dir, function (this: Hit, size: number, x: number) {
			const height = (size * 0.03) / this.distance;
			sketch.image(texture, x, size / 2 - height / 2 + height * lineOffset, 1, height * lineHeight, sketch.floor(this.uv * texture.width), 0, 1);
		}),
		texture,
		draw: function (size: number) {
			sketch.stroke('black');
			sketch.line(pos.x * size, pos.y * size, (pos.x + dir.x) * size, (pos.y + dir.y) * size);
		}
	};
}

export function createColouredLine(sketch: p5, pos: p5.Vector, dir: p5.Vector, colour: p5.Color, lineHeight = 1, lineOffset = 0) {
	return {
		...createLine(sketch, pos, dir, function (this: Hit, size: number, x: number) {
			const height = (size * 0.03) / this.distance;
			sketch.noStroke();
			sketch.fill(sketch.color(sketch.red(colour) * sketch.sin(this.angle), sketch.green(colour) * sketch.sin(this.angle), sketch.blue(colour) * sketch.sin(this.angle)));
			sketch.rect(x, (size - height) / 2 + height * lineOffset, 1, height * (lineHeight + lineOffset));
		}),
		draw: function (size: number) {
			sketch.stroke(colour);
			sketch.line(pos.x * size, pos.y * size, (pos.x + dir.x) * size, (pos.y + dir.y) * size);
		}
	};
}

function createLine(sketch: p5, pos: p5.Vector, dir: p5.Vector, draw: (size: number, x: number) => void): SceneObject {
	return {
		cast(camera: Camera, ray: Ray) {
			const s = ((pos.x - ray.pos.x) * dir.y + dir.x * (ray.pos.y - pos.y)) / (ray.dir.x * dir.y - dir.x * ray.dir.y);
			const t = dir.x ? (ray.pos.x + s * ray.dir.x - pos.x) / dir.x : (ray.pos.y + s * ray.dir.y - pos.y) / dir.y;

			if (s < 0 || s > 1 || t < 0 || t > 1) return;

			const x = ray.pos.x + s * ray.dir.x;
			const y = ray.pos.y + s * ray.dir.y;

			const angle = ray.dir.angleBetween(dir);
			const perpendicular = sketch.createVector(-camera.dir.y, camera.dir.x).normalize();
			const point = perpendicular.mult(sketch.createVector(x, y).sub(ray.pos).dot(perpendicular)).add(ray.pos);

			return {
				angle,
				distance: sketch.dist(point.x, point.y, x, y),
				draw,
				pos: { x, y },
				uv: t
			};
		}
	};
}
