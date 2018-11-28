export function InputManager(pollingFrequency,clockFrequency)
{
    var _clockCyclesPerUpdate = clockFrequency/pollingFrequency;
    var _clockCyclesCount;
    var _keyBuffer;
    var _register;
    var _keyMap;

    Object.defineProperty(InputManager.prototype,'register',{
        get:function()
        {
            return _register;
        }
    });

    this.initialize = function()
    {
        _clockCyclesCount=0;
        _keyBuffer=0;
        _register=0;

        _keyMap = new Map();
        keyMap.set(49,1);
        keyMap.set(50,2);
        keyMap.set(51,3);
        keyMap.set(52,0xC);
        keyMap.set(81,4);
        keyMap.set(87,5);
        keyMap.set(69,6);
        keyMap.set(82,0xD);
        keyMap.set(65,7);
        keyMap.set(83,8);
        keyMap.set(68,9);
        keyMap.set(70,0xE);
        keyMap.set(90,0xA);
        keyMap.set(88,0);
        keyMap.set(67,0xB);
        keyMap.set(86,0xF);

        document.addEventListener('keydown',onKeyPressDown);
        document.addEventListener('keyup',onKeyPressUp);
    }

    this.mapKey=function(keyCode,action)
    {
        keyMap.set(keyCode,action);
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
        let keyValue = keyMap.get(event.keyCode);
        if(keyValue !== undefined)
        {
            _keyBuffer|=(1<<keyValue)&0xFFFF;
        }
    }
    
    function onKeyPressUp(event)
    {
        let keyValue = keyMap.get(event.keyCode);
        if(keyValue !== undefined)
        {
            _keyBuffer&=(~(1<<keyValue))&0xFFFF;
        }
    }
}









