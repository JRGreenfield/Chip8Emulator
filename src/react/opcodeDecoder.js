'use strict';
import React from 'react';

export class OpcodeDecoder extends React.Component {
    constructor(props){
        super(props);
    }

    decodeOperation(opcode){
        if(opcode == null)
        {
            return 'NO OPCODE';
        }

        switch(opcode & 0xF000)
        {
            case 0x0000:
                switch(opcode)
                {
                    case 0x00E0:
                        return `0x${opcode.toString(16)} -> CLS`;
                    case 0x00EE:
                        return `0x${opcode.toString(16)} -> RET`;
                    default:
                        return `0x${opcode.toString(16)} -> ERROR`;
                }
            case 0x1000:
                return `0x${opcode.toString(16)} -> JP ${(opcode&0XFFF).toString(16)}`;
            case 0x2000:
                return `0x${opcode.toString(16)} -> CALL ${(opcode&0XFFF).toString(16)}`;
            case 0x3000:
                return `0x${opcode.toString(16)} -> SE V${((opcode&0xF00)>>8).toString(16)}  ${(opcode&0xFF).toString(16)}`;
            case 0x4000:
                return `0x${opcode.toString(16)} -> SNE V${((opcode&0xF00)>>8).toString(16)}  ${(opcode&0xFF).toString(16)}`;
            case 0x5000:
                return `0x${opcode.toString(16)} -> SE V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)}`;
            case 0x6000:
                return `0x${opcode.toString(16)} -> LD V${((opcode&0xF00)>>8).toString(16)} ${(opcode&0xFF).toString(16)}`;
            case 0x7000:
                return `0x${opcode.toString(16)} -> ADD V${((opcode&0xF00)>>8).toString(16)} ${(opcode&0xFF).toString(16)}`;
            case 0x8000:
                switch(opcode & 0xF)
                {
                    case 0:
                        return `0x${opcode.toString(16)} -> LD V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)}`;
                    case 1:
                        return `0x${opcode.toString(16)} -> OR V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)}`;
                    case 2:
                        return `0x${opcode.toString(16)} -> AND V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)}`;
                    case 3:
                        return `0x${opcode.toString(16)} -> XOR V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)}`;
                    case 4:
                        return `0x${opcode.toString(16)} -> ADD V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)}`;
                    case 5:
                        return `0x${opcode.toString(16)} -> SUB V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)}`;
                    case 6:
                        return `0x${opcode.toString(16)} -> SHR V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)}`;
                    case 7:
                        return `0x${opcode.toString(16)} -> SUBN V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)}`;
                    case 0xE:
                        return `0x${opcode.toString(16)} -> SHL V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)}`;
                }
            case 0x9000:
                return `0x${opcode.toString(16)} -> SNE V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)}`;
            case 0xA000:
                return `0x${opcode.toString(16)} -> LD I ${(opcode&0XFFF).toString(16)}`;
            case 0xB000:
                return `0x${opcode.toString(16)} -> JP V0 ${(opcode&0XFFF).toString(16)}`;
            case 0xC000:
                return `0x${opcode.toString(16)} -> RND V${((opcode&0xF00)>>8).toString(16)} ${(opcode&0xFF).toString(16)}`;
            case 0xD000:
                return `0x${opcode.toString(16)} -> DRW V${((opcode&0xF00)>>8).toString(16)} V${((opcode&0xF0)>>4).toString(16)} ${opcode&0xF}`;
            case 0xE000:
                switch(opcode & 0xFF)
                {
                    case 0x9E:
                        return `0x${opcode.toString(16)} -> SKP V${((opcode&0xF00)>>8).toString(16)}`
                    case 0xA1:
                        return `0x${opcode.toString(16)} -> SKNP V${((opcode&0xF00)>>8).toString(16)}`
                    default:
                        return `0x${opcode.toString(16)} -> ERROR`;
                }
            case 0xF000:
                switch(opcode & 0xFF)
                {
                    case 0x7:
                        return `0x${opcode.toString(16)} -> LD V${((opcode&0xF00)>>8).toString(16)} DT`;
                    case 0xA:
                        return `0x${opcode.toString(16)} -> LD V${((opcode&0xF00)>>8).toString(16)} K`;
                    case 0x15:
                        return `0x${opcode.toString(16)} -> LD DT V${((opcode&0xF00)>>8).toString(16)}`;
                    case 0x18:
                        return `0x${opcode.toString(16)} -> LD ST V${((opcode&0xF00)>>8).toString(16)}`;
                    case 0x1E:
                        return `0x${opcode.toString(16)} -> ADD I V${((opcode&0xF00)>>8).toString(16)}`;
                    case 0x29:
                        return `0x${opcode.toString(16)} -> LD F V${((opcode&0xF00)>>8).toString(16)}`;
                    case 0x33:
                        return `0x${opcode.toString(16)} -> LD B V${((opcode&0xF00)>>8).toString(16)}`;
                    case 0x55:
                        return `0x${opcode.toString(16)} -> LD [I] V${((opcode&0xF00)>>8).toString(16)}`;
                    case 0x65:
                        return `0x${opcode.toString(16)} -> LD V${((opcode&0xF00)>>8).toString(16)} [I]`;
                    default:
                        return `0x${opcode.toString(16)} -> ERROR`;
                }
            
            default:
                return `0x${opcode.toString(16)} -> ERROR`;
        }
    }

    render(){
        return (
             <div className='opcodeDecoder'>
                 {this.decodeOperation(this.props.opcode)}
             </div>
        );
    }
}