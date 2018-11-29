import { GraphicsManager } from './graphicsManager';
import { InputManager } from './inputManager';
import { DelayTimer } from './delayTimer';
import { SoundTimer } from './soundTimer';
import { MemoryManager } from './memoryManager';


let _clockFrequency = 1760000; //COSMIC VIP had a 1.76MHz processor
let _updateFrequency = 60;
let _clockCyclesPerUpdate = _clockFrequency/_updateFrequency;
let _graphicsManager = new GraphicsManager(60,_clockFrequency,64,32);
let _inputManager = new InputManager(1000,_clockFrequency);
let _delayTimer = new DelayTimer(60,_clockFrequency);
let _soundTimer = new SoundTimer(60,_clockFrequency);
let _memoryManager = new MemoryManager(4096);

_graphicsManager.initialize();
_graphicsManager.drawPixel(63,0,0xF0);
_graphicsManager.refresh();

//_graphicsManager.drawPixel(1,1,false);
_soundTimer.initialize();

//60Hz 16.6ms
//_graphicsManager.draw();
setInterval(main,16);

function main()
{
    for(var cycle=0;cycle<_clockCyclesPerUpdate;cycle++)
    {
        //_graphicsManager.update(1);
    }
}
