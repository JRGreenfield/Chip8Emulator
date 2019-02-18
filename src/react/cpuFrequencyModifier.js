'use strict';
import React from 'react';

export function CpuFrequencyModifier(props){
    return(
        <table className="cpuFrequencyModifier">
            <tbody>
                <tr className="cpuFrequencyRow">
                    <td className="cpuFrequencyCell">
                        <button className='cpuFrequencyButton' onClick={()=>props.decreaseCpuFrequency()}>decrease cpu frequency</button>
                    </td>
                    <td className="cpuFrequencyMultiplier">
                        {props.cpuFrequencyMultiplier*60}Hz
                    </td>
                    <td className="cpuFrequencyCell">
                        <button className='cpuFrequencyButton' onClick={()=>props.increaseCpuFrequency()}>increase cpu frequency</button>
                    </td>
                </tr>   
            </tbody>  
        </table>
    );
} 