'use strict';

export function RandomNumberGenerator()
{
    this.getRandomInteger=function(minRange,maxRange)
    {
        Math.floor(Math.random() * Math.floor(maxRange-minRange+1)+minRange);
    }
}