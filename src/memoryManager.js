'use strict';

export function MemoryManager(bankSize)
{
    const _bankSize = bankSize;
    let _ram;

    this.initialize = function()
    {
        _ram = new Uint8Array(bankSize);
        _ram[0]=0xF0;_ram[1]=0x90;_ram[2]=0x90;_ram[3]=0x90;_ram[4]=0xF0;//0
        _ram[5]=0x20;_ram[6]=0x60;_ram[7]=0x20;_ram[8]=0x20;_ram[9]=0x70;//1
        _ram[10]=0xF0;_ram[11]=0x10;_ram[12]=0xF0;_ram[13]=0x80;_ram[14]=0xF0;//2
        _ram[15]=0xF0;_ram[16]=0x10;_ram[17]=0xF0;_ram[18]=0x10;_ram[19]=0xF0;//3
        _ram[20]=0x90;_ram[21]=0x90;_ram[22]=0xF0;_ram[23]=0x10;_ram[24]=0x10;//4
        _ram[25]=0xF0;_ram[26]=0x80;_ram[27]=0xF0;_ram[28]=0x10;_ram[29]=0xF0;//5
        _ram[30]=0xF0;_ram[31]=0x80;_ram[32]=0xF0;_ram[33]=0x90;_ram[34]=0xF0;//6
        _ram[35]=0xF0;_ram[36]=0x10;_ram[37]=0x20;_ram[38]=0x40;_ram[39]=0x40;//7
        _ram[40]=0xF0;_ram[41]=0x90;_ram[42]=0xF0;_ram[43]=0x90;_ram[44]=0xF0;//8
        _ram[45]=0xF0;_ram[46]=0x90;_ram[47]=0xF0;_ram[48]=0x10;_ram[49]=0xF0;//9
        _ram[50]=0xF0;_ram[51]=0x90;_ram[52]=0xF0;_ram[53]=0x90; _ram[54]=0x90;//A
        _ram[55]=0xE0;_ram[56]=0x90;_ram[57]=0xE0;_ram[58]=0x90;_ram[59]=0xE0;//B
        _ram[60]=0xF0;_ram[61]=0x80;_ram[62]=0x80;_ram[63]=0x80;_ram[64]=0xF0;//C
        _ram[65]=0xE0;_ram[66]=0x90;_ram[67]=0x90;_ram[68]=0x90;_ram[69]=0xE0;//D
        _ram[70]=0xF0;_ram[71]=0x80;_ram[72]=0xF0;_ram[73]=0x80;_ram[74]=0xF0;//E
        _ram[75]=0xF0;_ram[76]=0x80;_ram[77]=0xF0;_ram[78]=0x80;_ram[79]=0x80;//F
    }

    this.reset = function()
    {
        for(let i = 80;i<_bankSize;i++)
        {
            _ram[i]=0;
        }
    }

    this.writeByte = function(address,value)
    {
        if(address < 0 || address > _bankSize)
        {
            throw new ReferenceError('mmu:writeByte - address is out of range');
        }

        if(address < 0x200)
        {
            throw new ReferenceError('mmu:writeByte - restricted area of memory');
        }

        _ram[address]=value;
    }

    this.readByte = function(address)
    {
        if(address < 0 || address > _bankSize)
        {
            alert("mmu:readByte - address is out of range");
        }

        return _ram[address];
    }

    this.writeWord = function(address,value)
    {
        if(address < 0 || address > _bankSize -1)
        {
            throw new ReferenceError('mmu:writeWord - address is out of range');
        }

        if(address < 0x200)
        {
            throw new ReferenceError('mmu:writeWord - restricted area of memory')
        }

        _ram[address]=value>>8;
        _ram[address+1]=value & 0xFF;
    }

    this.readWord = function(address)
    {
        if(address < 0 || address > _bankSize -1)
        {
            alert("mmu:writeWord - address is out of range");
        }

        return (_ram[address]<<8)+(_ram[address+1]);
    }
}