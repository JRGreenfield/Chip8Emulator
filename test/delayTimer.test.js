'use strict';

import test from 'ava';
import {DelayTimer} from '../src/delayTimer';

test('DelayTimer:initialize/properties test', t => {
	let _delayTimer = new DelayTimer(1000,1760000);
	_delayTimer.initialize();
	t.is(_delayTimer.register,0);
	t.is(_delayTimer.clockFrequency,1760000);
	t.is(_delayTimer.pollingFrequency,1000);
	t.is(_delayTimer.cyclesPerUpdate,1760);
	_delayTimer.clockFrequency=3520000;
	t.is(_delayTimer.cyclesPerUpdate,3520);
	_delayTimer.pollingFrequency=2000;
	t.is(_delayTimer.cyclesPerUpdate,1760);
});

test('DelayTimer:reset test', t =>{
	let _delayTimer = new DelayTimer(1000,1760000);
	_delayTimer.initialize();
	_delayTimer.register=60;
	t.is(_delayTimer.register,60);
	_delayTimer.reset();
	t.is(_delayTimer.register,0);
});

test('DelayTimer:cycle test', t=>{
	let _delayTimer = new DelayTimer(1000,1760000);
	_delayTimer.initialize();
	_delayTimer.register=2;
	_delayTimer.update(3522);
	t.is(_delayTimer.register,0);
	_delayTimer.update(3522);
	t.is(_delayTimer.register,0);
});	

