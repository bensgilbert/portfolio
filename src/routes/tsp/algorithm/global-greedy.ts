import { Algorithm } from '.';
import type { City } from '../state.svelte';
import { MessageType } from '../worker';

type Edge = {
	a: number;
	b: number;
	dist: number;
};

export default (cities: City[]): void => {
	const n = cities.length;

	const edges: Edge[] = [];
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			edges.push({
				a: i,
				b: j,
				dist: Math.hypot(cities[i].x - cities[j].x, cities[i].y - cities[j].y)
			});
		}
	}

	edges.sort((e1, e2) => e1.dist - e2.dist);

	const degree = new Array(n).fill(0);

	const parent = new Array(n).fill(0).map((_, i) => i);

	const find = (x: number): number => {
		if (parent[x] !== x) parent[x] = find(parent[x]);
		return parent[x];
	};

	const union = (a: number, b: number): void => {
		const ra = find(a);
		const rb = find(b);
		if (ra !== rb) parent[ra] = rb;
	};

	const selected: Edge[] = [];

	for (const edge of edges) {
		const { a, b } = edge;

		if (degree[a] >= 2 || degree[b] >= 2) continue;

		const ra = find(a);
		const rb = find(b);

		const createsCycle = ra === rb;

		if (createsCycle && selected.length !== n - 1) continue;

		selected.push(edge);
		degree[a]++;
		degree[b]++;
		union(a, b);

		if (selected.length === n) break;
	}

	const adjacency: number[][] = Array.from({ length: n }, () => []);

	for (const { a, b } of selected) {
		adjacency[a].push(b);
		adjacency[b].push(a);
	}

	const path: number[] = [];
	let current = 0;
	let prev = -1;

	for (let i = 0; i < n; i++) {
		path.push(current);
		const neighbors = adjacency[current];
		const next = neighbors[0] === prev ? neighbors[1] : neighbors[0];
		prev = current;
		current = next;
	}

	let distance = 0;
	for (let i = 0; i < n; i++) {
		const a = path[i];
		const b = path[(i + 1) % n];
		distance += Math.hypot(cities[a].x - cities[b].x, cities[a].y - cities[b].y);
	}

	postMessage({
		type: MessageType.Complete,
		data: {
			algorithm: Algorithm.GlobalGreedy,
			tour: {
				distance,
				path: [...path, path[0]].map((i) => cities[i])
			}
		}
	});
};
