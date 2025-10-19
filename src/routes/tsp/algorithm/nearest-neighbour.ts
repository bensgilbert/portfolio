import { Algorithm } from '.';
import type { City } from '../state.svelte';
import { MessageType } from '../worker';

// https://en.wikipedia.org/wiki/Nearest_neighbour_algorithm
export default (cities: City[]): void => {
	const distances = cities.map((outer) => cities.map((inner) => Math.hypot(outer.x - inner.x, outer.y - inner.y)));

	let tour = {
		distance: Infinity,
		path: [] as number[]
	};

	for (let i = 0; i < cities.length; i++) {
		const visited = new Array(cities.length).fill(false);
		const path = [i];
		visited[i] = true;

		let distance = 0;
		for (let _ = 1; _ < cities.length; _++) {
			const currentCity = path[path.length - 1];
			let nearestCity: number;
			let shortestDistance = Infinity;

			for (let j = 0; j < cities.length; j++) {
				if (!visited[j]) {
					const distance = distances[currentCity][j];
					if (distance < shortestDistance) {
						nearestCity = j;
						shortestDistance = distance;
					}
				}
			}

			path.push(nearestCity!);
			visited[nearestCity!] = true;
			distance += shortestDistance;
		}

		distance += distances[path[0]][path[path.length - 1]];
		if (distance < tour.distance) {
			tour = {
				distance,
				path
			};
		}
	}

	postMessage({
		type: MessageType.Complete,
		data: {
			algorithm: Algorithm.NearestNeighbour,
			tour: {
				distance: tour.distance,
				path: [...tour.path, tour.path[0]].map((i) => cities[i])
			}
		}
	});
};
