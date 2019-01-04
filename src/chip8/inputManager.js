'use strict';

export function InputManager(keyboardHandler){
    const _keyboardHandler = keyboardHandler;
    let _keyBuffer
    let _register;

    Object.defineProperty(this,'register',{
        get:function(){
            return _register;
        }
    });

    this.initialize = function(){
        _register=0;
        _keyBuffer=0;
        _keyboardHandler.registerKeyDownCallback(onKeyPressDown);
        _keyboardHandler.registerKeyUpCallback(onKeyPressUp);
    }

    this.reset=function(){
        _keyBuffer=0;
        _register=0;
    }

    this.update=function(){ 
        _register=_keyBuffer;  
    }

    function onKeyPressDown(action){    
        if(action !== undefined) {
            _keyBuffer^=1<<action;
        }
    }
    
    function onKeyPressUp(action){
        if(action !== undefined)  {
            _keyBuffer^=1<<action;
        }
    }
}
Object.seal(InputManager);