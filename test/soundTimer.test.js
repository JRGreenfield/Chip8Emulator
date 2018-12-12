'use strict'

import test from 'ava';
import {SoundTimer} from '../src/soundTimer';
import {MockAudioRenderer} from './mockAudioRenderer';

test('SoundTimer:initialize/properties test', t => {
    let _mockAudioRenderer = new MockAudioRenderer();
	let _soundTimer = new SoundTimer(1000,1760000,_mockAudioRenderer);
    _soundTimer.initialize();
	t.is(_soundTimer.register,0);
	t.is(_soundTimer.clockFrequency,1760000);
	t.is(_soundTimer.pollingFrequency,1000);
	t.is(_soundTimer.cyclesPerUpdate,1760);
    _soundTimer.clockFrequency=3520000;
	t.is(_soundTimer.cyclesPerUpdate,3520);
	_soundTimer.pollingFrequency=2000;
	t.is(_soundTimer.cyclesPerUpdate,1760);
});

test('SoundTimer:register test', t => {
    let _mockAudioRenderer = new MockAudioRenderer();
	let _soundTimer = new SoundTimer(1000,1760000,_mockAudioRenderer);
    _soundTimer.initialize();
    t.is(_soundTimer.register,0);
    t.is(_mockAudioRenderer.active,false);
    _soundTimer.register=1;
    t.is(_soundTimer.register,1);
    t.is(_mockAudioRenderer.active,true);
    _soundTimer.register=0;
    t.is(_soundTimer.register,0);
    t.is(_mockAudioRenderer.active,false);
});

test('SoundTimer:update test', t => {
    let _mockAudioRenderer = new MockAudioRenderer();
    let _soundTimer = new SoundTimer(1000,1760000,_mockAudioRenderer);
    _soundTimer.initialize();
    _soundTimer.register=2;
    t.is(_mockAudioRenderer.active,true);
    _soundTimer.update(1761);
    t.is(_soundTimer.register,1);
    t.is(_mockAudioRenderer.active,true);
    _soundTimer.update(1761);
    t.is(_soundTimer.register,0);
    t.is(_mockAudioRenderer.active,false);
    _soundTimer.update(1761);
    t.is(_soundTimer.register,0);
    t.is(_mockAudioRenderer.active,false);
});