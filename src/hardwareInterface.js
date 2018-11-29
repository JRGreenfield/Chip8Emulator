import { GraphicsManager } from './graphicsManager';
import { InputManager } from './inputManager';
import { DelayTimer } from './delayTimer';
import { SoundTimer } from './soundTimer';
import { MemoryManager } from './memoryManager';
import { Cpu } from './cpu';


export function HardwareInterface()
{
    var _clockFrequency = 1760000; //COSMIC VIP had a 1.76MHz processor
    var _updateFrequency = 60;
    var _clockCyclesPerUpdate = _clockFrequency/_updateFrequency;
    var _graphicsManager = new GraphicsManager(60,_clockFrequency,64,32);
    var _inputManager = new InputManager(1000,_clockFrequency);
    var _delayTimer = new DelayTimer(60,_clockFrequency);
    var _soundTimer = new SoundTimer(60,_clockFrequency);
    var _memoryManger = new MemoryManager(4096);
    var _cpu = new Cpu(_graphicsManager,_memoryManger,_inputManager,_delayTimer,_soundTimer);

    this.initialize=function()
    {
        _graphicsManager.initialize();
        _inputManager.initialize();
        _delayTimer.initialize();
        _soundTimer.initialize();
        _memoryManger.initialize();
        _cpu.initialize();
    }
    
    this.reset=function()
    {
        _graphicsManager.reset();
        _inputManager.reset();
        _delayTimer.reset();
        _soundTimer.reset();
        _cpu.reset();    
    }

    this.update=function()
    {

    }
}