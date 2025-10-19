<script lang="ts">
	import p5 from 'p5';
	import { untrack } from 'svelte';
	import tsp, { play, stop } from './state.svelte';

	let node: HTMLDivElement;

	$effect(() => {
		const sketch = new p5((sketch: p5) => {
			sketch.setup = () => {
				sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
				sketch.textAlign(sketch.CENTER, sketch.CENTER);
				sketch.textSize(24);
			};

			sketch.draw = () => {
				sketch.background('#4c566a');

				if (tsp.grid) {
					sketch.stroke('#2e3440');
					for (let i = 20 * 2; i < sketch.width - 20; i += 20) {
						sketch.line(i, 20, i, sketch.height - 20);
					}
					for (let i = 20 * 2; i < sketch.height - 20; i += 20) {
						sketch.line(20, i, sketch.width - 20, i);
					}
				}

				const tour = tsp.algorithmCache.get(tsp.algorithm);
				if (tour) {
					sketch.stroke('#a3be8c');
					for (let i = 1; i < tour.path.length; i++) {
						sketch.line(tour.path[i - 1].x, tour.path[i - 1].y, tour.path[i].x, tour.path[i].y);
					}
				} else {
					sketch.stroke('#eceff4');
					for (let i = 0; i < tsp.cities.length; i++) {
						for (let j = i + 1; j < tsp.cities.length; j++) {
							sketch.line(tsp.cities[j].x, tsp.cities[j].y, tsp.cities[i].x, tsp.cities[i].y);
						}
					}
				}

				sketch.stroke('black');
				sketch.fill('#bf616a');
				tsp.cities.forEach((city) => {
					sketch.circle(city.x, city.y, 16);
				});

				let x = sketch.round(sketch.mouseX);
				let y = sketch.round(sketch.mouseY);

				if (tsp.grid) {
					x = sketch.round(x / 20) * 20;
					y = sketch.round(y / 20) * 20;
				}

				sketch.stroke('black');
				sketch.fill('#eceff4');
				if (tour) {
					sketch.text(sketch.round(tour.distance, 2), sketch.width / 2, sketch.height - 18);
				} else if (tsp.worker) {
					sketch.text(`${tsp.progress}%`, sketch.width / 2, sketch.height - 18);
				} else {
					sketch.text(`${x}, ${y}`, sketch.width / 2, sketch.height - 18);
				}
			};

			sketch.keyPressed = () => {
				sketch.key = sketch.key.toLowerCase();

				if (sketch.keyIsDown(sketch.CONTROL) && !sketch.keyIsDown(sketch.SHIFT) && sketch.key == 'z') {
					tsp.cities.pop();
				}
				if (sketch.key == 'r') {
					tsp.addCity(Math.random() * sketch.width, Math.random() * sketch.height);
				}
				if (sketch.key == 'g') {
					tsp.grid = !tsp.grid;
				}
				if (sketch.key == ' ') {
					tsp.cities = [];
				}
				if (sketch.key == 'enter') {
					play();
				}
			};

			sketch.mouseClicked = () => {
				let x = sketch.round(sketch.mouseX);
				let y = sketch.round(sketch.mouseY);

				if (tsp.grid) {
					x = sketch.round(x / 20) * 20;
					y = sketch.round(y / 20) * 20;
				}

				if (!tsp.cities.some((city) => city.x == x && city.y == y)) {
					tsp.addCity(x, y);
				}
			};

			sketch.windowResized = () => {
				sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
			};
		}, node);

		return sketch.remove.bind(sketch);
	});

	$effect(() => {
		tsp.cities.length;
		tsp.algorithmCache.clear();
		untrack(() => stop());
	});
</script>

<div bind:this={node}></div>
