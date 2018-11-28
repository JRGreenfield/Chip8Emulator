export function SoundTimer(pollingFrequency,clockFrequency)
{
    var _register;
    var _cyclesProcessed;
    const _cyclesPerUpdate=clockFrequency/pollingFrequency;
    var _audioCtx;
    var _oscillator;
    var _gainNode;

    Object.defineProperty(SoundTimer.prototype,'register',{
        get:function()
        {
            return _register[0];
        },
        set:function(value)
        {
            _register[0]=value;

            if(_register[0]>0)
            {
                _oscillator.start();
            }
        }
    });

    this.initialize = function()
    {
        _register = new Uint8Array(1);
        _cyclesProcessed=0;
        
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
        _register[0] = 0;
        _cyclesProcessed=0;
        _oscillator.stop();
    }

    this.refresh = function()
    {
        if(_register[0] > 0)
        {
            _register[0]--;

            if(_register[0]===0)
            {
                _oscillator.stop();
            }
        }
    }

    this.update= function(cyclesToProcess)
    {
        _cyclesProcessed += cyclesToProcess;
        
        if(_cyclesProcessed >= _cyclesPerUpdate)
        {
            _cyclesProcessed = 0;
            this.refresh();
        }
    }

}