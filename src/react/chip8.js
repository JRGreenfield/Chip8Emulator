'use strict';
import React from 'react';
import {Chip8HardwareInterface} from '../chip8/chip8hardwareInterface';
import {RomLoader} from './romLoader';
import {HardwareMonitor} from './hardwareMonitor';
import {PlaybackControls} from './playbackControls';
import {KeypadControls} from './keypadControls';
import {GameSelector} from './gameSelector';
import {CpuFrequencyModifier} from './cpuFrequencyModifier';

export class Chip8 extends React.Component {
    constructor(props){
       super(props);
       this.timerID=null;
       this.chip8=new Chip8HardwareInterface();
       this.chip8.initialize();
       this.game = null;
       this.state = {generalRegisterValues:this.chip8.cpu.generalRegisters,
                     stackValues:this.chip8.cpu.stack,
                     pc:this.chip8.cpu.pc,
                     sp:this.chip8.cpu.sp,
                     i:this.chip8.cpu.i,
                     st:this.chip8.soundTimer.register,
                     dt:this.chip8.delayTimer.register,
                     inputRegister:this.chip8.inputManager.register,
                     playing:false,
                     cpuFrequencyMultiplier:4,
                     controlDescriptions:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                     romLoaded:false
                    };
    }
   
   componentWillUnmount(){
     if(this.playing){
        clearInterval(this.timerID);
        this.playing=false;
     }  
     this.chip8=null;
   }
  
   handleGameSelected(game){
       this.setState({
           controlDescriptions:game.controlDescriptions.slice()
       });
       this.handleRomLoaded(game.rom);
   }

   handleRomLoaded(rom){
       
       let value="["
       for(let i=0;i<rom.length;i++)
       {
            value+=`${rom[i]},`
       }
       value+="]"
       console.log(value);
       this.chip8.reset();
       this.chip8.loadProgram(rom);
       this.setState({
            generalRegisterValues:this.chip8.cpu.generalRegisters,
            stackValues:this.chip8.cpu.stack,
            pc:this.chip8.cpu.pc,
            sp:this.chip8.cpu.sp,
            i:this.chip8.cpu.i,
            st:this.chip8.soundTimer.register,
            dt:this.chip8.delayTimer.register,
            inputRegister:this.chip8.inputManager.register,
            playing:false,
            romLoaded:true}); 
   }

   handleStepClicked(){
     if(!this.playing && this.romLoaded){
         this.tick();
     }
   }
   
   handlePlayClicked(){
       if(!this.playing){
           this.timerID = setInterval(() => this.update(),16);
           this.playing = true;
       }
       else{
           clearInterval(this.timerID);
           this.playing = false;
       }
       this.setState({
           playing:this.playing
       });
   }
   
   handleResetClicked(){
       if(this.playing){
           clearInterval(this.timerID);
           this.playing = false;
       }
       this.chip8.softReset();
       this.setState({
            generalRegisterValues:this.chip8.cpu.generalRegisters,
            stackValues:this.chip8.cpu.stack,
            pc:this.chip8.cpu.pc,
            sp:this.chip8.cpu.sp,
            i:this.chip8.cpu.i,
            st:this.chip8.soundTimer.register,
            dt:this.chip8.delayTimer.register,
            inputRegister:this.chip8.inputManager.register,
            controlDescriptions:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
            playing:false}); 
   }

   decreaseCpuFrequency(){
        if(this.state.cpuFrequencyMultiplier > 1){
            this.state.cpuFrequencyMultiplier--;
            this.setState({cpuFrequencyMultiplier:this.state.cpuFrequencyMultiplier});
        }
   }

   increaseCpuFrequency(){
       if(this.state.cpuFrequencyMultiplier < 20){
           this.state.cpuFrequencyMultiplier++;
           this.setState({cpuFrequencyMultiplier:this.state.cpuFrequencyMultiplier});
       }
   }

   tick(){
           this.chip8.update();
           this.setState({
               generalRegisterValues:this.chip8.cpu.generalRegisters,
               stackValues:this.chip8.cpu.stack,
               pc:this.chip8.cpu.pc,
               sp:this.chip8.cpu.sp,
               st:this.chip8.soundTimer.register,
               dt:this.chip8.delayTimer.register,
               inputRegister:this.chip8.inputManager.register,
               i:this.chip8.cpu.i}); 
   }

   update(){
       this.chip8.updateTimers();
       for(let i =0;i<this.state.cpuFrequencyMultiplier;i++){
            this.tick();
       }
   }
   
   render() {
      return (
             <div className="chip8">
             <RomLoader onRomFileSelected={(rom)=>this.handleRomLoaded(rom)}/>
             <HardwareMonitor  generalRegisterValues={this.state.generalRegisterValues.slice()} 
                               stackValues={this.state.stackValues.slice()} 
                               pc={this.state.pc} sp={this.state.sp} i={this.state.i}
                               dt={this.state.dt} st={this.state.st}/>
             <PlaybackControls onPlayClick={()=>this.handlePlayClicked()}
                               romLoaded={this.state.romLoaded}
                               playing={this.state.playing} onStepClick={()=>this.handleStepClicked()}                                 
                               onResetClick={()=>this.handleResetClicked()}/>
             <KeypadControls inputRegister={this.state.inputRegister} controlDescriptions={this.state.controlDescriptions}/>
             <GameSelector onGameSelected={(game)=>this.handleGameSelected(game)} />
             <CpuFrequencyModifier cpuFrequencyMultiplier={this.state.cpuFrequencyMultiplier} decreaseCpuFrequency={()=>this.decreaseCpuFrequency()} increaseCpuFrequency={()=>this.increaseCpuFrequency()}/>
             </div>
            
      );
   }
 }