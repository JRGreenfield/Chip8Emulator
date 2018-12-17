'use strict'

import test from 'ava';
import {SoundTimer} from '../src/soundTimer';
import {MockAudioRenderer} from './mockAudioRenderer';

test('initialization', t => {
    let _mockAudioRenderer = new MockAudioRenderer();
	let _soundTimer = new SoundTimer(_mockAudioRenderer,1760000,60);
    _soundTimer.initialize();
    //CHECK: initial clock frequency,polling frequency,cycles per update, and register after initialization
	t.is(_soundTimer.register,0);
	t.is(_soundTimer.clockFrequency,1760000);
	t.is(_soundTimer.pollingFrequency,60);
	t.is(_soundTimer.cyclesPerUpdate,29333);
});

test('properties update', t =>{
    let _mockAudioRenderer = new MockAudioRenderer();
    let _soundTimer = new SoundTimer(_mockAudioRenderer,1760000,60);
    //CHECK: update clock frequency to check for updated cycles per update value
    _soundTimer.clockFrequency=3520000;
    t.is(_soundTimer.clockFrequency,3520000);
	t.is(_soundTimer.pollingFrequency,60);
    t.is(_soundTimer.cyclesPerUpdate,58666);
    //CHECK: update polling frequency to check for updated cycles per update value
	_soundTimer.pollingFrequency=120;
    t.is(_soundTimer.clockFrequency,3520000);
    t.is(_soundTimer.pollingFrequency,120);
    t.is(_soundTimer.cyclesPerUpdate,29333);
})

test('register', t => {
    let _mockAudioRenderer = new MockAudioRenderer();
	let _soundTimer = new SoundTimer(_mockAudioRenderer,1760000,60);
    _soundTimer.initialize();
    //CHECK: on initialization, check that register is 0 and audio renderer is inactive
    t.is(_soundTimer.register,0);
    t.is(_mockAudioRenderer.active,false);
    //CHECK: on register set to 1, check that register is set to 1 and audio renderer is active
    _soundTimer.register=1;
    t.is(_soundTimer.register,1);
    t.is(_mockAudioRenderer.active,true);
    //CHECK: on register set to 0, check that register is set to 0 and audio renderer is inactive
    _soundTimer.register=0;
    t.is(_soundTimer.register,0);
    t.is(_mockAudioRenderer.active,false);
});

test('update', t => {
    let _mockAudioRenderer = new MockAudioRenderer();
    let _soundTimer = new SoundTimer(_mockAudioRenderer,1760000,60);
    _soundTimer.initialize();
    _soundTimer.register=2;
    t.is(_mockAudioRenderer.active,true);
    _soundTimer.update(29333);
    t.is(_soundTimer.register,1);
    t.is(_soundTimer.cyclesProcessed,0);
    t.is(_mockAudioRenderer.active,true);
    _soundTimer.update(29333);
    t.is(_soundTimer.register,0);
    t.is(_soundTimer.cyclesProcessed,0);
    t.is(_mockAudioRenderer.active,false);
    _soundTimer.update(29333);
    t.is(_soundTimer.register,0);
    t.is(_soundTimer.cyclesProcessed,0);
    t.is(_mockAudioRenderer.active,false);
});

test('reset',t =>{
    let _mockAudioRenderer = new MockAudioRenderer();
    let _soundTimer = new SoundTimer(_mockAudioRenderer,1760000,60);
    _soundTimer.initialize();
    _soundTimer.register=1;
    _soundTimer.update(2003);
    _soundTimer.reset();
    t.is(_soundTimer.register,0);
    t.is(_soundTimer.cyclesProcessed,0);
    t.is(_mockAudioRenderer.active,false);
});