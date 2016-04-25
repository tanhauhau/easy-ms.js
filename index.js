'use strict';

var ms = require('ms');

var TIME_MULTIPLIER = {};
TIME_MULTIPLIER.millisecond = 1;
TIME_MULTIPLIER.second = 1000;
TIME_MULTIPLIER.minute = 60 * TIME_MULTIPLIER.second;
TIME_MULTIPLIER.hour = 60 * TIME_MULTIPLIER.minute;
TIME_MULTIPLIER.day = 24 * TIME_MULTIPLIER.hour;
TIME_MULTIPLIER.year = 365.25 * TIME_MULTIPLIER.day;
var TIME_ARRAY = [TIME_MULTIPLIER.millisecond, TIME_MULTIPLIER.second, TIME_MULTIPLIER.minute, TIME_MULTIPLIER.hour, TIME_MULTIPLIER.day, TIME_MULTIPLIER.year];
var TIME_LUT = {
    'year': TIME_MULTIPLIER.year,
    'yrs': TIME_MULTIPLIER.year,
    'yr': TIME_MULTIPLIER.year,
    'y': TIME_MULTIPLIER.year,
    'days': TIME_MULTIPLIER.day,
    'day': TIME_MULTIPLIER.day,
    'd': TIME_MULTIPLIER.day,
    'hours': TIME_MULTIPLIER.hour,
    'hour': TIME_MULTIPLIER.hour,
    'hrs': TIME_MULTIPLIER.hour,
    'hr': TIME_MULTIPLIER.hour,
    'h': TIME_MULTIPLIER.hour,
    'minutes': TIME_MULTIPLIER.minute,
    'minute': TIME_MULTIPLIER.minute,
    'mins': TIME_MULTIPLIER.minute,
    'min': TIME_MULTIPLIER.minute,
    'm': TIME_MULTIPLIER.minute,
    'seconds': TIME_MULTIPLIER.second,
    'second': TIME_MULTIPLIER.second,
    'secs': TIME_MULTIPLIER.second,
    'sec': TIME_MULTIPLIER.second,
    's': TIME_MULTIPLIER.second,
    'milliseconds': TIME_MULTIPLIER.millisecond,
    'millisecond': TIME_MULTIPLIER.millisecond,
    'msecs': TIME_MULTIPLIER.millisecond,
    'msec': TIME_MULTIPLIER.millisecond,
    'ms': TIME_MULTIPLIER.millisecond };

function extendNumber(val){
    for(var key in TIME_LUT){
        val[key] = addTime.bind(val, TIME_LUT[key]);
    }
    val.add = addParse.bind(val, 1);
    val.minus = val.sub
              = val.subtract
              = addParse.bind(val, -1);
    return val;
}
function addTime(base, add){
    return extendNumber(new Number(this + base * Number(add)));
}
function addParse(sign){
    sign = sign || 1;
    return extendNumber(new Number(this + sign * parseTime.apply(this, Array.prototype.slice.call(arguments, 1))));
}
var MS_PRELIM_REGEX = /^\s*((?:(?:[\.\d+]+\s*\w+)\s+)*\s*(?:[\.\d+]+\s*\w+)|\d+)\s*$/;
var MS_REGEX = /([\.\d+]+\s*\w+|^\d+$)/g;

function parseTime(){
    var time = 0;
    var len = Math.min(arguments.length, 6);
    if(len === 1){
        var arg = arguments[0];
        if(arg instanceof Object){
            for(let key in arg){
                if(TIME_LUT[key] !== undefined){
                    time += TIME_LUT[key] * Number(arg[key]);
                }
            }
        }else if(typeof arg === 'string'){
            var match;
            if(MS_PRELIM_REGEX.test(arg) && (match = arg.match(MS_REGEX)) !== null){
                for(let m of match){
                    var result = ms(m);
                    if(isNaN(result)){
                        time = NaN;
                        break;
                    }else{
                        time += result;
                    }
                };
            }else{
                time = NaN;
            }
        }else if(typeof arg === 'number'){
            time = arg;
        }
    }else{
        for(var i=len-1,j=0; i>=0; i--,j++){
            time += arguments[i] * TIME_ARRAY[j];
        }
    }
    if(!isNaN(time)){
        time = Math.max(0, time);
    }
    return extendNumber(new Number(time));
}

module.exports = parseTime;
