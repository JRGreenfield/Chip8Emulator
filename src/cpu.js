export function Cpu()
{
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

    }
}