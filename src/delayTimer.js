export function DelayTimer(pollingFrequency,clockFrequency)
{
    var _register;
    var _cyclesProcessed;
    const _cyclesPerUpdate=clockFrequency/pollingFrequency;

    Object.defineProperty(DelayTimer.prototype,'register',{
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
        _cyclesProcessed=0;
    }

    this.reset = function()
    {
        _register[0] = 0;
        _cyclesProcessed=0;
    }

    this.refresh = function()
    {
        if(_register[0] > 0)
        {
            _register[0]--;
        }
    }

    this.update= function(cyclesToProcess)
    {
        _cyclesProcessed += cyclesToProcess;
        
        if(_cyclesProcessed >= _cyclesPerUpdate)
        {
            _cyclesProcessed = 0;
            refresh();
        }
    }
}