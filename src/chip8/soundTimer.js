'use strict';

export function SoundTimer(audioRenderer){
    let _register;
    let _audioRenderer = audioRenderer;
    let _active;

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
        _active=false;
    }

    this.reset = function(){
        _register[0] = 0;
        if(_active){
            _audioRenderer.stopBeepSound();
        }
        _active = false;
    }

    this.update= function(){
        if(!_active && _register[0] > 0){
            _active=true;
            _register[0]--;
            _audioRenderer.startBeepSound();
        }
        else{
            if(_register[0]>0){
                _register[0]--;
            }
            if(_active && _register[0]===0){
                _active = false;
                _audioRenderer.stopBeepSound();
            }      
        }
    }
}

Object.seal(SoundTimer);