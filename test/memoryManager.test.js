import test from 'ava';
import {MemoryManager} from '../src/memoryManager';

test('read/write byte test',t =>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	_mmu.writeByte(0x200,0xFF);
	_mmu.writeByte(0x201,0XF0);
	t.is(_mmu.readByte(0x200),0xFF);
	t.is(_mmu.readByte(0x201),0xF0);
});

test('read/write word test',t =>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	_mmu.writeWord(0x200,0xFFF0);
	t.is(_mmu.readWord(0x200),0xFFF0);
	t.is(_mmu.readByte(0x200),0xFF);
	t.is(_mmu.readByte(0x201),0xF0);
});

test('reset test',t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	_mmu.writeByte(0x200,0xFF);
	_mmu.reset();
	t.is(_mmu.readByte(0x200),0);
});

test('write byte restricted area exception test', t =>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	const error = t.throws(()=>{
		_mmu.writeByte(0x199,0xFF);
	});
	t.is(error.message,'mmu:writeByte - restricted area of memory');
});

test('write byte address out of range exception test', t =>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	//CHECK: out of bounds max range
	let error = t.throws(()=>{
		_mmu.writeByte(0x1000,0xFF);
	});
	t.is(error.message,'mmu:writeByte - address is out of range');
	//CHECK: out of bounds min range
	error = t.throws(()=>{
		_mmu.writeByte(-1,0xFF);
	});
	t.is(error.message,'mmu:writeByte - address is out of range');
});

test('read byte address out of range exception test', t =>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	//CHECK: out of bounds max range
	let error = t.throws(()=>{
		_mmu.readByte(0x1000);
	});
	t.is(error.message,'mmu:readByte - address is out of range');
	//CHECK: out of bounds min range 
	error = t.throws(()=>{
		_mmu.readByte(-1);
	});
	t.is(error.message,'mmu:readByte - address is out of range');
});

test('write word restricted area exception test', t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	//CHECK:out of bounds range max range
	let error = t.throws(()=>{
		_mmu.writeWord(0x199,0xFF);
	});
	t.is(error.message,'mmu:writeWord - restricted area of memory');
	//CHECK: out of bounds min range 
	error = t.throws(()=>{
		_mmu.writeWord(-1);
	});
	t.is(error.message,'mmu:writeWord - address is out of range');
});

test('write word address out of range exception test', t =>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	//CHECK: out of bounds max range
	let error = t.throws(()=>{
		_mmu.writeWord(0xFFF,0xFF);
	});
	t.is(error.message,'mmu:writeWord - address is out of range');
	//CHECK: out of bounds min range
	error = t.throws(()=>{
		_mmu.writeWord(-1,0xFF);
	});
	t.is(error.message,'mmu:writeWord - address is out of range');
});

test('read word address out of range exception test', t =>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	//CHECK: out of bounds max range
	let error = t.throws(()=>{
		_mmu.readWord(0xFFF);
	});
	t.is(error.message,'mmu:readWord - address is out of range');
	//CHECK: out of bounds min range 
	error = t.throws(()=>{
		_mmu.readWord(-1);
	});
	t.is(error.message,'mmu:readWord - address is out of range');
});

test('0 sprite test', t => {
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(0),0xF0);
	t.is(_mmu.readByte(1),0x90);
	t.is(_mmu.readByte(2),0x90);
	t.is(_mmu.readByte(3),0x90);
	t.is(_mmu.readByte(4),0xF0);
});

test('1 sprite test', t => {
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(5),0x20);
	t.is(_mmu.readByte(6),0x60);
	t.is(_mmu.readByte(7),0x20);
	t.is(_mmu.readByte(8),0x20);
	t.is(_mmu.readByte(9),0x70);
});

test('2 sprite test', t => {
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(10),0xF0);
	t.is(_mmu.readByte(11),0x10);
	t.is(_mmu.readByte(12),0xF0);
	t.is(_mmu.readByte(13),0x80);
	t.is(_mmu.readByte(14),0xF0);
});

test('3 sprite test', t => {
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(15),0xF0);
	t.is(_mmu.readByte(16),0x10);
	t.is(_mmu.readByte(17),0xF0);
	t.is(_mmu.readByte(18),0x10);
	t.is(_mmu.readByte(19),0xF0);
});

test('4 sprite test', t => {
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(20),0x90);
	t.is(_mmu.readByte(21),0x90);
	t.is(_mmu.readByte(22),0xF0);
	t.is(_mmu.readByte(23),0x10);
	t.is(_mmu.readByte(24),0x10);
});

test('5 sprite test', t => {
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(25),0xF0);
	t.is(_mmu.readByte(26),0x80);
	t.is(_mmu.readByte(27),0xF0);
	t.is(_mmu.readByte(28),0x10);
	t.is(_mmu.readByte(29),0xF0);
});

test('6 sprite test', t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(30),0xF0);
	t.is(_mmu.readByte(31),0x80);
	t.is(_mmu.readByte(32),0xF0);
	t.is(_mmu.readByte(33),0x90);
	t.is(_mmu.readByte(34),0xF0);
});

test('7 sprite test', t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(35),0xF0);
	t.is(_mmu.readByte(36),0x10);
	t.is(_mmu.readByte(37),0x20);
	t.is(_mmu.readByte(38),0x40);
	t.is(_mmu.readByte(39),0x40);
});

test('8 sprite test', t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(40),0xF0);
	t.is(_mmu.readByte(41),0x90);
	t.is(_mmu.readByte(42),0xF0);
	t.is(_mmu.readByte(43),0x90);
	t.is(_mmu.readByte(44),0xF0);
});

test('9 sprite test', t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(45),0xF0);
	t.is(_mmu.readByte(46),0x90);
	t.is(_mmu.readByte(47),0xF0);
	t.is(_mmu.readByte(48),0x10);
	t.is(_mmu.readByte(49),0xF0);
});

test('A sprite test', t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(50),0xF0);
	t.is(_mmu.readByte(51),0x90);
	t.is(_mmu.readByte(52),0xF0);
	t.is(_mmu.readByte(53),0x90);
	t.is(_mmu.readByte(54),0x90);
});

test('B sprite test', t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(55),0xE0);
	t.is(_mmu.readByte(56),0x90);
	t.is(_mmu.readByte(57),0xE0);
	t.is(_mmu.readByte(58),0x90);
	t.is(_mmu.readByte(59),0xE0);
});

test('C sprite test', t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(60),0xF0);
	t.is(_mmu.readByte(61),0x80);
	t.is(_mmu.readByte(62),0x80);
	t.is(_mmu.readByte(63),0x80);
	t.is(_mmu.readByte(64),0xF0);
});

test('D sprite test', t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(65),0xE0);
	t.is(_mmu.readByte(66),0x90);
	t.is(_mmu.readByte(67),0x90);
	t.is(_mmu.readByte(68),0x90);
	t.is(_mmu.readByte(69),0xE0);
});

test('E sprite test', t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(70),0xF0);
	t.is(_mmu.readByte(71),0x80);
	t.is(_mmu.readByte(72),0xF0);
	t.is(_mmu.readByte(73),0x80);
	t.is(_mmu.readByte(74),0xF0);
});

test('F sprite test', t=>{
	let _mmu = new MemoryManager(4096);
	_mmu.initialize();
	t.is(_mmu.readByte(75),0xF0);
	t.is(_mmu.readByte(76),0x80);
	t.is(_mmu.readByte(77),0xF0);
	t.is(_mmu.readByte(78),0x80);
	t.is(_mmu.readByte(79),0x80);
});