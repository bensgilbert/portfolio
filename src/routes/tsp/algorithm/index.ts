import type { City } from '../state.svelte';
import bruteForce from './brute-force';
import globalGreedy from './global-greedy';
import nearestNeighbour from './nearest-neighbour';

export const enum Algorithm {
	BruteForce,
	GlobalGreedy,
	NearestNeighbour
}

export const algorithmMap = new Map<Algorithm, (cities: City[]) => void>([
	[Algorithm.BruteForce, bruteForce],
	[Algorithm.GlobalGreedy, globalGreedy],
	[Algorithm.NearestNeighbour, nearestNeighbour]
]);
