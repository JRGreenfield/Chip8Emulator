'use strict'
import React from 'react';

export class RomLoader extends React.Component{
    constructor(props){
        super(props);
    }

    handleFiles(){
        const inputElement = document.getElementById("input");
        const file = inputElement.files.item(0);   
        var reader = new FileReader();  
        reader.onload =()=>{this.props.onRomFileSelected(new Uint8Array(reader.result))};
        reader.readAsArrayBuffer(file);
    }

    render(){
        return (
            <input className="romLoader" type="file" id="input" onChange={(e)=>{this.handleFiles(e)}}/>
        );
    }
}