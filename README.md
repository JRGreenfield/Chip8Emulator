# Chip8Emulator
Chip-8 Emulator

Yet another Chip-8 emulator that can run in your web browser. 

## Development
Developed using ES6 Javascript, WebGL, and React.  Webpack and Babel are used to 
transpile and bundle code for web deployment. 

## Instructions
Programs may be selected by using the drop-down menu. Once a program is selected, press the play button to start
the program. Program execution can be toggled by using the play and stop button.  Program execution may also be stepped 
through one opcode at a time by using the step button (the one that looks like a fast-forward button). 

The program's execution can also be tracked by using the stack and register table viewers and the opcode command 
decoder to the right of the screen.  Upon the execution of each opcode, these components values are updated on the 
screen.  This is useful for stepping through each opcode and understanding what is happening in the program.

The program's execution speed can also be increased/decreased by using the increase cpu frequency/decrease cpu frequency buttons
below the game screen.  The cpu frequency can be increased/decreased by units of 60Hz.

##Links
Check these links out if you are interested in developing your own Chip-8 emulator.

[Cowgod's Chip technical reference](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM)

[Mastering Chip-8](http://mattmik.com/files/chip8/mastering/chip8.html)

[Chip-8 Reference Manual useful for game instructions] (http://chip8.sourceforge.net/chip8-1.1.pdf)
