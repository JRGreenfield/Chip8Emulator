'use strict';
import React from 'react';
import {RegisterValue} from './registerValue';

export function RegisterTable(props){
    return(
          <table className="registerTable">
              <thead>
                  <tr>
                      <th colSpan="1">Register</th>
                      <th colSpan="1">Value</th>
                  </tr>
              </thead>
              <tbody>
                  <RegisterValue register='V0' value={props.generalRegisterValues[0].toString(16)}/>
                  <RegisterValue register='V1' value={props.generalRegisterValues[1].toString(16)}/>
                  <RegisterValue register='V2' value={props.generalRegisterValues[2].toString(16)}/>
                  <RegisterValue register='V3' value={props.generalRegisterValues[3].toString(16)}/>
                  <RegisterValue register='V4' value={props.generalRegisterValues[4].toString(16)}/>
                  <RegisterValue register='V5' value={props.generalRegisterValues[5].toString(16)}/>
                  <RegisterValue register='V6' value={props.generalRegisterValues[6].toString(16)}/>
                  <RegisterValue register='V7' value={props.generalRegisterValues[7].toString(16)}/>
                  <RegisterValue register='V8' value={props.generalRegisterValues[8].toString(16)}/>
                  <RegisterValue register='V9' value={props.generalRegisterValues[9].toString(16)}/>
                  <RegisterValue register='Va' value={props.generalRegisterValues[10].toString(16)}/>
                  <RegisterValue register='Vb' value={props.generalRegisterValues[11].toString(16)}/>
                  <RegisterValue register='Vc' value={props.generalRegisterValues[12].toString(16)}/>
                  <RegisterValue register='Vd' value={props.generalRegisterValues[13].toString(16)}/>
                  <RegisterValue register='Ve' value={props.generalRegisterValues[14].toString(16)}/>
                  <RegisterValue register='Vf' value={props.generalRegisterValues[15].toString(16)}/>
                  <RegisterValue register='PC' value={props.pc.toString(16)}/>
                  <RegisterValue register='SP' value={props.sp.toString(16)}/>
                  <RegisterValue register='I' value={props.i.toString(16)}/>
                  <RegisterValue register='ST' value={props.st.toString(16)}/>
                  <RegisterValue register='DT' value={props.dt.toString(16)}/>
              </tbody>
          </table>
    );
}