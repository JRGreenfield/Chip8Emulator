'use strict';

import test from 'ava';
import {MockHardwareInterface} from './mockHardwareInterface';


function checkRegisterValue(hardwareInterface,t,register,value)
{
    let descriptorValue = Object.getOwnPropertyDescriptor(hardwareInterface.cpu,'v'+register.toString(16)).get();
    t.is(descriptorValue,value); 
}

function defaultRegisterValueCheck(hardwareInterface,t,registersToSkip="")
{
    for(let index=0;index<=0xF;index++)
    {
        let registerValue = index.toString(16);
        if(!registersToSkip.includes(registerValue))
        {
            let descriptorValue = Object.getOwnPropertyDescriptor(hardwareInterface.cpu,'v'+registerValue).get();
            t.is(descriptorValue,0);
        }
    }
}

function defaultStackValueCheck(hardwareInterface,t,registersToSkip="")
{
    for(let index=0;index<=0xF;index++)
    {
        let stackIndex = index.toString(16);
        if(!registersToSkip.includes(stackIndex))
        {
            let descriptorValue = Object.getOwnPropertyDescriptor(hardwareInterface.cpu,'s'+stackIndex).get();
            t.is(descriptorValue,0);
        }
    }
}

test('initialization', t => {
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    t.is(_hardwareInterface.cpu.pc,0x200);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0)
    defaultRegisterValueCheck(_hardwareInterface,t);
    defaultStackValueCheck(_hardwareInterface,t);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
});

test ('RET 0x00EE',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x2202);
    _hardwareInterface.memoryManager.writeWord(0x202,0x00EE);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x200);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0)
    defaultRegisterValueCheck(_hardwareInterface,t);
    t.is(_hardwareInterface.cpu.s1,0x200);
    defaultStackValueCheck(_hardwareInterface,t,'1');
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
})

test('JP 0x1nnn',t =>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x1300);
    _hardwareInterface.update(1);
    t.is(_hardwareInterface.cpu.pc,0x300);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0)
    defaultRegisterValueCheck(_hardwareInterface,t);
    defaultStackValueCheck(_hardwareInterface,t);
});

test('CALL 0x2nnn',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x2300);
    _hardwareInterface.update(1);
    t.is(_hardwareInterface.cpu.pc,0x300);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.sp,1);
    t.is(_hardwareInterface.cpu.i,0)
    defaultRegisterValueCheck(_hardwareInterface,t);
    defaultStackValueCheck(_hardwareInterface,t,'1');
    t.is(_hardwareInterface.cpu.s1,0x200);
});

test('SE Vx,byte, 0x3xNN',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x60FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0x30FF);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x206);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.v0,0xFF);
    defaultRegisterValueCheck(_hardwareInterface,t,'0');
    defaultStackValueCheck(_hardwareInterface,t);
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
    _hardwareInterface.memoryManager.writeWord(0x206,0x6000);
    _hardwareInterface.memoryManager.writeWord(0x208,0x30FF);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.pc,0x20A);
});

test('SNE Vx,byte, 0x4xNN',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x60FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0x40FF);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x204);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.v0,0xFF);
    defaultRegisterValueCheck(_hardwareInterface,t,'0');
    defaultStackValueCheck(_hardwareInterface,t);
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
    _hardwareInterface.memoryManager.writeWord(0x204,0x6000);
    _hardwareInterface.memoryManager.writeWord(0x206,0x3000);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.pc,0x20A);
});

test('SE Vx,Vy, 0x5xy0',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x60FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0x6FFF);
    _hardwareInterface.memoryManager.writeWord(0x204,0x50F0);
    _hardwareInterface.update(7);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x208);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.v0,0xFF);
    t.is(_hardwareInterface.cpu.vf,0xFF);
    defaultRegisterValueCheck(_hardwareInterface,t,'0f');
    defaultStackValueCheck(_hardwareInterface,t);
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
    _hardwareInterface.memoryManager.writeWord(0x208,0x6000);
    _hardwareInterface.memoryManager.writeWord(0x20A,0x50F0);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.pc,0x20C);
});

test('LD Vx,NN 0x6xNN',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    var _pc=0x200;
    let _registersToSkip="";
    for(let index=0;index<=0xF;index++)
    {
        _hardwareInterface.memoryManager.writeWord(_pc,0x60FF+(index<<8));
        _hardwareInterface.update(1);
        _pc+=2;
        _registersToSkip+=index.toString(16);
        t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
        checkRegisterValue(_hardwareInterface,t,index,0xFF);
        defaultRegisterValueCheck(_hardwareInterface,t,_registersToSkip);
        defaultStackValueCheck(_hardwareInterface,t);
        t.is(_hardwareInterface.cpu.pc,_pc);
        t.is(_hardwareInterface.cpu.sp,0);
        t.is(_hardwareInterface.cpu.i,0)
        _hardwareInterface.update(2);
        t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
    }  
});

test('ADD Vx,NN 0x7xNN',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    var _pc=0x200;
    for(let index=0;index<=0xF;index++)
    {
        _hardwareInterface.memoryManager.writeWord(_pc,0x60FF+(index<<8));
        _pc+=2;
        _hardwareInterface.memoryManager.writeWord(_pc,0x70FF+(index<<8));
        _pc+=2;
    }
    _pc=0x200;
    let _registersToSkip='';
    for(let index=0;index<=0xF;index++)
    {
        _hardwareInterface.update(3);
        _pc+=2;
        _hardwareInterface.update(1);
        _pc+=2;
        _registersToSkip+=index.toString(16);
        t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
        checkRegisterValue(_hardwareInterface,t,index,0xFE);
        t.is(_hardwareInterface.cpu.pc,_pc);
        defaultRegisterValueCheck(_hardwareInterface,t,_registersToSkip);
        defaultStackValueCheck(_hardwareInterface,t);
        t.is(_hardwareInterface.cpu.sp,0);
        t.is(_hardwareInterface.cpu.i,0)
        _hardwareInterface.update(2);
        t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
    }
});

test('LD Vx Vy, 0x8xy0',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x61FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0x8010);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x204);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0);
    t.is(_hardwareInterface.cpu.v0,0xFF);
    t.is(_hardwareInterface.cpu.v1,0xFF);
    defaultRegisterValueCheck(_hardwareInterface,t,'01');
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
});

test('OR Vx Vy, 0x8xy1',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x61FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0x8011);
    _hardwareInterface.update(3);
    t.is(_hardwareInterface.cpu.v0,0x0);
    _hardwareInterface.update(1);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x204);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0);
    t.is(_hardwareInterface.cpu.v0,0xFF);
    t.is(_hardwareInterface.cpu.v1,0xFF);
    defaultRegisterValueCheck(_hardwareInterface,t,'01');
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
});

test('AND Vx,Vy 0x8xy2',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x61FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0x8012);
    _hardwareInterface.update(3);
    t.is(_hardwareInterface.cpu.v0,0x0);
    _hardwareInterface.update(1);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x204);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0);
    t.is(_hardwareInterface.cpu.v0,0x0);
    t.is(_hardwareInterface.cpu.v1,0xFF);
    defaultRegisterValueCheck(_hardwareInterface,t,'01');
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
});

test('XOR Vx,Vy 0x8xy3',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x61FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0x8013);
    _hardwareInterface.update(3);
    t.is(_hardwareInterface.cpu.v0,0x0);
    _hardwareInterface.update(1);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x204);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0);
    t.is(_hardwareInterface.cpu.v0,0xFF);
    t.is(_hardwareInterface.cpu.v1,0xFF);
    defaultRegisterValueCheck(_hardwareInterface,t,'01');
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
});

test('ADD Vx,Vy 0x8xy4',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x60FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0x61FF);
    _hardwareInterface.memoryManager.writeWord(0x204,0x8014);
    _hardwareInterface.update(7);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.v0,0xFE);
    t.is(_hardwareInterface.cpu.v1,0xFF);
    t.is(_hardwareInterface.cpu.vf,0x1);
    t.is(_hardwareInterface.cpu.pc,0x206);
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
    _hardwareInterface.memoryManager.writeWord(0x206,0x6101);
    _hardwareInterface.memoryManager.writeWord(0x208,0x8014);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.v0,0xFF);
    t.is(_hardwareInterface.cpu.v1,0x1);
    t.is(_hardwareInterface.cpu.vf,0x0);
});

test('SHR Vx,Vy 0x8xy6',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x60FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0x8006);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.v0,0x7F);
    t.is(_hardwareInterface.cpu.vf,0x1);
    t.is(_hardwareInterface.cpu.pc,0x204);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0);
    defaultRegisterValueCheck(_hardwareInterface,t,'0f');
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
    _hardwareInterface.memoryManager.writeWord(0x204,0x6002);
    _hardwareInterface.memoryManager.writeWord(0x206,0x8006);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.v0,0x1);
    t.is(_hardwareInterface.cpu.vf,0x0);
});

test('LD I,addr 0xAnnn',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0xAFFF);
    _hardwareInterface.update(1);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x202);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0xFFF);
    defaultRegisterValueCheck(_hardwareInterface,t);
    defaultStackValueCheck(_hardwareInterface,t);
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
});

test('JP V0,addr 0xBNNN',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x600F);
    _hardwareInterface.memoryManager.writeWord(0x202,0xBF00);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.pc,0xF0F);
    t.is(_hardwareInterface.cpu.v0,0xF);
    defaultRegisterValueCheck(_hardwareInterface,t,'0');
    defaultStackValueCheck(_hardwareInterface,t);
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
    _hardwareInterface.memoryManager.writeWord(0xF0F,0xBFFF);
    _hardwareInterface.update(1);
    t.is(_hardwareInterface.cpu.pc,0xE);
});

test('DRW Vx,Vy,n 0xDxyn',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0xA300);
    _hardwareInterface.memoryManager.writeWord(0x202,0x603F);
    _hardwareInterface.memoryManager.writeWord(0x204,0x6120);
    _hardwareInterface.memoryManager.writeWord(0x206,0xD011);
    _hardwareInterface.memoryManager.writeByte(0x300,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x301,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x302,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x303,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x304,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x305,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x306,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x307,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x308,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x309,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30A,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30B,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30C,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30D,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30E,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30F,0xFF);
    _hardwareInterface.update(10);
    //t.is(_hardwareInterface.cpu.v0,0xFF);
    //t.is(_hardwareInterface.cpu.v1,0xFF);
    t.is(_hardwareInterface.cpu.vf,0x0);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x208);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0x300);
    defaultRegisterValueCheck(_hardwareInterface,t,'01f');
    defaultRegisterValueCheck(_hardwareInterface,t,'01f');
   
    t.is(_hardwareInterface.graphicsManager.screenData[64],0);
    t.is(_hardwareInterface.graphicsManager.screenData[63],1);
    t.is(_hardwareInterface.graphicsManager.screenData[0],1);
    t.is(_hardwareInterface.graphicsManager.screenData[1],1);
    t.is(_hardwareInterface.graphicsManager.screenData[2],1);
    t.is(_hardwareInterface.graphicsManager.screenData[3],1);
    t.is(_hardwareInterface.graphicsManager.screenData[4],1);
    t.is(_hardwareInterface.graphicsManager.screenData[5],1);
    t.is(_hardwareInterface.graphicsManager.screenData[6],1);
    t.is(_hardwareInterface.graphicsManager.screenData[7],0);
});

test('LD Vx,DT 0xFx07',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x60FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0xF015);
    _hardwareInterface.memoryManager.writeWord(0x204,0x6000);
    _hardwareInterface.memoryManager.writeWord(0x206,0xF007);
    _hardwareInterface.update(10);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x208);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0);
    t.is(_hardwareInterface.cpu.i,0);
    t.is(_hardwareInterface.cpu.v0,0xFF);
    t.is(_hardwareInterface.delayTimer.register,0xFF);
    defaultRegisterValueCheck(_hardwareInterface,t,'0');
    defaultStackValueCheck(_hardwareInterface,t);
    _hardwareInterface.update(2);
    defaultStackValueCheck(_hardwareInterface,t);
});

test('LD DT,Vx 0xFx015',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x60FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0xF015);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x204);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0);
    t.is(_hardwareInterface.delayTimer.register,0xFF);
    defaultRegisterValueCheck(_hardwareInterface,t,'0');
    defaultStackValueCheck(_hardwareInterface,t);
});

test('LD ST,Vx 0xFx018',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x60FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0xF018);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x204);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0);
    t.is(_hardwareInterface.soundTimer.register,0xFF);
    defaultRegisterValueCheck(_hardwareInterface,t,'0');
    defaultStackValueCheck(_hardwareInterface,t);
});

test('LD [I],Vx 0xFx55',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0x60FF);
    _hardwareInterface.memoryManager.writeWord(0x202,0x61FF);
    _hardwareInterface.memoryManager.writeWord(0x204,0x62FF);
    _hardwareInterface.memoryManager.writeWord(0x206,0x63FF);
    _hardwareInterface.memoryManager.writeWord(0x208,0x64FF);
    _hardwareInterface.memoryManager.writeWord(0x20A,0x65FF);
    _hardwareInterface.memoryManager.writeWord(0x20C,0x66FF);
    _hardwareInterface.memoryManager.writeWord(0x20E,0x67FF);
    _hardwareInterface.memoryManager.writeWord(0x210,0x68FF);
    _hardwareInterface.memoryManager.writeWord(0x212,0x69FF);
    _hardwareInterface.memoryManager.writeWord(0x214,0x6AFF);
    _hardwareInterface.memoryManager.writeWord(0x216,0x6BFF);
    _hardwareInterface.memoryManager.writeWord(0x218,0x6CFF);
    _hardwareInterface.memoryManager.writeWord(0x21A,0x6DFF);
    _hardwareInterface.memoryManager.writeWord(0x21C,0x6EFF);
    _hardwareInterface.memoryManager.writeWord(0x21E,0x6FFF);
    _hardwareInterface.memoryManager.writeWord(0x220,0xA300);
    _hardwareInterface.memoryManager.writeWord(0x222,0xFF55);
    _hardwareInterface.update(52);
    t.is(_hardwareInterface.memoryManager.readByte(0x300),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x301),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x302),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x303),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x304),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x305),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x306),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x307),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x308),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x309),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x30A),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x30B),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x30C),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x30D),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x30E),0xFF);
    t.is(_hardwareInterface.memoryManager.readByte(0x30F),0xFF);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.i,0x300);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.pc,0x224);
    t.is(_hardwareInterface.cpu.v0,0xFF);
    t.is(_hardwareInterface.cpu.v1,0xFF);
    t.is(_hardwareInterface.cpu.v2,0xFF);
    t.is(_hardwareInterface.cpu.v3,0xFF);
    t.is(_hardwareInterface.cpu.v4,0xFF);
    t.is(_hardwareInterface.cpu.v5,0xFF);
    t.is(_hardwareInterface.cpu.v6,0xFF);
    t.is(_hardwareInterface.cpu.v7,0xFF);
    t.is(_hardwareInterface.cpu.v8,0xFF);
    t.is(_hardwareInterface.cpu.v9,0xFF);
    t.is(_hardwareInterface.cpu.va,0xFF);
    t.is(_hardwareInterface.cpu.vb,0xFF);
    t.is(_hardwareInterface.cpu.vc,0xFF);
    t.is(_hardwareInterface.cpu.vd,0xFF);
    t.is(_hardwareInterface.cpu.ve,0xFF);
    t.is(_hardwareInterface.cpu.vf,0xFF);
    defaultStackValueCheck(_hardwareInterface,t);
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
});

test('LD Vx,[I] 0xFx65',t=>{
    let _hardwareInterface = new MockHardwareInterface();
    _hardwareInterface.initialize();
    _hardwareInterface.memoryManager.writeWord(0x200,0xA300);
    _hardwareInterface.memoryManager.writeWord(0x202,0xFF65);
    _hardwareInterface.memoryManager.writeByte(0x300,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x301,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x302,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x303,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x304,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x305,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x306,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x307,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x308,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x309,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30A,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30B,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30C,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30D,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30E,0xFF);
    _hardwareInterface.memoryManager.writeByte(0x30F,0xFF);
    _hardwareInterface.update(4);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,2);
    t.is(_hardwareInterface.cpu.pc,0x204);
    t.is(_hardwareInterface.cpu.sp,0);
    t.is(_hardwareInterface.cpu.i,0x300);
    t.is(_hardwareInterface.cpu.v0,0xFF);
    t.is(_hardwareInterface.cpu.v1,0xFF);
    t.is(_hardwareInterface.cpu.v2,0xFF);
    t.is(_hardwareInterface.cpu.v3,0xFF);
    t.is(_hardwareInterface.cpu.v4,0xFF);
    t.is(_hardwareInterface.cpu.v5,0xFF);
    t.is(_hardwareInterface.cpu.v6,0xFF);
    t.is(_hardwareInterface.cpu.v7,0xFF);
    t.is(_hardwareInterface.cpu.v8,0xFF);
    t.is(_hardwareInterface.cpu.v9,0xFF);
    t.is(_hardwareInterface.cpu.va,0xFF);
    t.is(_hardwareInterface.cpu.vb,0xFF);
    t.is(_hardwareInterface.cpu.vc,0xFF);
    t.is(_hardwareInterface.cpu.vd,0xFF);
    t.is(_hardwareInterface.cpu.ve,0xFF);
    t.is(_hardwareInterface.cpu.vf,0xFF);
    defaultStackValueCheck(_hardwareInterface,t);
    _hardwareInterface.update(2);
    t.is(_hardwareInterface.cpu.operationCyclesRequired,0);
});

