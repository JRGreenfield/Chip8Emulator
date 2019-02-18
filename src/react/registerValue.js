'use strict';
import React from 'react';

export function RegisterValue(props){
    return (
        <tr className="registerValueRow">
            <td className="registerValueCell">{props.register}</td>
            <td className="registerValueCell">{props.value}</td>
        </tr>
    );
}