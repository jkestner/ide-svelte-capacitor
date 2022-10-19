import { writable, readable, derived } from "svelte/store";

  //todo: these are dummies. replace nodes with simulated nodes.

export const nodes = writable([
    { id: "1", name: "Garden SW", temperature: 7200, humidity: 40, light: 4000 },
    { id: "2", name: "Garden NW", temperature: 5800, humidity: 41, light: 3800 },
    { id: "3", name: "Coop", temperature: 8200, humidity: 55, light: 500 },
    { id: "4", name: "Tank", temperature: 8200, humidity: 55, light: 500 },
  ]);

class Node {
    constructor(name) {
        this.name = name;
        this.sensorPollingRate = 0.1; // tenth of a second
        this.sensors = [
            {"temperature": 6300},
            {"light": 4000},
            {"humidity": 20},
            {"battery": "3.0V"}
        ] 
    }
}

