'use strict';

export function InputManager(keyboardHandler,clockFrequency,pollingFrequency=1000)
{
    const _keyboardHandler = keyboardHandler;
    let _clockFrequency = clockFrequency;
    let _pollingFrequency = pollingFrequency;
    let _cyclesPerUpdate;
    let _cyclesProcessed;
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
            _cyclesPerUpdate = calculateCyclesPerUpdate();
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
            _cyclesPerUpdate = calculateCyclesPerUpdate();
        }
    });

    Object.defineProperty(this,'cyclesProcessed',{
        get:function()
        {
            return _cyclesProcessed;
        }
    });

    this.initialize = function()
    {
        _cyclesProcessed=0;
        _keyBuffer=0;
        _register=0;
        _cyclesPerUpdate = calculateCyclesPerUpdate();
        _keyboardHandler.registerKeyDownCallback(onKeyPressDown);
        _keyboardHandler.registerKeyUpCallback(onKeyPressUp);
    }

    this.reset=function()
    {
        _cyclesProcessed=0;
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
    }

    function onKeyPressDown(action)
    {    
        let keyValue = action;
    
        if(keyValue !== undefined)
        {
            _keyBuffer|=(1<<keyValue)&0xFFFF;
        }
    }
    
    function onKeyPressUp(action)
    {
        let keyValue = action;

        if(keyValue !== undefined)
        {
            _keyBuffer&=(~(1<<keyValue))&0xFFFF;
        }
    }

    function calculateCyclesPerUpdate()
    {
        return Math.floor(_clockFrequency/_pollingFrequency);
    }    
}

Object.seal(InputManager);