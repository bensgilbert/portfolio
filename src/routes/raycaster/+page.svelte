<script lang="ts">
	import type p5 from 'p5';
	import { onMount } from 'svelte';

	onMount(() => {
		let sketch: p5;

		import('p5').then(({ default: p5 }) => {
			sketch = new p5((sketch: p5) => {
				let camera: {
					resolution: number;
					fov: number;
				};
				let canvas: {
					colours: p5.Color[];
					state: any;
					update: () => void;
					draw: (size: number) => void;
				};
				let scene: {
					camera: {
						pos: p5.Vector;
						dir: p5.Vector;
						update?: () => void;
						draw?: (size: number) => void;
					};
					hierarchy: {
						update?: () => void;
						draw?: (size: number) => void;
						cast: (camera: { pos: p5.Vector; dir: p5.Vector }, ray: { pos: p5.Vector; dir: p5.Vector }) => { distance: number; draw: (size: number, x: number) => void } | void;
					}[];
				};
				let size: number;
				let ui: p5.Element[];

				sketch.setup = () => {
					size = Math.min(sketch.windowWidth / 2, sketch.windowHeight);
					sketch.createCanvas(size * 2, size);

					camera = {
						resolution: size,
						fov: Math.PI / 3
					};

					canvas = {
						colours: [sketch.color(255, 0, 0), sketch.color(127, 127, 0), sketch.color(0, 255, 0), sketch.color(0, 127, 127), sketch.color(0, 0, 255)],
						state: {
							colour: 0,
							mode: 0,
							mouse: {
								pos: sketch.createVector(),
								pressed: false
							}
						},

						update: function () {},

						draw: function () {
							sketch.stroke(this.colours[this.state.colour]);
							sketch.noFill();

							if (this.state.mouse.pressed) {
								if (this.state.mode == 0) {
									sketch.line(this.state.mouse.pos.x, this.state.mouse.pos.y, sketch.mouseX, sketch.mouseY);
								}
								if (this.state.mode == 1) {
									sketch.circle(this.state.mouse.pos.x, this.state.mouse.pos.y, sketch.dist(this.state.mouse.pos.x, this.state.mouse.pos.y, sketch.mouseX, sketch.mouseY) * 2);
								}
								if (this.state.mode == 2) {
									sketch.rect(this.state.mouse.pos.x, this.state.mouse.pos.y, sketch.mouseX - this.state.mouse.pos.x, sketch.mouseY - this.state.mouse.pos.y);
								}
							}

							sketch.stroke('black');

							sketch.line(size * 0.9, size * 0.254, size * 0.95, size * 0.304);
							sketch.circle(size * 0.925, size * 0.373, size * 0.05);
							sketch.rect(size * 0.9, size * 0.442, size * 0.05, size * 0.05);

							sketch.rect(size * 0.88, size * (0.234 + canvas.state.mode * 0.094), size * 0.09, size * 0.09, size * 0.02);

							sketch.strokeWeight(size * 0.001);
							canvas.colours.forEach((colour, index) => {
								sketch.fill(colour);
								sketch.circle(size * (0.9 + (index % 2) * 0.05), size * (0.55 + Math.floor(index / 2) * 0.05), size * 0.032);
							});

							sketch.strokeWeight(size * 0.002);
							sketch.noFill();
							sketch.circle(size * (0.9 + (canvas.state.colour % 2) * 0.05), size * (0.55 + Math.floor(canvas.state.colour / 2) * 0.05), size * 0.045);
						}
					};

					scene = {
						camera: {
							pos: sketch.createVector(0.5, 0.5),
							dir: sketch.createVector(1, 0),

							update: function () {
								if (sketch.keyIsDown('w') || sketch.keyIsDown(38)) {
									this.pos.x += this.dir.x * 0.001;
									this.pos.y += this.dir.y * 0.001;
								}
								if (sketch.keyIsDown('s') || sketch.keyIsDown(40)) {
									this.pos.x -= this.dir.x * 0.001;
									this.pos.y -= this.dir.y * 0.001;
								}

								if (sketch.keyIsDown('a')) {
									this.pos.x += this.dir.y * 0.001;
									this.pos.y -= this.dir.x * 0.001;
								}
								if (sketch.keyIsDown('d')) {
									this.pos.x -= this.dir.y * 0.001;
									this.pos.y += this.dir.x * 0.001;
								}

								if (sketch.keyIsDown(37)) {
									this.dir.x = Math.cos(-0.02) * this.dir.x - Math.sin(-0.02) * this.dir.y;
									this.dir.y = Math.sin(-0.02) * this.dir.x + Math.cos(-0.02) * this.dir.y;
									this.dir.normalize();
								}
								if (sketch.keyIsDown(39)) {
									this.dir.x = Math.cos(0.02) * this.dir.x - Math.sin(0.02) * this.dir.y;
									this.dir.y = Math.sin(0.02) * this.dir.x + Math.cos(0.02) * this.dir.y;
									this.dir.normalize();
								}
							},

							draw: function (size: number) {
								sketch.fill('black');
								sketch.circle(this.pos.x * size, this.pos.y * size, size * 0.0056);
							}
						},
						hierarchy: [
							{
								pos: sketch.createVector(0.2, 0.2),
								dir: sketch.createVector(0.6, 0),

								draw: function (size: number) {
									sketch.stroke('#FF0000');
									sketch.line(this.pos.x * size, this.pos.y * size, (this.pos.x + this.dir.x) * size, (this.pos.y + this.dir.y) * size);
								},

								cast: function (camera: { pos: p5.Vector; dir: p5.Vector }, ray: { pos: p5.Vector; dir: p5.Vector }) {
									const s = ((this.pos.x - ray.pos.x) * this.dir.y + this.dir.x * (ray.pos.y - this.pos.y)) / (ray.dir.x * this.dir.y - this.dir.x * ray.dir.y);
									const t = this.dir.x ? (ray.pos.x + s * ray.dir.x - this.pos.x) / this.dir.x : (ray.pos.y + s * ray.dir.y - this.pos.y) / this.dir.y;

									if (s < 0 || s > 1 || t < 0 || t > 1) return;

									const x = ray.pos.x + s * ray.dir.x;
									const y = ray.pos.y + s * ray.dir.y;

									const perpendicular = sketch.createVector(-camera.dir.y, camera.dir.x).setMag(1);
									const point = perpendicular.mult(sketch.createVector(x, y).sub(ray.pos).dot(perpendicular)).add(ray.pos);

									return {
										distance: sketch.dist(point.x, point.y, x, y),
										draw: function (size: number, x: number) {
											sketch.stroke('#FF0000');
											sketch.line(x, (size - 1 / this.distance) / 2, x, (size + 1 / this.distance) / 2);
										}
									};
								}
							},
							{
								pos: sketch.createVector(0.8, 0.4),
								dir: sketch.createVector(0, 0.2),

								draw: function (size: number) {
									sketch.stroke('#000000');
									sketch.line(this.pos.x * size, this.pos.y * size, (this.pos.x + this.dir.x) * size, (this.pos.y + this.dir.y) * size);
								},

								cast: function (camera: { pos: p5.Vector; dir: p5.Vector }, ray: { pos: p5.Vector; dir: p5.Vector }) {
									const s = ((this.pos.x - ray.pos.x) * this.dir.y + this.dir.x * (ray.pos.y - this.pos.y)) / (ray.dir.x * this.dir.y - this.dir.x * ray.dir.y);
									const t = this.dir.x ? (ray.pos.x + s * ray.dir.x - this.pos.x) / this.dir.x : (ray.pos.y + s * ray.dir.y - this.pos.y) / this.dir.y;

									if (s < 0 || s > 1 || t < 0 || t > 1) return;

									const x = ray.pos.x + s * ray.dir.x;
									const y = ray.pos.y + s * ray.dir.y;

									const perpendicular = sketch.createVector(-camera.dir.y, camera.dir.x).setMag(1);
									const point = perpendicular.mult(sketch.createVector(x, y).sub(ray.pos).dot(perpendicular)).add(ray.pos);

									return {
										distance: sketch.dist(point.x, point.y, x, y),
										draw: function (size: number, x: number) {
											sketch.stroke('#FF0000');
											sketch.line(x, (size - 1 / this.distance) / 2, x, (size + 1 / this.distance) / 2);
										}
									};
								}
							}
						]
					};

					ui = [
						(() => {
							const button = sketch.createButton('1');
							button.position(size * 0.02, size * 0.02);

							button.style('background-color', 'white');
							button.style('border', `${size * 0.004}px solid black`);
							button.style('border-radius', `${size * 0.008}px`);
							button.style('cursor', 'pointer');
							button.style('font-size', `${size * 0.032}px`);
							button.style('width', `${size * 0.08}px`);
							button.style('height', `${size * 0.08}px`);

							button.mouseClicked(() => {
								console.log('Scene 1');
							});

							button.mouseOut(() => {
								button.style('background-color', 'white');
								button.style('color', 'black');
							});

							button.mousePressed(() => {
								button.style('background-color', 'black');
								button.style('color', 'white');
							});
							button.mouseReleased(() => {
								button.style('background-color', 'white');
								button.style('color', 'black');
							});

							return button;
						})(),
						(() => {
							const button = sketch.createButton('2');
							button.position(size * 0.12, size * 0.02);

							button.style('background-color', 'white');
							button.style('border', `${size * 0.004}px solid black`);
							button.style('border-radius', `${size * 0.008}px`);
							button.style('cursor', 'pointer');
							button.style('font-size', `${size * 0.032}px`);
							button.style('width', `${size * 0.08}px`);
							button.style('height', `${size * 0.08}px`);

							button.mouseClicked(() => {
								console.log('Scene 2');
							});

							button.mouseOut(() => {
								button.style('background-color', 'white');
								button.style('color', 'black');
							});

							button.mousePressed(() => {
								button.style('background-color', 'black');
								button.style('color', 'white');
							});
							button.mouseReleased(() => {
								button.style('background-color', 'white');
								button.style('color', 'black');
							});

							return button;
						})(),
						(() => {
							const button = sketch.createButton('Clear');
							button.position(size * 0.22, size * 0.02);

							button.style('background-color', 'white');
							button.style('border', `${size * 0.004}px solid black`);
							button.style('border-radius', `${size * 0.008}px`);
							button.style('cursor', 'pointer');
							button.style('font-size', `${size * 0.024}px`);
							button.style('width', `${size * 0.08}px`);
							button.style('height', `${size * 0.08}px`);

							button.mouseClicked(() => {
								console.log('Clearing');
							});

							button.mouseOut(() => {
								button.style('background-color', 'white');
								button.style('color', 'black');
							});

							button.mousePressed(() => {
								button.style('background-color', 'black');
								button.style('color', 'white');
							});
							button.mouseReleased(() => {
								button.style('background-color', 'white');
								button.style('color', 'black');
							});

							return button;
						})()
					];
				};

				sketch.draw = () => {
					sketch.noStroke();

					sketch.fill('white');
					sketch.rect(0, 0, size, size);

					sketch.fill('black');
					sketch.rect(size, 0, size, size);

					sketch.noFill();

					scene.camera.update?.();

					scene.hierarchy.forEach((object) => {
						object.update?.();
						object.draw?.(size);
					});

					sketch.stroke('black');
					scene.camera.draw?.(size);

					sketch.strokeCap(sketch.SQUARE);
					sketch.strokeWeight(2);

					for (let i = 0; i < camera.resolution; i++) {
						const hits = scene.hierarchy
							.map((object) =>
								object.cast(scene.camera, {
									pos: scene.camera.pos,
									dir: sketch.createVector(
										scene.camera.dir.x - ((i * 2 + 1) / camera.resolution - 1) * Math.tan(camera.fov / 2) * scene.camera.dir.y,
										scene.camera.dir.y + ((i * 2 + 1) / camera.resolution - 1) * Math.tan(camera.fov / 2) * scene.camera.dir.x
									)
								})
							)
							.filter((hit) => !!hit)
							.sort((a, b) => b.distance - a.distance);
						hits.forEach((hit) => hit.draw?.(size, size + (i / camera.resolution) * size));
					}

					canvas.update();
					canvas.draw(size);

					sketch.textAlign(sketch.RIGHT, sketch.TOP);
					sketch.textSize(size * 0.024);
					sketch.stroke('black');
					sketch.fill('white');
					sketch.text(Math.round(1000 / sketch.deltaTime), size * 2 - size * 0.016, size * 0.016);
				};

				sketch.keyPressed = () => {
					switch (sketch.key) {
						case '1':
							ui[0].style('background-color', 'black');
							ui[0].style('color', 'white');
							break;
						case '2':
							ui[1].style('background-color', 'black');
							ui[1].style('color', 'white');
							break;
					}
				};
				sketch.keyReleased = () => {
					switch (sketch.key) {
						case '1':
							ui[0].style('background-color', 'white');
							ui[0].style('color', 'black');
							ui[0].elt.click();
							break;
						case '2':
							ui[1].style('background-color', 'white');
							ui[1].style('color', 'black');
							ui[0].elt.click();
							break;
					}
				};

				sketch.mousePressed = () => {
					if (sketch.mouseX > size * 0.88 && sketch.mouseY > size * 0.236 && sketch.mouseX < size * 0.97 && sketch.mouseY < size * 0.326) {
						canvas.state.mode = 0;
						return;
					}
					if (sketch.mouseX > size * 0.88 && sketch.mouseY > size * 0.33 && sketch.mouseX < size * 0.97 && sketch.mouseY < size * 0.42) {
						canvas.state.mode = 1;
						return;
					}
					if (sketch.mouseX > size * 0.88 && sketch.mouseY > size * 0.424 && sketch.mouseX < size * 0.97 && sketch.mouseY < size * 0.514) {
						canvas.state.mode = 2;
						return;
					}

					for (let i = 0; i < canvas.colours.length; i++) {
						if (sketch.dist(sketch.mouseX, sketch.mouseY, size * (0.9 + (i % 2) * 0.05), size * (0.55 + Math.floor(i / 2) * 0.05)) < size * 0.021) {
							canvas.state.colour = i;
							return;
						}
					}

					canvas.state.mouse = {
						pos: sketch.createVector(sketch.mouseX, sketch.mouseY),
						pressed: true
					};
				};
				sketch.mouseReleased = () => {
					if (!canvas.state.mouse.pressed) return;
					canvas.state.mouse.pressed = false;

					if (sketch.dist(canvas.state.mouse.pos.x, canvas.state.mouse.pos.y, sketch.mouseX, sketch.mouseY) < 3) return;

					if (canvas.state.mode == 0) {
						const object = {
							pos: sketch.createVector(canvas.state.mouse.pos.x / size, canvas.state.mouse.pos.y / size),
							dir: sketch.createVector((sketch.mouseX - canvas.state.mouse.pos.x) / size, (sketch.mouseY - canvas.state.mouse.pos.y) / size),
							colour: canvas.colours[canvas.state.colour].toString(),

							draw: function (size: number) {
								sketch.stroke(this.colour);
								sketch.line(this.pos.x * size, this.pos.y * size, (this.pos.x + this.dir.x) * size, (this.pos.y + this.dir.y) * size);
							},

							cast: function (camera: { pos: p5.Vector; dir: p5.Vector }, ray: { pos: p5.Vector; dir: p5.Vector }) {
								const s = ((this.pos.x - ray.pos.x) * this.dir.y + this.dir.x * (ray.pos.y - this.pos.y)) / (ray.dir.x * this.dir.y - this.dir.x * ray.dir.y);
								const t = this.dir.x ? (ray.pos.x + s * ray.dir.x - this.pos.x) / this.dir.x : (ray.pos.y + s * ray.dir.y - this.pos.y) / this.dir.y;

								if (s < 0 || s > 1 || t < 0 || t > 1) return;

								const x = ray.pos.x + s * ray.dir.x;
								const y = ray.pos.y + s * ray.dir.y;

								const perpendicular = sketch.createVector(-camera.dir.y, camera.dir.x).setMag(1);
								const point = perpendicular.mult(sketch.createVector(x, y).sub(ray.pos).dot(perpendicular)).add(ray.pos);

								return {
									distance: sketch.dist(point.x, point.y, x, y),
									object: this,
									draw: function (size: number, x: number) {
										sketch.stroke(this.object.colour);
										sketch.line(x, (size - 1 / this.distance) / 2, x, (size + 1 / this.distance) / 2);
									}
								};
							}
						};
						scene.hierarchy.push(object);
					}
					if (canvas.state.mode == 1) {
						const object = {
							centre: sketch.createVector(canvas.state.mouse.pos.x / size, canvas.state.mouse.pos.y / size),
							radius: sketch.dist(canvas.state.mouse.pos.x / size, canvas.state.mouse.pos.y / size, sketch.mouseX / size, sketch.mouseY / size),
							colour: canvas.colours[canvas.state.colour].toString(),

							draw: function (size: number) {
								sketch.stroke(this.colour);
								sketch.circle(this.centre.x * size, this.centre.y * size, 2 * this.radius * size);
							},

							cast: function (ray: { pos: p5.Vector; dir: p5.Vector }) {
								const a = sketch.sq(ray.dir.x) + sketch.sq(ray.dir.y);
								const b = 2 * ((ray.pos.x - this.centre.x) * ray.dir.x + (ray.pos.y - this.centre.y) * ray.dir.y);
								const c = sketch.sq(ray.pos.x - this.centre.x) + sketch.sq(ray.pos.y - this.centre.y) - sketch.sq(this.radius);

								const discriminant = sketch.sq(b) - 4 * a * c;
								if (discriminant < 0) return;

								const s = (-b + sketch.sqrt(discriminant)) / (2 * a);
								const t = (-b - sketch.sqrt(discriminant)) / (2 * a);

								const pos = {
									x: 0,
									y: 0
								};

								if (s > 0 && t > 0) {
									pos.x = ray.pos.x + sketch.min(s, t) * ray.dir.x;
									pos.y = ray.pos.y + sketch.min(s, t) * ray.dir.y;
								} else if (s > 0) {
									pos.x = ray.pos.x + s * ray.dir.x;
									pos.y = ray.pos.y + s * ray.dir.y;
								} else if (t > 0) {
									pos.x = ray.pos.x + t * ray.dir.x;
									pos.y = ray.pos.y + t * ray.dir.y;
								} else {
									return;
								}

								return {
									distance: sketch.dist(ray.pos.x, ray.pos.y, pos.x, pos.y),
									object: this,
									draw: function (x: number) {}
								};
							}
						};
						scene.hierarchy.push(object);
					}
					if (canvas.state.mode == 2) {
						// const object = {
						// 	children: [
						// 		{
						// 			pos: sketch.createVector(canvas.state.mouse.pos.x / size, canvas.state.mouse.pos.y / size),
						// 			dir: sketch.createVector(0, (sketch.mouseY - canvas.state.mouse.pos.y) / size),
						// 			colour: canvas.colours[canvas.state.colour].toString(),

						// 			draw: function (size: number) {
						// 				sketch.stroke(this.colour);
						// 				sketch.line(this.pos.x * size, this.pos.y * size, (this.pos.x + this.dir.x) * size, (this.pos.y + this.dir.y) * size);
						// 			},

						// 			cast: function (camera: { pos: p5.Vector; dir: p5.Vector }, ray: { pos: p5.Vector; dir: p5.Vector }) {
						// 				const s = ((this.pos.x - ray.pos.x) * this.dir.y + this.dir.x * (ray.pos.y - this.pos.y)) / (ray.dir.x * this.dir.y - this.dir.x * ray.dir.y);
						// 				const t = this.dir.x ? (ray.pos.x + s * ray.dir.x - this.pos.x) / this.dir.x : (ray.pos.y + s * ray.dir.y - this.pos.y) / this.dir.y;

						// 				if (s < 0 || s > 1 || t < 0 || t > 1) return;

						// 				const x = ray.pos.x + s * ray.dir.x;
						// 				const y = ray.pos.y + s * ray.dir.y;

						// 				const perpendicular = sketch.createVector(-camera.dir.y, camera.dir.x).setMag(1);
						// 				const point = perpendicular.mult(sketch.createVector(x, y).sub(ray.pos).dot(perpendicular)).add(ray.pos);

						// 				return {
						// 					distance: sketch.dist(point.x, point.y, x, y),
						// 					object: this,
						// 					draw: function (size: number, x: number) {
						// 						sketch.stroke(this.object.colour);
						// 						sketch.line(x, (size - 1 / this.distance) / 2, x, (size + 1 / this.distance) / 2);
						// 					}
						// 				};
						// 			}
						// 		},
						// 		{
						// 			pos: sketch.createVector(canvas.state.mouse.pos.x / size, sketch.mouseY / size),
						// 			dir: sketch.createVector((sketch.mouseX - canvas.state.mouse.pos.x) / size, 0),
						// 			colour: canvas.colours[canvas.state.colour].toString(),

						// 			draw: function (size: number) {
						// 				sketch.stroke(this.colour);
						// 				sketch.line(this.pos.x * size, this.pos.y * size, (this.pos.x + this.dir.x) * size, (this.pos.y + this.dir.y) * size);
						// 			},

						// 			cast: function (camera: { pos: p5.Vector; dir: p5.Vector }, ray: { pos: p5.Vector; dir: p5.Vector }) {
						// 				const s = ((this.pos.x - ray.pos.x) * this.dir.y + this.dir.x * (ray.pos.y - this.pos.y)) / (ray.dir.x * this.dir.y - this.dir.x * ray.dir.y);
						// 				const t = this.dir.x ? (ray.pos.x + s * ray.dir.x - this.pos.x) / this.dir.x : (ray.pos.y + s * ray.dir.y - this.pos.y) / this.dir.y;

						// 				if (s < 0 || s > 1 || t < 0 || t > 1) return;

						// 				const x = ray.pos.x + s * ray.dir.x;
						// 				const y = ray.pos.y + s * ray.dir.y;

						// 				const perpendicular = sketch.createVector(-camera.dir.y, camera.dir.x).setMag(1);
						// 				const point = perpendicular.mult(sketch.createVector(x, y).sub(ray.pos).dot(perpendicular)).add(ray.pos);

						// 				return {
						// 					distance: sketch.dist(point.x, point.y, x, y),
						// 					object: this,
						// 					draw: function (size: number, x: number) {
						// 						sketch.stroke(this.object.colour);
						// 						sketch.line(x, (size - 1 / this.distance) / 2, x, (size + 1 / this.distance) / 2);
						// 					}
						// 				};
						// 			}
						// 		},
						// 		{
						// 			pos: sketch.createVector(sketch.mouseX / size, canvas.state.mouse.pos.y / size),
						// 			dir: sketch.createVector(0, (sketch.mouseY - canvas.state.mouse.pos.y) / size),
						// 			colour: canvas.colours[canvas.state.colour].toString(),

						// 			draw: function (size: number) {
						// 				sketch.stroke(this.colour);
						// 				sketch.line(this.pos.x * size, this.pos.y * size, (this.pos.x + this.dir.x) * size, (this.pos.y + this.dir.y) * size);
						// 			},

						// 			cast: function (camera: { pos: p5.Vector; dir: p5.Vector }, ray: { pos: p5.Vector; dir: p5.Vector }) {
						// 				const s = ((this.pos.x - ray.pos.x) * this.dir.y + this.dir.x * (ray.pos.y - this.pos.y)) / (ray.dir.x * this.dir.y - this.dir.x * ray.dir.y);
						// 				const t = this.dir.x ? (ray.pos.x + s * ray.dir.x - this.pos.x) / this.dir.x : (ray.pos.y + s * ray.dir.y - this.pos.y) / this.dir.y;

						// 				if (s < 0 || s > 1 || t < 0 || t > 1) return;

						// 				const x = ray.pos.x + s * ray.dir.x;
						// 				const y = ray.pos.y + s * ray.dir.y;

						// 				const perpendicular = sketch.createVector(-camera.dir.y, camera.dir.x).setMag(1);
						// 				const point = perpendicular.mult(sketch.createVector(x, y).sub(ray.pos).dot(perpendicular)).add(ray.pos);

						// 				return {
						// 					distance: sketch.dist(point.x, point.y, x, y),
						// 					object: this,
						// 					draw: function (size: number, x: number) {
						// 						sketch.stroke(this.object.colour);
						// 						sketch.line(x, (size - 1 / this.distance) / 2, x, (size + 1 / this.distance) / 2);
						// 					}
						// 				};
						// 			}
						// 		},
						// 		{
						// 			pos: sketch.createVector(sketch.mouseX / size, canvas.state.mouse.pos.y / size),
						// 			dir: sketch.createVector((canvas.state.mouse.pos.x - sketch.mouseX) / size, 0),
						// 			colour: canvas.colours[canvas.state.colour].toString(),

						// 			draw: function (size: number) {
						// 				sketch.stroke(this.colour);
						// 				sketch.line(this.pos.x * size, this.pos.y * size, (this.pos.x + this.dir.x) * size, (this.pos.y + this.dir.y) * size);
						// 			},

						// 			cast: function (camera: { pos: p5.Vector; dir: p5.Vector }, ray: { pos: p5.Vector; dir: p5.Vector }) {
						// 				const s = ((this.pos.x - ray.pos.x) * this.dir.y + this.dir.x * (ray.pos.y - this.pos.y)) / (ray.dir.x * this.dir.y - this.dir.x * ray.dir.y);
						// 				const t = this.dir.x ? (ray.pos.x + s * ray.dir.x - this.pos.x) / this.dir.x : (ray.pos.y + s * ray.dir.y - this.pos.y) / this.dir.y;

						// 				if (s < 0 || s > 1 || t < 0 || t > 1) return;

						// 				const x = ray.pos.x + s * ray.dir.x;
						// 				const y = ray.pos.y + s * ray.dir.y;

						// 				const perpendicular = sketch.createVector(-camera.dir.y, camera.dir.x).setMag(1);
						// 				const point = perpendicular.mult(sketch.createVector(x, y).sub(ray.pos).dot(perpendicular)).add(ray.pos);

						// 				return {
						// 					distance: sketch.dist(point.x, point.y, x, y),
						// 					object: this,
						// 					draw: function (size: number, x: number) {
						// 						sketch.stroke(this.object.colour);
						// 						sketch.line(x, (size - 1 / this.distance) / 2, x, (size + 1 / this.distance) / 2);
						// 					}
						// 				};
						// 			}
						// 		}
						// 	],
						// 	colour: canvas.colours[canvas.state.colour].toString(),

						// 	draw: function (size: number) {
						// 		this.children.forEach((child) => {
						// 			child.draw(size);
						// 		});
						// 	},

						// 	cast: function (ray: { pos: p5.Vector; dir: p5.Vector }) {
						// 		return this.children
						// 			.map((object) => object.cast(scene.camera, ray))
						// 			.filter((hit) => !!hit)
						// 			.sort((a, b) => b.distance - a.distance)[0];
						// 	}
						// };
						scene.hierarchy.push(object);
					}
				};

				sketch.windowResized = () => {
					size = Math.min(sketch.windowWidth / 2, sketch.windowHeight);
					sketch.resizeCanvas(size * 2, size);

					ui[0].position(size * 0.02, size * 0.02);
					ui[0].style('border', `${size * 0.004}px solid black`);
					ui[0].style('border-radius', `${size * 0.008}px`);
					ui[0].style('font-size', `${size * 0.032}px`);
					ui[0].style('width', `${size * 0.08}px`);
					ui[0].style('height', `${size * 0.08}px`);

					ui[1].position(size * 0.12, size * 0.02);
					ui[1].style('border', `${size * 0.004}px solid black`);
					ui[1].style('border-radius', `${size * 0.008}px`);
					ui[1].style('font-size', `${size * 0.032}px`);
					ui[1].style('width', `${size * 0.08}px`);
					ui[1].style('height', `${size * 0.08}px`);

					ui[2].position(size * 0.22, size * 0.02);
					ui[2].style('border', `${size * 0.004}px solid black`);
					ui[2].style('border-radius', `${size * 0.008}px`);
					ui[2].style('font-size', `${size * 0.024}px`);
					ui[2].style('width', `${size * 0.08}px`);
					ui[2].style('height', `${size * 0.08}px`);
				};
			});
		});

		return () => {
			sketch.remove();
		};
	});
</script>

<svelte:head>
	<style>
		body {
			margin: 0;
		}
	</style>
</svelte:head>
