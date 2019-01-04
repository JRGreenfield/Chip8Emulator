'use strict'

export function AudioRenderer()
{
    let _audioCtx;
    let _oscillator;
    let _gainNode;
    let _active;

    this.initialize = function()
    {
        _audioCtx = new AudioContext();
        _active=false;
        _oscillator = _audioCtx.createOscillator();
        _gainNode = _audioCtx.createGain();
        _gainNode.connect(_audioCtx.destination);
        _oscillator.type = "square";
        _oscillator.frequency.value = 800;
        _oscillator.start();
    }

    this.reset = function()
    {
        this.stopBeepSound();
    }

    this.startBeepSound=function()
    {
        if(!_active)
        {
            _oscillator.connect(_audioCtx.destination);
            _active = true;
        }    
    }

    this.stopBeepSound=function()
    {
        if(_active)
        {
            _oscillator.disconnect(_audioCtx.destination);
            _active=false;
        }
    }
}

Object.seal(AudioRenderer);