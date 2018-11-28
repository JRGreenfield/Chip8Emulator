export function MemoryManager(bankSize)
{
    var _bankSize = bankSize;
    var _ram;

    this.initialize = function()
    {
        _ram = new Uint8Array(bankSize);
    }

    this.reset = function()
    {
        _ram = new Uint8Array(bankSize);
    }

    this.writeByte = function(address,value)
    {
        if(address < 0 || address > _bankSize)
        {
            alert("mmu:writeByte - address is out of range");
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
            alert("mmu:writeWord - address is out of range");
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