<script lang="ts">
	import p5 from 'p5';
	import { createCamera, type Camera } from './Camera';
	import type { Hierarchy } from './scene';
	import scene2 from './scene/scene2';

	let node: HTMLDivElement;

	$effect(() => {
		const sketch = new p5((sketch: p5) => {
			let resolution: number, size: number;

			let camera: Camera;
			let hierarchy: Hierarchy;

			sketch.setup = () => {
				resolution = size = sketch.floor(sketch.min(sketch.windowWidth / 2, sketch.windowHeight));
				resolution /= 4;

				sketch.createCanvas(size * 2, size);
				sketch.textAlign(sketch.CENTER, sketch.CENTER);

				camera = createCamera(sketch, sketch.createVector(0.5, 0.5), sketch.createVector(0, -1));
				hierarchy = scene2(sketch);
			};

			sketch.draw = () => {
				sketch.noStroke();

				sketch.fill('white');
				sketch.rect(0, 0, size, size);

				sketch.fill('black');
				sketch.rect(size, 0, size, size);

				camera.update();
				hierarchy.update!();

				console.time('raycast');

				for (let i = 0; i < resolution; i++) {
					const ray = {
						pos: camera.pos,
						dir: sketch.createVector(
							camera.dir.x - ((i * 2 + 1) / resolution - 1) * sketch.tan(camera.fov / 2) * camera.dir.y,
							camera.dir.y + ((i * 2 + 1) / resolution - 1) * sketch.tan(camera.fov / 2) * camera.dir.x
						)
					};
					const hits = hierarchy.cast(camera, ray);
					// hits.at(-1)?.draw(size, size + (size * i) / resolution);
					hits.forEach((hit) => {
						hit.draw(size, size + (size * i) / resolution);
					});
				}

				console.timeEnd('raycast');

				hierarchy.draw!(size);
				camera.draw(size);

				sketch.fill('white');
				sketch.textSize(size * 0.032);
				sketch.text(sketch.round(1000 / sketch.deltaTime), size * 1.968, size * 0.032);
			};

			sketch.windowResized = () => {
				size = sketch.floor(sketch.min(sketch.windowWidth / 2, sketch.windowHeight));
				sketch.resizeCanvas(size * 2, size);
			};
		}, node);

		return sketch.remove;
	});
</script>

<div bind:this={node} class="mx-auto w-min"></div>
