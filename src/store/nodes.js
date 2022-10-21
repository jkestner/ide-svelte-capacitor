import { writable, readable, derived } from "svelte/store";

  //todo: these are dummies. replace nodes with simulated nodes.

  class Node {
    constructor(name) {
        this.name = name;
        this.sensorPollingRate = 1; // in seconds
        this.sensors = [];
        this.log = [];

        this.addSensor("temperature");       
        this.addSensor("light");       
        this.addSensor("humidity");       
        this.addSensor("battery");     
    }

    simulate() {
      this.sensors.forEach(s => {
        s.value += Math.floor((Math.random() -.5) * 10);
      })
      // setTimeout(this.simulate.bind(this), this.sensorPollingRate*1000);
    }

    addSensor(name) {
      this.sensors.push({
        name: name,
        value: Math.floor(Math.random()*400+100)*10,
        inputClass: "GPInput" //use this to dynamically load appropriate UI such as constraints for the possible values (i.e. slider with range)
      })
    }
}

export const nodes = writable([ new Node("Garden SW"), new Node("Garden NW"), new Node("Coop"), new Node("Tank")]);

setInterval(() => {
  nodes.update(current => {
    current.forEach(node => node.simulate());
    return current;
  });
}, 1000);
