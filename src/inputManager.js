'use strict';

export function InputManager(pollingFrequency=1000,clockFrequency,keyboardHandler)
{
    const _keyboardHandler = keyboardHandler;
    let _clockFrequency = clockFrequency;
    let _pollingFrequency = pollingFrequency;
    let _cyclesPerUpdate = clockFrequency/pollingFrequency;
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
}