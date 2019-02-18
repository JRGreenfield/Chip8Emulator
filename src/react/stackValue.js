'use strict';
import React from 'react';

export function StackValue(props){
    return (
        <tr className='stackValueRow'>
          <td className='stackValueCell'>{props.stackLevel}</td>
          <td className='stackValueCell'>{props.value}</td>
        </tr>
    );
}