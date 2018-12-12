'use strict';

import { GraphicsManager } from './graphicsManager';
import { InputManager } from './inputManager';
import { DelayTimer } from './delayTimer';
import { SoundTimer } from './soundTimer';
import { MemoryManager } from './memoryManager';
import { Cpu } from './cpu';

export function Chip8Emulator()
{
    let _clockFrequency = 1760000;
    let _framesPerSecond = 60;
    let _clockCyclesPerUpdate = _clockFrequency/_framesPerSecond;
    let _graphicsManager = new GraphicsManager(_framesPerSecond,_clockFrequency,64,32);
    let _inputManager = new InputManager(1000,_clockFrequency);
    let _delayTimer = new DelayTimer(60,_clockFrequency);
    let _soundTimer = new SoundTimer(60,_clockFrequency);
    let _memoryManager = new MemoryManager(4096);
    let _cpu = new Cpu(_graphicsManager,_memoryManager,_inputManager,_delayTimer,_soundTimer);
    let _timerId;

    Object.defineProperty(HardwareInterface.prototype,'clockFrequency',{
        get:function()
        {
            return _clockFrequency;
        }
    });

    this.initialize = function()
    {
        _graphicsManager.initialize();
        _inputManager.initialize();
        _delayTimer.initialize();
        _soundTimer.initialize();
        _memoryManger.initialize();
        _cpu.initialize();
    }
    
    this.reset = function()
    {
        _graphicsManager.reset();
        _inputManager.reset();
        _delayTimer.reset();
        _soundTimer.reset();
        _cpu.reset();    
    }

    this.start = function()
    {
        _timerId = setInterval(update,16);
    }

    this.stop = function()
    {
        clearInterval(_timerId);
    }

    function update()
    {
        for(var cycle=0;cycle<_clockCyclesPerUpdate;cycle++)
        {
            _graphicsManager.update(1);
            _inputManager.update(1);
            _delayTimer.update(1);
            _soundTimer.update(1);
            _cpu.update(1);
        }
    }
}

