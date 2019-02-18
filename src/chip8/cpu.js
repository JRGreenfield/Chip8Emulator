'use strict';

export function Cpu(graphicsManager,memoryManger,inputManager,delayTimer,soundTimer,pcStartAddress,randomNumberGenerator,stackSize)
{
    let _graphicsManager=graphicsManager;
    let _memoryManager=memoryManger;
    let _inputManager=inputManager;
    let _delayTimer=delayTimer;
    let _soundTimer=soundTimer;
    let _randomNumberGenerator = randomNumberGenerator;
    let _generalRegisters;
    let _indexRegister;
    let _pc;
    let _sp;
    let _stack;
    let _stackSize=stackSize;;
    let _pcStartAddress=pcStartAddress;
    let _keyDownCode;
    let _opcode;
 
    for(let index=0;index<=0xF;index++){
        Object.defineProperty(this,'v'+Math.abs(index).toString(16),{
            get:function() {
                return _generalRegisters[index];
            }
        });
    }
    for(let index=0;index<_stackSize;index++){
        Object.defineProperty(this,'s'+Math.abs(index).toString(16),{
            get:function(){
                return _stack[index];
            }
        });
    }
    Object.defineProperty(this,'generalRegisters',{
        get:function(){
            return _generalRegisters.slice();
        }
    })
    Object.defineProperty(this,'stack',{
        get:function(){
            return _stack.slice();
        }
    })
    Object.defineProperty(this,'i',{
        get:function(){
            return _indexRegister[0];
        }
    });
    Object.defineProperty(this,'pc',{
        get:function(){
            return _pc[0];
        }
    });
    Object.defineProperty(this,'sp',{
        get:function(){
            return _sp[0];
        }
    });
    Object.defineProperty(this,'opcode',{
        get:function(){
            return _opcode;
        }
    });

    this.initialize = function()
    {
        _generalRegisters = new Uint8Array(16);
        _indexRegister = new Uint16Array(1);
        _pc = new Uint16Array(1);
        _sp = new Uint8Array(1);
        _stack = new Uint16Array(_stackSize);
        _pc[0]=_pcStartAddress;
        _keyDownCode = null;
        _opcode=null
    }

    this.reset = function(){
        _pc[0]=_pcStartAddress;
        _sp[0]=0;
        _indexRegister[0]=0;
        _keyDownCode = null;
        _opcode=null
        for(let index=0;index<=0xF;index++){
            _generalRegisters[index]=0;
        }
        for(let index=0;index<stackSize;index++){
            _stack[index]=0;
        }
    }

    this.update = function(){       
        _opcode = _memoryManager.readWord(_pc[0]);
        execute(_opcode);
      
    }

    function execute(opcode){
        switch(opcode&0xF000){
            case 0x0:
                switch(opcode&0xFF){
                    case 0xE0:
                        cls(opcode);
                        break;
                    case 0xEE:
                        ret(opcode);
                        break;
                    default:
                        throw new ReferenceError("cpu:execute - invalid opcode");
                }
                break;
            case 0x1000:
                jp(opcode);
                break;
            case 0x2000:
                call(opcode);
                break;
            case 0x3000:
                seVxNN(opcode);
                break;
            case 0x4000:
                sneVxNN(opcode);
                break;
            case 0x5000:
                seVxVy(opcode);
                break;
            case 0x6000:
                ldVxNN(opcode)
                break;
            case 0x7000:
                addVxNN(opcode);
                break;
            case 0x8000:
                switch(opcode&0xF){
                    case 0:
                        ldVxVy(opcode);
                        break;
                    case 1:
                        orVxVy(opcode);
                        break;
                    case 2:
                        andVxVy(opcode);
                        break;
                    case 3:
                        xorVxVy(opcode);
                        break;
                    case 4:
                        addVxVy(opcode);
                        break;
                    case 5:
                        subVxVy(opcode);
                        break;
                    case 6:
                        shrVx(opcode);
                        break;
                    case 7:
                        subnVxVy(opcode);
                        break;
                    case 0xE:
                        shlVx(opcode);
                        break;
                    default:
                        throw new ReferenceError("cpu:execute - invalid opcode");
                }
                break;
            case 0x9000:
                sneVxVy(opcode);
                break;
            case 0xA000:
                ldINNN(opcode);
                break;
            case 0xB000:
                jpV0NNN(opcode);
                break;
            case 0xC000:
                rndVxN(opcode);
                break;
            case 0xD000:
                drwVxVyN(opcode);
                break;
            case 0xE000:
                switch(opcode&0xFF) {
                    case 0x9E:
                        skpVx(opcode);
                         break;
                    case 0xA1:
                        sknpVx(opcode);
                        break; 
                    default:
                        throw new ReferenceError("cpu:execute - invalid opcode");
                }
                break;
            case 0xF000:
                switch(opcode&0xFF) {
                    case 0x7:
                        ldVxDT(opcode);
                        break;
                    case 0xA:
                        ldVxN(opcode);
                        break;
                    case 0x15:
                        ldDTVx(opcode);
                        break;
                    case 0x18:
                        ldSTVx(opcode);
                        break;
                    case 0x1E:
                        addIVx(opcode);
                        break;
                    case 0x29:
                        ldFVx(opcode);
                        break;
                    case 0x33:
                        ldBCDIVx(opcode);
                        break;
                    case 0x55:
                        ldIV0Vx(opcode);
                        break;
                    case 0x65:
                        ldVxI(opcode);
                        break;
                    default:
                        throw new ReferenceError("cpu:execute - invalid opcode");
                }
                break;
            default:
                throw new ReferenceError("cpu:execute - invalid opcode");
        }
    }

    //00E0
    function cls(opcode) {
        _graphicsManager.clearScreen();
        _pc[0]+=2;
    }
    //00EE 
    function ret(opcode){_pc[0]=_stack[_sp[0]--];}
    //1nnn 
    function jp(opcode) {
        _pc[0]=0xFFF&opcode;
    }
    //2nnn
    function call(opcode){       
        _sp[0]++;
        _stack[_sp[0]]=_pc[0]+2;
        _pc[0]=0xFFF & opcode;
    }
    //3xkk
    function seVxNN(opcode) {
        if(_generalRegisters[(opcode & 0xF00)>>8]===(opcode&0xFF)){
            _pc[0]+=4;
        }else{
            _pc[0]+=2;
        }
    }
    //4xkk
    function sneVxNN(opcode) {
        if(_generalRegisters[(opcode & 0xF00)>>8]!==(opcode&0xFF)){
            _pc[0]+=4;
        }else {
            _pc[0]+=2;
        }
    }
    //5xy0
    function seVxVy(opcode) {
        if(_generalRegisters[(opcode & 0xF00)>>8] === _generalRegisters[(opcode & 0xF0)>>4]){
            _pc[0]+=4;
        }else {
            _pc[0]+=2;
        }
    }
    //6xkk 
    function ldVxNN(opcode){
        _generalRegisters[(0xF00&opcode)>>8]=opcode&0xFF;
        _pc[0]+=2;
    }
    //7xkk 
    function addVxNN(opcode){
        _generalRegisters[(opcode&0xF00)>>8]+=opcode&0xFF;
        _pc[0]+=2;
    }
    //8xy0
    function ldVxVy(opcode){
        _generalRegisters[(opcode&0xF00)>>8]=_generalRegisters[(opcode&0xF0)>>4];
        _pc[0]+=2;
    }
    //8xy1 
    function orVxVy(opcode){
        _generalRegisters[(opcode&0xF00)>>8]|=_generalRegisters[(opcode&0xF0)>>4];
        _pc[0]+=2;
    }
    //8xy2 
    function andVxVy(opcode){
        _generalRegisters[(opcode&0xF00)>>8]&=_generalRegisters[(opcode&0xF0)>>4];
        _pc[0]+=2;
    }
    //8xy3
    function xorVxVy(opcode){
        _generalRegisters[(opcode&0xF00)>>8]^=_generalRegisters[(opcode&0xF0)>>4];
        _pc[0]+=2;
    }
    //8xy4
    function addVxVy(opcode){
        _generalRegisters[0xF]=_generalRegisters[(opcode&0xF0)>>4] > (0xFF - _generalRegisters[(opcode&0xF00)>>8]);
        _generalRegisters[(opcode&0xF00)>>8]+=_generalRegisters[(opcode&0xF0)>>4];
        _pc[0]+=2;
    }
    //8xy5 
    function subVxVy(opcode){
        _generalRegisters[0xF]=0;
        if(_generalRegisters[(opcode&0xF00)>>8]>_generalRegisters[(opcode&0xF0)>>4]){
            _generalRegisters[0xF]=1;
        }
        _generalRegisters[(opcode&0xF00)>>8]-=_generalRegisters[(opcode&0xF0)>>4];
        _pc[0]+=2;
    }
    //8xy6 
    function shrVx(opcode){
        _generalRegisters[0xF]=_generalRegisters[(opcode&0xF00)>>8]&0x1;
        _generalRegisters[(opcode&0xF00)>>8]>>=1;
        _pc[0]+=2;
    }
    //8xy7 
    function subnVxVy(opcode){
        _generalRegisters[0xF]=_generalRegisters[(opcode&0xF00)>>8]>_generalRegisters[(opcode&0xF0)>>4]?0:1;
        _generalRegisters[(opcode&0xF00)>>8]=_generalRegisters[(opcode&0xF0)>>4]-_generalRegisters[(opcode&0xF00)>>8];
        _pc[0]+=2;
    }
    //8xyE
    function shlVx(opcode){
        _generalRegisters[0xF]=_generalRegisters[(opcode&0xF00)>>8]>>7;
        _generalRegisters[(opcode&0xF00)>>8]<<=1;
        _pc[0]+=2;
    }
    //9xy0 
    function sneVxVy(opcode){
        if(_generalRegisters[(opcode&0xF00)>>8]!==_generalRegisters[(opcode&0xF0)>>4]){
            _pc[0]+=2;
        }
        _pc[0]+=2;    
    }
    //Annn 
    function ldINNN(opcode){
        _indexRegister[0]=opcode&0xFFF;
        _pc[0]+=2;
    }
    //Bnnn 
    function jpV0NNN(opcode){
        _pc[0]= (opcode&0xFFF) + _generalRegisters[0];
    }
    //Cnnn
    function rndVxN(opcode) {
        _generalRegisters[(opcode & 0xF00)>>8]=(opcode&0xFF)&_randomNumberGenerator.getRandomInteger(0,255);
        _pc[0]+=2;
    }
    //Dxyn 
    function drwVxVyN(opcode) {
        _generalRegisters[0xF]=0;
        let xStart = _generalRegisters[(opcode&0xF00)>>8];
        let yStart = _generalRegisters[(opcode&0xF0)>>4];
        let height = opcode & 0xF;
        for(let rowIndex=0;rowIndex<height;rowIndex++){
            let byte = _memoryManager.readByte(_indexRegister[0]+rowIndex);
            if(_graphicsManager.drawPixelByte(xStart,yStart+rowIndex,byte)){
                _generalRegisters[0xf]=1;
            }
        }
        _graphicsManager.updateScreen();
        _pc[0]+=2;
    }
    //Ex9E 
    function skpVx(opcode)  {    
        if((1<<_generalRegisters[(opcode&0xF00)>>8])&_inputManager.register){
            _pc[0]+=2;
        }
        _pc[0]+=2;
    }
    //ExA1 
    function sknpVx(opcode) {
        if(!((1<<_generalRegisters[(opcode&0xF00)>>8])&_inputManager.register)) {
            _pc[0]+=2;
        }
        _pc[0]+=2;     
    }
    //Fx07 
    function ldVxDT(opcode){
        _generalRegisters[(opcode&0xF00)>>8]=_delayTimer.register;
        _pc[0]+=2;
    }
    //Fx0A 
    function ldVxN(opcode){
        //check to see if keypress has been detected
        if(_keyDownCode == null)
        {
           
            if(_inputManager.register){
            
                let register = _inputManager.register;
                let shiftIndex = 0;
                while(register !== 0){
                   register>>=1;
                   ++shiftIndex;
                }
                _keyDownCode = --shiftIndex;
            }
        }
        else
        {
            //wait for a keyup before processing
            let register = _inputManager.register;
            if((register & (1<<_keyDownCode))===0)
            {
                 _generalRegisters[(opcode&0xF00)>>8]=_keyDownCode;
                _pc[0]+=2;
                _keyDownCode=null;
            }
        }
    }
    //Fx15 
    function ldDTVx(opcode){
        _delayTimer.register=_generalRegisters[(opcode&0xF00)>>8];
        _pc[0]+=2;
    }
    //Fx18 
    function ldSTVx(opcode){
        _soundTimer.register=_generalRegisters[(opcode&0xF00)>>8];
        _pc[0]+=2;
    }
    //Fx1E 
    function addIVx(opcode){
        _indexRegister[0]+=_generalRegisters[(opcode&0xF00)>>8];
        _pc[0]+=2;
    }
    //Fx29 
    function ldFVx(opcode){
        _indexRegister[0]=_generalRegisters[(opcode&0xF00)>>8]*5;
        _pc[0]+=2;
    }
    //Fx33
    function ldBCDIVx(opcode){
        let value = _generalRegisters[(opcode & 0xF00)>>8];
        _memoryManager.writeByte(_indexRegister[0],Math.floor(value/100));
        _memoryManager.writeByte(_indexRegister[0]+1,Math.floor(value/10)%10);
        _memoryManager.writeByte(_indexRegister[0]+2,(value%100)%10);
        _pc[0]+=2;
    }
    //Fx55
    function ldIV0Vx(opcode){
        for(let i = 0; i <= (opcode & 0xF00)>>8;i++){
            _memoryManager.writeByte(_indexRegister[0]+i,_generalRegisters[i]);
        }
        _pc[0]+=2;
    }
    //Fx65
    function ldVxI(opcode) {
        for(let i=0;i<=(opcode & 0xF00)>>8;i++){
            _generalRegisters[i]=_memoryManager.readByte(_indexRegister[0]+i);
        }
        _pc[0]+=2;
    }
}

Object.seal(Cpu);