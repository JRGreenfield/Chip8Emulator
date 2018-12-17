'use strict';

import test from 'ava';
import {MockKeyboardHandler} from './mockKeyboardHandler';
import {InputManager} from '../src/inputManager';

test('initialization test', t => {
    let _keyboardHandler = new MockKeyboardHandler();
    _keyboardHandler.initialize();
    let _inputManager = new InputManager(_keyboardHandler,1760000,1000);
    _inputManager.initialize();
	t.is(_inputManager.clockFrequency,1760000);
	t.is(_inputManager.pollingFrequency,1000);
    t.is(_inputManager.cyclesPerUpdate,1760);
});

test('properties update test',t=>{
    let _keyboardHandler = new MockKeyboardHandler();
    _keyboardHandler.initialize();
    let _inputManager = new InputManager(_keyboardHandler,1760000,1000);
    _inputManager.initialize();
    //CHECK: update clock frequency to check for updated cycles per update value
    _inputManager.clockFrequency=3520000;
    t.is(_inputManager.clockFrequency,3520000);
    t.is(_inputManager.pollingFrequency,1000);
    t.is(_inputManager.cyclesPerUpdate,3520);
    //CHECK: update polling frequency to check for updated cycles per update value
    _inputManager.pollingFrequency=2000;
    t.is(_inputManager.clockFrequency,3520000);
    t.is(_inputManager.pollingFrequency,2000);
    t.is(_inputManager.cyclesPerUpdate,1760);
});

test('keydown/keyup polling test', t => {
    let _keyboardHandler = new MockKeyboardHandler();
    _keyboardHandler.initialize();
    _keyboardHandler.mapKey(49,1);
    _keyboardHandler.mapKey(50,2);
    _keyboardHandler.mapKey(51,3);
    _keyboardHandler.mapKey(52,0xC);
    _keyboardHandler.mapKey(81,4);
    _keyboardHandler.mapKey(87,5);
    _keyboardHandler.mapKey(69,6);
    _keyboardHandler.mapKey(82,0xD);
    _keyboardHandler.mapKey(65,7);
    _keyboardHandler.mapKey(83,8);
    _keyboardHandler.mapKey(68,9);
    _keyboardHandler.mapKey(70,0xE);
    _keyboardHandler.mapKey(90,0xA);
    _keyboardHandler.mapKey(88,0);
    _keyboardHandler.mapKey(67,0xB);
    _keyboardHandler.mapKey(86,0xF);
    let _inputManager = new InputManager(_keyboardHandler,1760000,1000);
    _inputManager.initialize();
    //CHECK:on keypress down and running a 1000 cycles, register is set to 1 and cycles processed is set to 0
    _keyboardHandler.recordKeyPressDown(88,false,false,false,false);
    _inputManager.update(1760);
    t.is(_inputManager.register,1);
    t.is(_inputManager.cyclesProcessed,0);
    //CHECK:on keypress up and running a 1000 cycles, register is set to 0 and cycles processed is set to 0
    _keyboardHandler.recordKeyPressUp(88,false,false,false,false);
    _inputManager.update(1760);
    t.is(_inputManager.register,0);
    t.is(_inputManager.cyclesProcessed,0);
    //CHECK:all keypress down values after update register should be 65535 (1111 1111 1111 1111)
    _keyboardHandler.recordKeyPressDown(88,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(49,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(50,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(51,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(81,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(87,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(69,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(65,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(83,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(68,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(90,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(67,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(52,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(82,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(70,false,false,false,false);
    _keyboardHandler.recordKeyPressDown(86,false,false,false,false);
    _inputManager.update(1760);
    t.is(_inputManager.register,65535);
    //CHECK: all keypress up values after update, register should be 0 (0000 0000 0000 0000)
    _keyboardHandler.recordKeyPressUp(88,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(88,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(49,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(50,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(51,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(81,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(87,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(69,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(65,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(83,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(68,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(90,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(67,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(52,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(82,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(70,false,false,false,false);
    _keyboardHandler.recordKeyPressUp(86,false,false,false,false);
    _inputManager.update(1760);
    t.is(_inputManager.register,0);
});

test('reset test', t => {
    let _keyboardHandler = new MockKeyboardHandler();
    _keyboardHandler.initialize();
    _keyboardHandler.mapKey(88,0);
    let _inputManager = new InputManager(_keyboardHandler,1760000,1000);
    _inputManager.initialize();
    _keyboardHandler.recordKeyPressDown(88,false,false,false,false);
    _inputManager.update(1762);
    t.is(_inputManager.register,1);
    t.is(_inputManager.cyclesProcessed,2);
    _inputManager.reset();
    t.is(_inputManager.register,0);
    t.is(_inputManager.cyclesProcessed,0);
});

