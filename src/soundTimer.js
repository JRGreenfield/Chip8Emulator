'use strict';

export function SoundTimer(pollingFrequency=60,clockFrequency,audioRenderer)
{
    let _register;
    let _pollingFrequency=pollingFrequency;
    let _clockFrequency=clockFrequency;
    let _cyclesProcessed;
    let _cyclesPerUpdate;
    let _audioRenderer = audioRenderer;

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

    Object.defineProperty(this,'cyclesPerUpdate',{
        get:function()
        {
            return _cyclesPerUpdate;
        }
    });

    Object.defineProperty(this,'cyclesProcessed',{
        get:function()
        {
            return _cyclesProcessed;
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

            if(_register[0]>0)
            {
                _audioRenderer.startBeepSound();
            }
            else
            {
                _audioRenderer.stopBeepSound();
            }
        }
    });

    this.initialize = function()
    {
        _register = new Uint8Array(1);
        _cyclesProcessed=0;
        _cyclesPerUpdate=_clockFrequency/_pollingFrequency;
    }

    this.reset = function()
    {
        _register[0] = 0;
        _cyclesProcessed=0;
        _audioRenderer.stopBeepSound();
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

            if(_register[0]===0)
            {
                _audioRenderer.stopBeepSound();
            }
        }
    }

}