'use strict';
import React from 'react';

export function PlaybackControls(props){
   return (
       <div className="playbackControls">
          <button className={props.playing?"playButtonInactive":"playButtonActive"} onClick={()=>props.onPlayClick()} disabled={!props.romLoaded}>{props.playing?'\u25FC':'\u25B6'}</button>
          <button className="stepButton" onClick={()=>props.onStepClick()}disabled={!props.romLoaded || props.playing}>{'\u25B6\u25B6'}</button>
          <button className="resetButton" onClick={()=>props.onResetClick()} disabled={!props.romLoaded}>{'\u27f2'}</button>
       </div>
   );
}