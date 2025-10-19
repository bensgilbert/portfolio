import { SvelteMap } from 'svelte/reactivity';
import { Algorithm } from './algorithm';
import { MessageType } from './worker';
import Worker from './worker?worker';

const MAX_CITIES_LENGTH = 256;

export interface City {
	x: number;
	y: number;
}

export interface Tour {
	distance: number;
	path: City[];
}

type State = {
	addCity: (x: number, y: number) => void;
	algorithm: Algorithm;
	algorithmCache: Map<Algorithm, Tour>;
	cities: City[];
	grid: boolean;
	worker?: Worker;
	progress?: number;
};

const state: State = $state({
	addCity(x, y) {
		if (this.cities.length < MAX_CITIES_LENGTH) {
			this.cities.push({ x, y });
		}
	},
	algorithm: Algorithm.BruteForce,
	algorithmCache: new SvelteMap(),
	cities: [] as City[],
	grid: false
});

export function play() {
	if (state.cities.length < 3) return;
	if (state.algorithmCache.has(state.algorithm)) return;

	state.worker = new Worker();
	state.progress = 0;

	state.worker.onmessage = (event) => {
		const message = event.data;

		if (message.type == MessageType.Complete) {
			state.worker = undefined;
			state.algorithmCache.set(message.data.algorithm, message.data.tour);
		}
		if (message.type == MessageType.Progress) {
			state.progress = message.data.progress;
		}
	};

	state.worker.postMessage({
		algorithm: state.algorithm,
		cities: $state.snapshot(state.cities)
	});
}

export function stop() {
	state.worker?.terminate();
	state.worker = undefined;
}

export default state;
