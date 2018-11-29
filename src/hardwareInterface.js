import { GraphicsManager } from './graphicsManager';
import { InputManager } from './inputManager';
import { DelayTimer } from './delayTimer';
import { SoundTimer } from './soundTimer';
import { MemoryManager } from './memoryManager';
import { Cpu } from './cpu';

var _clockFrequency = 1760000; //COSMIC VIP had a 1.76MHz processor
var _updateFrequency = 60;
var _clockCyclesPerUpdate = _clockFrequency/_updateFrequency;
var _graphicsManager = new GraphicsManager(60,_clockFrequency,64,32);
var _inputManager = new InputManager(1000,_clockFrequency);
var _delayTimer = new DelayTimer(60,_clockFrequency);
var _soundTimer = new SoundTimer(60,_clockFrequency);
var _memoryManager = new MemoryManager(4096);
var _cpu = new Cpu(_graphicsManager,_memoryManager,_inputManager,_delayTimer,_soundTimer);

export function HardwareInterface(graphicsManager,inputManager,delayTimer,soundTimer,memoryManager)
{
    Object.defineProperty(HardwareInterface.prototype,'clockFrequency',{
        get:function()
        {
            return _clockFrequency;
        }
    });

    Object.defineProperty(HardwareInterface.prototype,'graphicsManager',{
        get:function()
        {
            return _graphicsManager;
        }
    });

    Object.defineProperty(HardwareInterface.prototype,'inputManager',{
        get:function()
        {
            return _inputManager;
        }
    });

    Object.defineProperty(HardwareInterface.prototype,'delayTimer',{
        get:function()
        {
            return _delayTimer;
        }
    });

    Object.defineProperty(HardwareInterface.prototype,'soundTimer',{
        get:function()
        {
            return _soundTimer;
        }
    });

    Object.defineProperty(HardwareInterface.prototype,'memoryManager',{
        get:function()
        {
            return _memoryManager;
        }
    });

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

    this.update=function(cycles)
    {
        _graphicsManager.update(cycles);
        _inputManager.update(cycles);
        _delayTimer.update(cycles);
        _soundTimer.update(cycles);
        _cpu.update(cycles);
    }
}