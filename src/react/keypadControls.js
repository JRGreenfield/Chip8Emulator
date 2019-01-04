'use strict'
import React from 'react';

export function KeypadControls(props){
    return (
        <table className="keypadControls">
            <tbody>
            <tr>
                <td className={props.inputRegister & (1<<0x1)?'keypadDigitActive':'keypadDigit'}><div>1</div><div className="keypadDescription">{props.controlDescriptions[1]}</div></td>
                <td className={props.inputRegister & (1<<0x2)?'keypadDigitActive':'keypadDigit'}><div>2</div><div className="keypadDescription">{props.controlDescriptions[2]}</div></td>
                <td className={props.inputRegister & (1<<0x3)?'keypadDigitActive':'keypadDigit'}><div>3</div><div className="keypadDescription">{props.controlDescriptions[3]}</div></td>
                <td className={props.inputRegister & (1<<0xC)?'keypadDigitActive':'keypadDigit'}><div>C</div><div className="keypadDescription">{props.controlDescriptions[0xC]}</div></td>
            </tr>
            <tr>
                <td className={props.inputRegister & (1<<0x4)?'keypadDigitActive':'keypadDigit'}><div>4</div><div className="keypadDescription">{props.controlDescriptions[4]}</div></td>
                <td className={props.inputRegister & (1<<0x5)?'keypadDigitActive':'keypadDigit'}><div>5</div><div className="keypadDescription">{props.controlDescriptions[5]}</div></td>
                <td className={props.inputRegister & (1<<0x6)?'keypadDigitActive':'keypadDigit'}><div>6</div><div className="keypadDescription">{props.controlDescriptions[6]}</div></td>
                <td className={props.inputRegister & (1<<0xD)?'keypadDigitActive':'keypadDigit'}><div>D</div><div className="keypadDescription">{props.controlDescriptions[0xD]}</div></td>
            </tr>
            <tr>
                <td className={props.inputRegister & (1<<0x7)?'keypadDigitActive':'keypadDigit'}><div>7</div><div className="keypadDescription">{props.controlDescriptions[7]}</div></td>
                <td className={props.inputRegister & (1<<0x8)?'keypadDigitActive':'keypadDigit'}><div>8</div><div className="keypadDescription">{props.controlDescriptions[8]}</div></td>
                <td className={props.inputRegister & (1<<0x9)?'keypadDigitActive':'keypadDigit'}><div>9</div><div className="keypadDescription">{props.controlDescriptions[9]}</div></td>
                <td className={props.inputRegister & (1<<0xE)?'keypadDigitActive':'keypadDigit'}><div>E</div><div className="keypadDescription">{props.controlDescriptions[0xE]}</div></td>
            </tr>
            <tr>
                <td className={props.inputRegister & (1<<0xA)?'keypadDigitActive':'keypadDigit'}><div>A</div><div className="keypadDescription">{props.controlDescriptions[0xA]}</div></td>
                <td className={props.inputRegister & (1<<0x0)?'keypadDigitActive':'keypadDigit'}><div>0</div><div className="keypadDescription">{props.controlDescriptions[0]}</div></td>
                <td className={props.inputRegister & (1<<0xB)?'keypadDigitActive':'keypadDigit'}><div>B</div><div className="keypadDescription">{props.controlDescriptions[0xB]}</div></td>
                <td className={props.inputRegister & (1<<0xF)?'keypadDigitActive':'keypadDigit'}><div>F</div><div className="keypadDescription">{props.controlDescriptions[0xF]}</div></td>
            </tr>
            </tbody>
        </table>
    );
}