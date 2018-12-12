'use strict';

export function MockAudioRenderer()
{
    let _active = false;

    Object.defineProperty(this,'active',{
        get:function()
        {
            return _active;
        }
    })

    this.initialize = function()
    {

    }

    this.startBeepSound=function()
    {
       _active=true;
    }

    this.stopBeepSound=function()
    {
       _active=false;
    }
}