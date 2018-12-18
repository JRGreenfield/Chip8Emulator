'use strict'

export function AudioRenderer()
{
    let _audioCtx;
    let _oscillator;
    let _gainNode;

    this.initialize = function()
    {
        _audioCtx = new AudioContext();
        _oscillator = _audioCtx.createOscillator();
        _gainNode = _audioCtx.createGain();

        _oscillator.connect(_gainNode);
        _gainNode.connect(_audioCtx.destination);

        _oscillator.type = "square";
        _oscillator.frequency.value = 800;
    }

    this.reset = function()
    {
        _oscillator.stop();
    }

    this.startBeepSound=function()
    {
        _oscillator.start();
    }

    this.stopBeepSound=function()
    {
        _oscillator.stop();
    }
}

Object.seal(AudioRenderer);