'use strict';

export function DelayTimer(pollingFrequency,clockFrequency)
{
    let _register;
    let _cyclesProcessed;
    let _cyclesPerUpdate;
    let _pollingFrequency=pollingFrequency;
    let _clockFrequency=clockFrequency;

    Object.defineProperty(this,'cyclesPerUpdate',{
        get:function()
        {
            return _cyclesPerUpdate;
        }
    });

    Object.defineProperty(this,'pollingFrequency',{
        get:function()
        {
            return _pollingFrequency;
        },
        set:function(value)
        {
            _pollingFrequency=value;
            _cyclesPerUpdate=_clockFrequency/_pollingFrequency;
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
            _cyclesPerUpdate=_clockFrequency/_pollingFrequency;
        }
    });

    Object.defineProperty(this,'register',{
        get:function()
        {
            return _register[0];
        },
        set:function(value)
        {
            _register[0]=value;
        }
    });

    this.initialize = function()
    {
        _register = new Uint8Array(1);
        _cyclesPerUpdate=_clockFrequency/_pollingFrequency;
        _cyclesProcessed=0;
    }

    this.reset = function()
    {
        _register[0] = 0;
        _cyclesProcessed=0;
    }

    this.update= function(cyclesToProcess)
    {
        _cyclesProcessed += cyclesToProcess;
        
        while(_cyclesProcessed >= _cyclesPerUpdate)
        {
            refresh();
            _cyclesProcessed-=_cyclesPerUpdate;
        }
    }

    function refresh()
    {
        if(_register[0] > 0)
        {
            _register[0]--;
        }
    }
}