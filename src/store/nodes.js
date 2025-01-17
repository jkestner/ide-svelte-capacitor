import { writable, readable, derived } from "svelte/store";

import GpInput from "@components/jorf/inputs/GPInput.svelte";
import TemperatureInput from "@components/jorf/inputs/TemperatureInput.svelte";
import SoundLevelInput from "@components/jorf/inputs/SoundLevelInput.svelte";
import ButtonInput from "@components/jorf/inputs/ButtonInput.svelte";
import LightInput from "@components/jorf/inputs/LightInput.svelte";
import BatteryInput from "@components/jorf/inputs/BatteryInput.svelte";
import HumidityInput from "@components/jorf/inputs/HumidityInput.svelte";

  //todo: these are dummies. replace nodes with simulated nodes.

  class Node {
    constructor(label, color="primary") {
        this.id = Math.floor(Math.random()*999);
        this.label = label;
        this.color = color;
        this.sensorPollingRate = 1; // in seconds
        this.sensors = [];
        this.actuators = [];
        this.log = [];
        this.lastUpdated = new Date();

        this.addSensor("Temperature", "temperature", TemperatureInput);
        this.addSensor("Light", "light", LightInput);       
        this.addSensor("Sound level", "sound", SoundLevelInput);       
        this.addSensor("Battery", "battery", BatteryInput);     
        this.addSensor("Button", "button", ButtonInput);     

        console.log(this.sensors);
        
        this.addActuator("led");
        this.addActuator("pin");
        if (Math.random() < .5)
          this.addActuator("relay");
    }

    simulate() {
      this.sensors.forEach(s => {
        s.value += Math.floor((Math.random() -.5) * 10);
      })
      this.lastUpdated = new Date();
      // setTimeout(this.simulate.bind(this), this.sensorPollingRate*1000);
    }

    addSensor(label, inputClass, component) {
      this.sensors.push({
        label: label,
        value: Math.floor(Math.random()*400+100)*10,
        inputClass: inputClass || label.toLowerCase(), //use this to dynamically load appropriate UI such as constraints for the possible values (i.e. slider with range)
        component: component || GpInput
      })
    }

    addActuator(label) {
      this.actuators.push({
        label: label,
        // value: Math.floor(Math.random()*400+100)*10,
        outputClass: "GPOutput" //use this to dynamically load appropriate UI such as constraints for the possible values (i.e. slider with range)
      })
    }
}

export const nodes = writable([ new Node("Garden SW"), new Node("Garden NW", "secondary"), new Node("Coop", "accent")]);

setInterval(() => {
  nodes.update(current => {
    current.forEach((node) => {
      //TODO: simulate dropout.
      // if (Math.random() < .5) return;

      node.simulate();
    });
    return current;
  });
}, 5000);
