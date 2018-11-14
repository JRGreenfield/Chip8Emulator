import GraphicsManager from './graphics';
import InputManager from './input';


let _clockFrequency = 1760000; //COSMIC VIP had a 1.76MHz processor
let _updateFrequency = 60;
let _clockCyclesPerUpdate = _clockFrequency/_updateFrequency;
let _graphicsManager = new GraphicsManager();
let _inputManager = new InputManager(1000,_clockFrequency);

//60Hz 16.6ms
_graphicsManager.initialize();
_graphicsManager.draw();
setInterval(main,16);

function main()
{
    for(var cycle=0;cycle<_clockCyclesPerUpdate;cycle++)
    {
        _inputManager.update(cycle);
    }
}
