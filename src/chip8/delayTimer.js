'use strict';

export function DelayTimer()
{
    let _register;

    Object.defineProperty(this,'register',{
        get:function(){
            return _register[0];
        },
        set:function(value){
            _register[0]=value;
        }
    });

    this.initialize = function(){
        _register = new Uint8Array(1);
    }

    this.reset = function(){
        _register[0] = 0;
    }

    this.update= function(){  
        if(_register[0] > 0){
            _register[0]--;
        }
    }
}
Object.seal(DelayTimer);