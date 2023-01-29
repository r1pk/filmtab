import ColyseusClient from './lib/ColyseusClient';

export const colyseus = new ColyseusClient(import.meta.env.VITE_COLYSEUS_URL);
