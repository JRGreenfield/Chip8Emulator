'use strict';

export function KeyboardHandler()
{
    let _keyMap;
    let _keyDownCallbackMap;
    let _keyUpCallbackMap;
    
    this.initialize = function()
    {
        _keyMap = new Map();
        _keyDownCallbackMap = new Map();
        _keyUpCallbackMap = new Map();
        
        document.addEventListener('keydown',onKeyPressDown);
        document.addEventListener('keyup',onKeyPressUp);
    }

    this.mapKey=function(keyCode,action,repeatKeyDown=false,shiftRequired=false,altRequired=false,ctrlRequired=false)
    {
        _keyMap.set(keyCode,{action:action,repeatKeyDown:repeatKeyDown,shiftRequired:shiftRequired,altRequired:altRequired,ctrlRequired:ctrlRequired});
    }

    this.reset=function()
    {
        _keyMap = new Map();
        _keyDownCallbackMap = new Map();
        _keyUpCallbackMap = new Map();
    }

    this.registerKeyDownCallback=function(callback)
    {
        let callbackId = Symbol();
        _keyDownCallbackMap.set(callbackId,callback);
        return callbackId;
    }

    this.unregisterKeyDownCallback=function(callbackId)
    {
        if(_keyDownCallbackMap.has(callbackId))
        {
            _keyDownCallbackMap.delete(callbackId);
        }
    }

    this.registerKeyUpCallback=function(callback)
    {
        let callbackId = Symbol();
        _keyUpCallbackMap.set(callbackId,callback);
        return callbackId;
    }

    this.unregisterKeyUpCallback=function(callbackId)
    {
        if(_keyUpCallbackMap.has(callbackId))
        {
            _keyUpCallbackMap.delete(callbackId);
        }
    }

    function onKeyPressDown(event)
    {
        if(_keyMap.has(event.keyCode))
        {
            let value = _keyMap.get(event.keyCode);
            let keyDownRepeatCheck = !event.repeat || value.repeatKeyDown === event.repeat;
            //console.log(event);
            let shiftCheck = event.shiftKey === value.shiftRequired;
            let altCheck = event.altKey === value.altRequired;
            let ctrlCheck = event.ctrlKey === value.ctrlRequired;
            //console.log(shiftable&&repeatable);

            if(shiftCheck&&altCheck&&ctrlCheck&&keyDownRepeatCheck)
            {
                for(let callback of _keyDownCallbackMap.values())
                {
                    callback(_keyMap.get(event.keyCode));
                }
            }
            
        }
    }
    
    function onKeyPressUp(event)
    {
        if(_keyMap.has(event.keyCode))
        {
            let value = _keyMap.get(event.keyCode);
            let shiftCheck = event.shiftKey === value.shiftRequired;
            let altCheck = event.altKey === value.altRequired;
            let ctrlCheck = event.ctrlKey === value.ctrlRequired;

            if(shiftCheck&&altCheck&&ctrlCheck)
            {
                for(let callback of _keyUpCallbackMap.values())
                {
                    callback(_keyMap.get(event.keyCode));
                }
            }
        }
    }
}