import InputManager from './input';
import input from './input';

let _clockFrequency = 1760000; //COSMIC VIP had a 1.76MHz processor

let inputManager = new InputManager(1000,_clockFrequency);
inputManager.log();
