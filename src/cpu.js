export function Cpu(graphicsManager,memoryManger,inputManager,delayTimer,soundTimer)
{
    var _graphicsManager=graphicsManager;
    var _memoryManager=memoryManger;
    var _inputManager=inputManager;
    var _delayTimer=delayTimer;
    var _soundTimer=soundTimer;
    var _generalRegisters;
    var _indexRegister;
    var _pc;
    var _sp;
    var _stack;

    this.initialize = function()
    {
        _generalRegisters = new Uint8Array(16);
        _indexRegister = new Uint16Array(1);
        _pc = new Uint16Array(1);
        _sp = new Uint8Array(1);
        _stack = new Uint16Array(16);
    }

    this.reset = function()
    {
        this.initialize();
        _pc[0]=0x200;
        _sp[0]=0;
    }

    function jump(opcode)
    {
        _pc[0]=0xFFF&opcode;
    }

    function call(opcode)
    {
        _sp[0]++;
        _stack[_sp[0]]=_pc[0];
        _pc[0]=0xFFF & opcode;
    }

    function skipEqualVxByte(opcode)
    {
        if(_generalRegisters[(opcode & 0xF00)>>8]===(opcode&0xFF))
        {
            _pc[0]+=4;
        }
        else
        {
            _pc[0]+=2;
        }
    }

    function skipNotEqualVxByte(opcode)
    {
        if(_generalRegisters[(opcode & 0xF00)>>8]!==(opcode&0xFF))
        {
            _pc[0]+=4;
        }
        else
        {
            _pc[0]+=2;
        }
    }

    function skipEqualVxVy(opcode)
    {
        if(_generalRegisters[(opcode & 0xF00)>>8] === _generalRegisters[(opcode & 0xF0)>>4])
        {
            _pc[0]+=4;
        }
        else
        {
            _pc[0]+=2;
        }
    }

    function loadVxByte(opcode)
    {
        _generalRegisters[(0xF00&opcode)>>8]=opcode&0xFF;
        pc[0]+=2;
    }

    function addVxByte(opcode)
    {
        _generalRegisters[(opcode&0xF00)>>8]+=opcode&0xFF;
        pc[0]+=2;
    }

    function loadVxVy(opcode)
    {
        _generalRegisters[(opcode&0xF00)>>8]=(opcode&0xF0)>>4;
        pc[0]+=2;
    }

    function orVxVy(opcode)
    {
        _generalRegisters[(opcode&0xF00)>>8]|=(opcode&0xF0)>>4;
        pc[0]+=2;
    }

    function andVxVy(opcode)
    {
        _generalRegisters[(opcode&0xF00)>>8]&=(opcode&0xF0)>>4;
        pc[0]+=2;
    }

    function xorVxVy(opcode)
    {
        _generalRegisters[(opcode&0xF00)>>8]^=(opcode&0xF0)>>4;
        pc[0]+=2;
    }

    function addVxVy(opcode)
    {
        let vx = (opcode&0xF00)>>8;
        let vy = (opcode&0xF0)>>4;
        let sum = _generalRegisters[vx]+_generalRegisters[vy];
        _generalRegisters[0xF]=sum>255?1:0;
        _generalRegisters[vx]=sum;
        pc[0]+=2;
    }

    function subtractVxVy(opcode)
    {
        let vx = (opcode&0xF00)>>8;
        let vy = (opcode&0xF0)>>4;
        let difference = _generalRegisters[vx]>_generalRegisters[vy];
        _generalRegisters[0xF]=_generalRegisters[vx]>_generalRegisters[vy]?1:0;
        _generalRegisters[vx]=difference;
        pc[0]+=2;
    }

    function shiftRightVx(opcode)
    {
        _generalRegisters[0xF]=_generalRegisters[(opcode&0xF00)>>8]&0x1;
        _generalRegisters[(opcode&0xF00)>>8]>>1;
        pc[0]+=2;
    }

    function subtractVyVx(opcode)
    {
        let vx = (opcode&0xF00)>>8;
        let vy = (opcode&0xF0)>>4;
        _generalRegisters[0xF]=_generalRegisters[vy]>_generalRegisters[vx]?0:1;
        let difference = _generalRegisters[vy]-_generalRegisters[vx];
        _generalRegisters[vx]=difference;
        pc[0]+=2;
    }

    function shiftLeftVx(opcode)
    {
        let vx = (opcode&0xF00)>>8;
        _generalRegisters[0xF]=(_generalRegisters[vx]&0x80)>>7;
        _generalRegisters[vx]<<1;
        pc[0]+=2;
    }

    function skipNextEqualVx(opcode)
    {
        if(_generalRegisters[(opcode&0xF00)>>8]!==_generalRegisters[(opcode&0xF0)>>4])
        {
            _pc[0]+=4;
        }
        else
        {
            _pc[0]+=2;
        }
    }

    function loadIndexAddress(opcode)
    {
        _indexRegister[0]=opcode&0xFFF;
        pc[0]+=2;
    }

    function jumpV0Address(opcode)
    {
        _pc[0]+=(opcode&0xFFF)+_generalRegisters[0];
    }

    function randomVx(opcode)
    {
        let value = opcode && 0xFF;
        let randomNumber=Math.floor(Math.random() * Math.floor(256));
        _generalRegisters[(opcode & 0xF00)>>8]=value&randomNumber;
        pc[0]+=2;
    }

    
}