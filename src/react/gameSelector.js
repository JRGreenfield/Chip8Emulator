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
import {Tank} from '../roms/tank';
import {Puzzle15} from '../roms/puzzle15';
import {Guess} from '../roms/guess';
import {Maze} from '../roms/maze';
import {Pong2} from '../roms/pong2';
import {Puzzle} from '../roms/puzzle';
import {Syzygy} from '../roms/syzygy';
import {Vbrix} from '../roms/vbrix';
import {Vers} from '../roms/vers';
import {Wipeoff} from '../roms/wipeoff';

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
          this.gameMap.set('TANK',Tank);
          this.gameMap.set('PUZZLE15',Puzzle15);
          this.gameMap.set('GUESS',Guess);
          this.gameMap.set('MAZE',Maze);
          this.gameMap.set('PONG2',Pong2);
          this.gameMap.set('PUZZLE',Puzzle);
          this.gameMap.set('SYZYGY',Syzygy);
          this.gameMap.set('VBRIX',Vbrix);
          this.gameMap.set('VERS',Vers);
          this.gameMap.set('WIPEOFF',Wipeoff);
      }

      changeFunction(event){
           if(event.target.value !== 'UNDEFINED'){
                this.props.onGameSelected(this.gameMap.get(event.target.value));
           }
      }

      render(){
          //TODO: make this dynamic
          return (
            <select className='gameSelector' onChange={(event)=>{this.changeFunction(event)}}>
                <option value='UNDEFINED'>SELECT GAME TO LOAD</option>
                <option value='BLINKY'>BLINKY</option>
                <option value='BLITZ'>BLITZ</option>
                <option value='BRIX'>BRIX</option>
                <option value='CONNECT4'>CONNECT4</option>
                <option value='GUESS'>GUESS</option>
                <option value='HIDDEN'>HIDDEN</option>
                <option value='INVADERS'>INVADERS</option>
                <option value='KALEID'>KALEID</option> 
                <option value='MAZE'>MAZE</option>
                <option value='MERLIN'>MERLIN</option>
                <option value='MISSLE'>MISSLE</option>
                <option value='PONG'>PONG</option>
                <option value='PONG2'>PONG2</option>
                <option value='PUZZLE'>PUZZLE</option>
                <option value='PUZZLE15'>PUZZLE15</option>
                <option value='TICTAC'>TICTAC</option> 
                <option value='SYZYGY'>SYZYGY</option>
                <option value='TANK'>TANK</option>
                <option value='TETRIS'>TETRIS</option>
                <option value='UFO'>UFO</option>
                <option value='VBRIX'>VBRIX</option>
                <option value='VERS'>VERS</option>
                <option value='WIPEOFF'>WIPEOFF</option>
            </select>
          );
      }
}

