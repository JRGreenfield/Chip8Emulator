'use strict';
import React from 'react';

export function CpuFrequencyModifier(props){
    return(
        <div className="cpuFrequencyModifier">
            <button onClick={()=>props.decreaseCpuFrequency()}>
                decrease frequency
            </button>
            <div>{`${props.cpuFrequencyMultiplier*60}Hz`}</div>
            <button onClick={()=>props.increaseCpuFrequency()}>
                increase frequency
            </button>
        </div>
    );
} 