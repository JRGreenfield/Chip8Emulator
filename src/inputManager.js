'use strict';

export function InputManager(clockFrequency,pollingFrequency=1000)
{
    let _clockFrequency = clockFrequency;
    let _pollingFrequency = pollingFrequency;
    let _clockCyclesPerUpdate = clockFrequency/pollingFrequency;
    let _clockCyclesCount;
    let _keyBuffer;
    let _register;
    let _keyMap;

    Object.defineProperty(InputManager.prototype,'register',{
        get:function()
        {
            return _register;
        }
    });

    Object.defineProperty(InputManager.clockFrequency,'clockFrequency',{
        get:function()
        {
            return _clockFrequency;
        },
        set:function(value)
        {
            _clockFrequency=value;
            _clockCyclesPerUpdate = _clockFrequency/_pollingFrequency;
        }
    })

    Object.defineProperty(InputManager.pollingFrequency,'pollingFrequency',{
        get:function()
        {
            return _pollingFrequency;
        },
        set:function(value)
        {
            _pollingFrequency=value;
            _clockCyclesPerUpdate = _clockFrequency/_pollingFrequency;
        }
    });

    this.initialize = function()
    {
        _clockCyclesCount=0;
        _keyBuffer=0;
        _register=0;
        _keyMap = new Map();
        _keyMap.set(49,1);
        _keyMap.set(50,2);
        _keyMap.set(51,3);
        _keyMap.set(52,0xC);
        _keyMap.set(81,4);
        _keyMap.set(87,5);
        _keyMap.set(69,6);
        _keyMap.set(82,0xD);
        _keyMap.set(65,7);
        _keyMap.set(83,8);
        _keyMap.set(68,9);
        _keyMap.set(70,0xE);
        _keyMap.set(90,0xA);
        _keyMap.set(88,0);
        _keyMap.set(67,0xB);
        _keyMap.set(86,0xF);

        document.addEventListener('keydown',onKeyPressDown);
        document.addEventListener('keyup',onKeyPressUp);
    }

    this.mapKey=function(keyCode,action)
    {
        _keyMap.set(keyCode,action);
    }

    this.reset=function()
    {
        _clockCyclesCount=0;
        _keyBuffer = 0;
        _register = 0;
    }

    this.update=function(cyclesToProcess)
    {
        _clockCyclesCount+=cyclesToProcess;

        if(_clockCyclesCount >= _clockCyclesPerUpdate)
        {
            _clockCyclesCount = 0;
            _register = _keyBuffer;
        }
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









