let _pollingFrequency = 0;
let _clockFrequency = 0;
let _clockCyclesPerUpdate = 0;
let _clockCyclesCount = 0;
let _keyBuffer = 0;
let _inputRegister = 0;

let keyMap = new Map();
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

document.addEventListener('keydown',onKeyPressDown);
document.addEventListener('keyup',onKeyPressUp);

export default class 
{
    constructor(pollingFrequency,clockFrequency)
    {
        _pollingFrequency = pollingFrequency;
        _clockFrequency = clockFrequency;
        _clockCyclesPerUpdate = _clockFrequency/_pollingFrequency;
        _clockCyclesCount = 0;
    }

    get register()
    {
        return _inputRegister;
    }

    log()
    {
        console.log("input polling frequency: "+_pollingFrequency.toString()+"Hz");
        console.log("clock frequency: "+ _clockFrequency.toString()+"Hz");
        console.log("clock cycles per input update: "+_clockCyclesPerUpdate.toString());
        console.log("input clock cycle count: " + _clockCyclesCount.toString());
        console.log("input register: " + _inputRegister.toString());
    }

    mapKey(keyCode,action)
    {
        keyMap.set(keyCode,action);
    }

    reset()
    {
        _clockCyclesCount=0;
        _keyBuffer = 0;
        _inputRegister = 0;
    }

    update(clockCycles)
    {
        _clockCyclesCount+=clockCycles;

        if(_clockCyclesCount >= _clockCyclesPerUpdate)
        {
            _clockCyclesCount = 0;
            _inputRegister = _keyBuffer;
        }
    }
}

