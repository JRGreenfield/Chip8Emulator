'use strict';
import React from 'react';
import {RegisterTable} from './registerTable';
import {StackTable} from './stackTable';

export function HardwareMonitor(props){
   return (
          <table className="hardwareMonitor">
              <tbody>
                <tr>
                   <td><RegisterTable generalRegisterValues = {props.generalRegisterValues} pc={props.pc} sp={props.sp} i={props.i} dt={props.dt} st={props.st}/></td>
                   <td><StackTable stackValues = {props.stackValues}/></td>
                </tr>
              </tbody>
          </table> 
   );
}