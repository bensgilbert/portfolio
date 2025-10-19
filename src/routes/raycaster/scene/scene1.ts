import type p5 from 'p5';
import type { Hierarchy, Hit, Ray, SceneObject } from '.';
import type { Camera } from '../Camera';
import { createColouredLine } from './line';

export default function scene1(sketch: p5): Hierarchy {
	const hierarchy = {
		children: [
			createColouredLine(sketch, sketch.createVector(0.2, 0.2), sketch.createVector(0.6, 0), sketch.color('red')),
			createColouredLine(sketch, sketch.createVector(0.8, 0.2), sketch.createVector(0, 0.6), sketch.color('green')),
			createColouredLine(sketch, sketch.createVector(0.8, 0.8), sketch.createVector(-0.6, 0), sketch.color('blue')),
			createColouredLine(sketch, sketch.createVector(0.2, 0.8), sketch.createVector(0, -0.6), sketch.color('yellow'))
		] as SceneObject[],

		update() {
			this.children.forEach((child) => child.update?.());
		},
		cast(camera: Camera, ray: Ray) {
			const hits = this.children.map((object) => object.cast(camera, ray)).filter((hit) => hit) as Hit[];
			return hits.sort((a, b) => b.distance - a.distance);
		},
		draw(size: number) {
			this.children.forEach((child) => child.draw?.(size));
		}
	};
	return hierarchy;
}
