import { writable, readable, derived } from "svelte/store";

  //todo: these are dummies. replace nodes with simulated nodes.

  class Node {
    constructor(label) {
        this.label = label;
        this.sensorPollingRate = 1; // in seconds
        this.sensors = [];
        this.log = [];
        this.lastUpdated = new Date();

        this.addSensor("temperature");       
        this.addSensor("light");       
        this.addSensor("humidity");       
        this.addSensor("battery");     
    }

    simulate() {
      this.sensors.forEach(s => {
        s.value += Math.floor((Math.random() -.5) * 10);
      })
      this.lastUpdated = new Date();
      // setTimeout(this.simulate.bind(this), this.sensorPollingRate*1000);
    }

    addSensor(label) {
      this.sensors.push({
        label: label,
        value: Math.floor(Math.random()*400+100)*10,
        inputClass: "GPInput" //use this to dynamically load appropriate UI such as constraints for the possible values (i.e. slider with range)
      })
    }
}

export const nodes = writable([ new Node("Garden SW"), new Node("Garden NW"), new Node("Coop"), new Node("Tank")]);

setInterval(() => {
  nodes.update(current => {
    current.forEach((node) => {
      //TODO: simulate dropout.
      // if (Math.random() < .5) return;

      node.simulate();
    });
    return current;
  });
}, 1000);
