import { Algorithm } from '.';
import type { City } from '../state.svelte';
import { MessageType } from '../worker';

// https://en.wikipedia.org/wiki/Heap%27s_algorithm
function* permutate<T>(A: T[]): Generator<T[]> {
	const c = new Array(A.length).fill(0);

	yield A.slice();

	let i = 1;
	while (i < A.length) {
		if (c[i] < i) {
			if (i % 2 == 0) {
				[A[0], A[i]] = [A[i], A[0]];
			} else {
				[A[c[i]], A[i]] = [A[i], A[c[i]]];
			}

			yield A.slice();

			c[i] += 1;
			i = 1;
		} else {
			c[i] = 0;
			i += 1;
		}
	}
}

export default (cities: City[]): void => {
	const distances = cities.map((outer) => cities.map((inner) => Math.hypot(outer.x - inner.x, outer.y - inner.y)));

	let j = 2;
	for (let i = 3; i < cities.length; i++) {
		j *= i;
	}

	let tour = {
		distance: Infinity,
		path: [] as number[]
	};

	let i = 0;
	let progress = 0;
	for (let permutation of permutate([...Array(cities.length).keys()].slice(1))) {
		permutation = [0, ...permutation, 0];

		const distance = permutation.reduce((sum, value, i) => sum + distances[value][permutation[i - 1]]);
		if (distance < tour.distance) {
			tour = {
				distance,
				path: permutation
			};
		}

		i += 1;
		if (Math.floor((i * 100) / j) > progress) {
			progress = Math.floor((i * 100) / j);
			postMessage({
				type: MessageType.Progress,
				data: {
					progress
				}
			});
		}
	}

	postMessage({
		type: MessageType.Complete,
		data: {
			algorithm: Algorithm.BruteForce,
			tour: {
				distance: tour.distance,
				path: tour.path.map((i) => cities[i])
			}
		}
	});
};
