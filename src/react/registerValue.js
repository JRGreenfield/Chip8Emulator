'use strict';
import React from 'react';

export function RegisterValue(props){
    return (
        <tr className="registerValue">
            <td>{props.register}</td>
            <td>{props.value}</td>
        </tr>
    );
}