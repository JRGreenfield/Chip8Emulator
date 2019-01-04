'use strict';
import React from 'react';

export function StackValue(props){
    return (
        <tr className="stackValue">
          <td>{props.stackLevel}</td>
          <td>{props.value}</td>
        </tr>
    );
}