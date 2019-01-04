'use strict';
import React from 'react';
import {StackValue} from './stackValue';

export function StackTable(props){
    return (
            <table className="stackTable">
                <thead>
                    <tr>
                        <th colSpan="1">Stack Level</th>
                        <th colSpan="1">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <StackValue stackLevel='S0' value={props.stackValues[0].toString(16)}/>
                    <StackValue stackLevel='S1' value={props.stackValues[1].toString(16)}/>
                    <StackValue stackLevel='S2' value={props.stackValues[2].toString(16)}/>
                    <StackValue stackLevel='S3' value={props.stackValues[3].toString(16)}/>
                    <StackValue stackLevel='S4' value={props.stackValues[4].toString(16)}/>
                    <StackValue stackLevel='S5' value={props.stackValues[5].toString(16)}/>
                    <StackValue stackLevel='S6' value={props.stackValues[6].toString(16)}/>
                    <StackValue stackLevel='S7' value={props.stackValues[7].toString(16)}/>
                    <StackValue stackLevel='S8' value={props.stackValues[8].toString(16)}/>
                    <StackValue stackLevel='S9' value={props.stackValues[9].toString(16)}/>
                    <StackValue stackLevel='Sa' value={props.stackValues[10].toString(16)}/>
                    <StackValue stackLevel='Sb' value={props.stackValues[11].toString(16)}/>
                    <StackValue stackLevel='Sc' value={props.stackValues[12].toString(16)}/>
                    <StackValue stackLevel='Sd' value={props.stackValues[13].toString(16)}/>
                    <StackValue stackLevel='Se' value={props.stackValues[14].toString(16)}/>
                    <StackValue stackLevel='Sf' value={props.stackValues[15].toString(16)}/>
                </tbody>
            </table>
    );
  }