'use strict';

export function MockRandomNumberGenerator()
{
    this.getRandomInteger=function(minRange,maxRange)
    {
        return 1;
    }
}