'use strict';

import test from 'ava';
import {MockKeyboardHandler} from './mockKeyboardHandler';
import {InputManager} from '../src/inputManager';

let _keyboardHandler = new MockKeyboardHandler();
_keyboardHandler.initialize();
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

test('InputManager:initialize/properties test', t => {
    let _inputManager = new InputManager(1000,1760000,_keyboardHandler);
    _inputManager.initialize();
    t.is(_inputManager.register,0);
	t.is(_inputManager.clockFrequency,1760000);
	t.is(_inputManager.pollingFrequency,1000);
    t.is(_inputManager.cyclesPerUpdate,1760);
    _inputManager.clockFrequency=3520000;
	t.is(_inputManager.cyclesPerUpdate,3520);
	_inputManager.pollingFrequency=2000;
	t.is(_inputManager.cyclesPerUpdate,1760);
});

