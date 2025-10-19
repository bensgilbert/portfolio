import type { City } from '../state.svelte';
import bruteForce from './brute-force';
import nearestNeighbour from './nearest-neighbour';

export const enum Algorithm {
	BruteForce,
	NearestNeighbour
}

export const algorithmMap = new Map<Algorithm, (cities: City[]) => void>([
	[Algorithm.BruteForce, bruteForce],
	[Algorithm.NearestNeighbour, nearestNeighbour]
]);
