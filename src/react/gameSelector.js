'use strict';
import React from 'react';
//import {Tetris} from '../roms/tetris';
import {Blinky} from '../roms/blinky';
import {Pong} from '../roms/pong';
import {Merlin} from '../roms/merlin';
import {Invaders} from '../roms/invaders';
import {Tetris} from '../roms/tetris'
import {Brix} from '../roms/brix';
import {Kaleid} from '../roms/kaleid';
import {TicTac} from '../roms/tictac';
import {Missle} from '../roms/missle';
import {Hidden} from '../roms/hidden';
import {Ufo} from '../roms/ufo';
import {Connect4} from '../roms/connect4';
import {Blitz} from '../roms/blitz';

export class GameSelector extends React.Component{
      constructor(props){
          super(props);
          this.gameMap = new Map();
         
          this.gameMap.set('TETRIS',Tetris);
          this.gameMap.set('BLINKY',Blinky);
          this.gameMap.set('PONG',Pong);
          this.gameMap.set('MERLIN',Merlin);
          this.gameMap.set('INVADERS',Invaders);
          this.gameMap.set('BRIX',Brix);
          this.gameMap.set('KALEID',Kaleid);
          this.gameMap.set('TICTAC',TicTac);
          this.gameMap.set('MISSLE',Missle);
          this.gameMap.set('HIDDEN',Hidden);
          this.gameMap.set('UFO',Ufo);
          this.gameMap.set('CONNECT4',Connect4);
          this.gameMap.set('BLITZ',Blitz);
      }

      changeFunction(event){
           if(event.target.value !== 'UNDEFINED'){
                this.props.onGameSelected(this.gameMap.get(event.target.value));
           }
      }

      render(){
          //TODO: make this dynamic
          return (
            <select onChange={(event)=>{this.changeFunction(event)}}>
                <option value='UNDEFINED'>--</option>
                <option value='TETRIS'>TETRIS</option>
                <option value='BLINKY'>BLINKY</option>
                <option value='PONG'>PONG</option>
                <option value='MERLIN'>MERLIN</option>
                <option value='INVADERS'>INVADERS</option>
                <option value='BRIX'>BRIX</option>
                <option value='KALEID'>KALEID</option>
                <option value='TICTAC'>TICTAC</option>
                <option value='MISSLE'>MISSLE</option>
                <option value='HIDDEN'>HIDDEN</option>
                <option value='UFO'>UFO</option>
                <option value='CONNECT4'>CONNECT4</option>
                <option value='BLITZ'>BLITZ</option>
            </select>
          );
      }
}

