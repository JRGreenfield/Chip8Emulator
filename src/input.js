let _pollingFrequency = 0;
let _clockFrequency = 0;
let _clockCyclesPerUpdate = 0;
let _clockCyclesCount = 0;

export default class 
{
    constructor(pollingFrequency,clockFrequency)
    {
        _pollingFrequency = pollingFrequency;
        _clockFrequency = clockFrequency;
        _clockCyclesPerUpdate = _clockFrequency/_pollingFrequency;
        _clockCyclesCount = 0;
    }

    log()
    {
        console.log("input polling frequency: "+_pollingFrequency.toString()+"Hz");
        console.log("clock frequency: "+ _clockFrequency.toString()+"Hz");
        console.log("clock cycles per input update: "+_clockCyclesPerUpdate.toString());
        console.log("input clock cycle count: " + _clockCyclesCount.toString());
    }
}

