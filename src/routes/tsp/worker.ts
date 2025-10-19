import { algorithmMap } from './algorithm';

export enum MessageType {
	Complete,
	Progress
}

onmessage = (event) => {
	const message = event.data;
	algorithmMap.get(message.algorithm)?.(message.cities);
};
