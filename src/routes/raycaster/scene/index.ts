import type p5 from 'p5';
import type { Camera } from '../Camera';

export interface Hierarchy {
	update: () => void;
	cast: (camera: Camera, ray: Ray) => Hit[];
	draw: (size: number) => void;
}

export interface Ray {
	pos: p5.Vector;
	dir: p5.Vector;
}

export interface Hit {
	angle: number;
	distance: number;
	draw: (size: number, x: number) => void;
	pos: {
		x: number;
		y: number;
	};
	uv: number;
}

export interface SceneObject {
	update?: () => void;
	cast: (camera: Camera, ray: Ray) => Hit | undefined;
	draw?: (size: number) => void;
}
