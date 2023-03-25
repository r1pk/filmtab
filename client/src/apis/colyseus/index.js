import ColyseusClient from './ColyseusClient';

export const colyseus = new ColyseusClient(import.meta.env.VITE_COLYSEUS_URL);
