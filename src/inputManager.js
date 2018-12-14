'use strict';

export function InputManager(pollingFrequency=1000,clockFrequency,keyboardHandler)
{
    const _keyboardHandler = keyboardHandler;
    let _clockFrequency = clockFrequency;
    let _pollingFrequency = pollingFrequency;
    let _cyclesPerUpdate = clockFrequency/pollingFrequency;
    let _clockCyclesCount;
    let _keyBuffer;
    let _register;
    
    Object.defineProperty(this,'cyclesPerUpdate',{
        get:function()
        {
            return _cyclesPerUpdate;
        }
    });

    Object.defineProperty(this,'register',{
        get:function()
        {
            return _register;
        }
    });

    Object.defineProperty(this,'clockFrequency',{
        get:function()
        {
            return _clockFrequency;
        },
        set:function(value)
        {
            _clockFrequency=value;
            _cyclesPerUpdate = _clockFrequency/_pollingFrequency;
        }
    })

    Object.defineProperty(this,'pollingFrequency',{
        get:function()
        {
            return _pollingFrequency;
        },
        set:function(value)
        {
            _pollingFrequency=value;
            _cyclesPerUpdate = _clockFrequency/_pollingFrequency;
        }
    });

    this.initialize = function()
    {
        _clockCyclesCount=0;
        _keyBuffer=0;
        _register=0;
        _keyboardHandler.registerKeyDownCallback(onKeyPressDown);
        _keyboardHandler.registerKeyUpCallback(onKeyPressUp);
    }

    this.reset=function()
    {
        _clockCyclesCount=0;
        _keyBuffer = 0;
        _register = 0;
    }

    this.update=function(cyclesToProcess)
    {
        _cyclesProcessed += cyclesToProcess;
        
        while(_cyclesProcessed >= _cyclesPerUpdate)
        {
            _register = _keyBuffer;
            _cyclesProcessed-=_cyclesPerUpdate;
        }

        _clockCyclesCount+=cyclesToProcess;
    }

    function onKeyPressDown(event)
    {
        let keyValue = _keyMap.get(event.keyCode);
        if(keyValue !== undefined)
        {
            _keyBuffer|=(1<<keyValue)&0xFFFF;
        }
    }
    
    function onKeyPressUp(event)
    {
        let keyValue = _keyMap.get(event.keyCode);
        if(keyValue !== undefined)
        {
            _keyBuffer&=(~(1<<keyValue))&0xFFFF;
        }
    }
}









