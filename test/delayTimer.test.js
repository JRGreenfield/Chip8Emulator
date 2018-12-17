'use strict';

import test from 'ava';
import {DelayTimer} from '../src/delayTimer';

test('DelayTimer:initialization', t => {
	let _delayTimer = new DelayTimer(1760000,60);
	_delayTimer.initialize();
	//CHECK: initial clock frequency,polling frequency,cycles per update, and register after initialization
	t.is(_delayTimer.register,0);
	t.is(_delayTimer.clockFrequency,1760000);
	t.is(_delayTimer.pollingFrequency,60);
	t.is(_delayTimer.cyclesPerUpdate,29333);
});

test('DelayTimer: properties update',t=>{
	let _delayTimer = new DelayTimer(1760000,60);
	_delayTimer.initialize();
 	 //CHECK: update clock frequency to check for updated cycles per update value
	_delayTimer.clockFrequency=3520000;
	t.is(_delayTimer.clockFrequency,3520000);
	t.is(_delayTimer.cyclesPerUpdate,58666);
	t.is(_delayTimer.pollingFrequency,60);
	//CHECK: update polling frequency to check for updated cycles per update value
	_delayTimer.pollingFrequency=120;
	t.is(_delayTimer.clockFrequency,3520000);
	t.is(_delayTimer.cyclesPerUpdate,29333);
	t.is(_delayTimer.pollingFrequency,120);
});

test('DelayTimer:register',t=>{
	let _delayTimer = new DelayTimer(1760000,60);
	_delayTimer.initialize();
	//CHECK: that register is set to 0
	t.is(_delayTimer.register,0);
	_delayTimer.register = 60;
	//CHECK: check that register is set to 60
	t.is(_delayTimer.register,60);
});

test('DelayTimer:update', t=>{
	let _delayTimer = new DelayTimer(1760000,60);
	_delayTimer.initialize();
	_delayTimer.register=2;
	_delayTimer.update(29333);
	t.is(_delayTimer.register,1);
	t.is(_delayTimer.cyclesProcessed,0);
	_delayTimer.update(29333);
	t.is(_delayTimer.register,0);
	t.is(_delayTimer.cyclesProcessed,0);
	_delayTimer.update(29333);
	t.is(_delayTimer.register,0);
	t.is(_delayTimer.cyclesProcessed,0);
});	

test('DelayTimer:reset', t =>{
	let _delayTimer = new DelayTimer(1760000,60);
	_delayTimer.initialize();
	_delayTimer.register=60;
	_delayTimer.update(50);
	_delayTimer.reset();
	t.is(_delayTimer.register,0);
	t.is(_delayTimer.cyclesProcessed,0);
});

