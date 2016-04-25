var ms = require('../index.js');

describe('Test', function(){
    describe('ms(empty)', function(){
        it('should return 0', function(){
            expect(ms()).toEqual(0);
        });
    });
    describe('ms(...numbers)', function(){
        it('should return 0 for negative', function(){
            expect(ms(-300)).toEqual(0);
        });
        it('should work for ms(ms)', function(){
            expect(ms(0)).toEqual(0);
            expect(ms(500)).toEqual(500);
        });
        it('should work for ms(s, ms)', function(){
            expect(ms(2,50)).toEqual(2000 + 50);
        });
        it('should work for ms(m, s, ms)', function(){
            expect(ms(3,2,7)).toEqual(3*60*1000 + 2*1000 + 7);
        });
        it('should work for ms(h, m, s, ms)', function(){
            expect(ms(5,2,3,8)).toEqual(5*60*60*1000 + 2*60*1000 + 3*1000 + 8);
        });
        it('should work for ms(d, h, m, s, ms)', function(){
            expect(ms(5,2,3,8,9)).toEqual(5*24*60*60*1000 + 2*60*60*1000 + 3*60*1000 + 8*1000 + 9);
        });
        it('should work for ms(y, d, h, m, s, ms)', function(){
            expect(ms(5,2,3,8,9,1)).toEqual(5*365.25*24*60*60*1000 + 2*24*60*60*1000 + 3*60*60*1000 + 8*60*1000 + 9*1000 + 1);
        });
    });
    describe('ms(string)', function(){
        it('should preserve ms', function () {
            expect(ms('100')).toEqual(100);
        });

        it('should convert from m to ms', function () {
            expect(ms('1m')).toEqual(60000);
        });

        it('should convert from h to ms', function () {
            expect(ms('1h')).toEqual(3600000);
        });

        it('should convert d to ms', function () {
            expect(ms('2d')).toEqual(172800000);
        });

        it('should convert s to ms', function () {
            expect(ms('1s')).toEqual(1000);
        });

        it('should convert ms to ms', function () {
            expect(ms('100ms')).toEqual(100);
        });

        it('should work with decimals', function () {
            expect(ms('1.5h')).toEqual(5400000);
        });

        it('should work with multiple spaces', function () {
            expect(ms('1   s')).toEqual(1000);
        });

        it('should return NaN if invalid', function () {
            expect(isNaN(ms('☃'))).toEqual(true);
        });

        it('should be case-insensitive', function () {
            expect(ms('1.5H')).toEqual(5400000);
        });

        it('should work with numbers starting with .', function () {
            expect(ms('.5ms')).toEqual(.5);
        });
    });

    describe('ms(long string)', function(){
        it('should convert milliseconds to ms', function () {
            expect(ms('53 milliseconds')).toEqual(53);
        });

        it('should convert msecs to ms', function () {
            expect(ms('17 msecs')).toEqual(17);
        });

        it('should convert sec to ms', function () {
            expect(ms('1 sec')).toEqual(1000);
        });

        it('should convert from min to ms', function () {
            expect(ms('1 min')).toEqual(60000);
        });

        it('should convert from hr to ms', function () {
            expect(ms('1 hr')).toEqual(3600000);
        });

        it('should convert days to ms', function () {
            expect(ms('2 days')).toEqual(172800000);
        });

        it('should work with decimals', function () {
            expect(ms('1.5 hours')).toEqual(5400000);
        });
    });

    describe('ms(join string)', function(){
        it('should preserve ms', function () {
            expect(isNaN(ms('100 100'))).toBe(true);
        });

        it('should able to take more than one unit', function () {
            expect(ms('1m 2s')).toEqual(60000 + 2000);
            expect(ms('1h 5m 2 sec')).toEqual(3600000 + 5*60*1000 + 2*1000);
            expect(ms('2.5d 3 hours 5.4m 6 milliseconds')).toEqual(2.5*24*60*60*1000 + 3*60*60*1000 + 5.4*60*1000 + 6);
            expect(ms('1 Second 22   hours')).toEqual(1000 + 22*60*60*1000);
            expect(ms('.4h .3m')).toEqual(0.4*60*60*1000 + 0.3*60*1000);
        });
        it('should return NaN if part of the string is valid', function () {
            expect(isNaN(ms('.4h .3m 5g'))).toEqual(true);
            expect(isNaN(ms('.4h .3m 5.2.3s'))).toEqual(true);
            expect(isNaN(ms('1 second ☃'))).toEqual(true);
        });
    });

    describe('ms(object)', function(){
        it('should take in object', function () {
            expect(ms({h: 4, m: 5})).toEqual(4*60*60*1000 + 5*60*1000);
            expect(ms({hour: 2, minute: 30})).toEqual(2*60*60*1000 + 30*60*1000);
        });
        it('should take in object with decimal', function () {
            expect(ms({d: 2.3, minute: 53})).toEqual(2.3*24*60*60*1000 + 53*60*1000);
            expect(ms({hours: 2, days: 0.5})).toEqual(0.5*24*60*60*1000 + 2*60*60*1000);
        });
        it('should ok with repeat key', function () {
            expect(ms({min: 2.3, minute: 53, m: 44})).toEqual((2.3+53+44)*60*1000);
            expect(ms({hours: 2, h: 0.3, hour: 3, s: 5, second: 8})).toEqual((2+0.3+3)*60*60*1000 + (5+8)*1000);
        });
        it('should still work for number string passed in', function(){
            expect(ms({sec: '2.3', m: '44'})).toEqual(44*60*1000 + 2.3*1000);
        })
        it('should return NaN if non number is passed in', function () {
            expect(isNaN(ms({min: 'b'}))).toBe(true);
            expect(isNaN(ms({min: 2.3, minute: 53, m: 'a'}))).toBe(true);
        });
    });
    describe('ms().chainable', function(){
        it('should able to chain', function () {
            expect(ms(500).ms(5)).toEqual(500 + 5);
            expect(ms('1m').s(5)).toEqual(60000 + 5000);
            expect(ms('1m 2s').h(5).minute(6)).toEqual(60000 + 2000 + 5*60*60*1000 + 6*60*1000);
            expect(ms({h: 4, m: 5}).hours(0.5)).toEqual(4*60*60*1000 + 5*60*1000 + 0.5*60*60*1000);
        });
        it('should able to chain with string', function () {
            expect(ms(500).ms('5')).toEqual(500 + 5);
            expect(ms('1m').s('5')).toEqual(60000 + 5000);
            expect(ms('1m 2s').h('5').minute('6')).toEqual(60000 + 2000 + 5*60*60*1000 + 6*60*1000);
            expect(ms({h: 4, m: 5}).hours('0.5')).toEqual(4*60*60*1000 + 5*60*1000 + 0.5*60*60*1000);
        });
        it('should able to chain add', function () {
            expect(ms(500).ms('5').add(3,2,7)).toEqual(500 + 5 + 3*60*1000 + 2*1000 + 7);
            expect(ms('1m').add('5s').add('1 hr')).toEqual(60000 + 5000 + 3600000);
            expect(ms(500).add('1m 2s').ms('5')).toEqual(500 + 5 + 60000 + 2000);
            expect(ms(500).ms('5').add({h: 4, m: 5})).toEqual(500 + 5 + 4*60*60*1000 + 5*60*1000);
        });
        it('should able to chain subtract', function () {
            expect(ms(500).ms('5').minus(3,2,7)).toEqual(500 + 5 - (3*60*1000 + 2*1000 + 7));
            expect(ms('1m').add('5s').sub('1 hr')).toEqual(60000 + 5000 - 3600000);
            expect(ms(500).add('1m 2s').ms('5')).toEqual(500 + 5 + 60000 + 2000);
            expect(ms(500).ms('5').subtract({h: 4, m: 5})).toEqual(500 + 5 - (4*60*60*1000 + 5*60*1000));
        });
        it('should able to chain NaN', function(){
            expect(function(){ ms('1 second ☃').ms(5); }).not.toThrow();
            expect(function(){ ms({min: 'b'}).ms(5); }).not.toThrow();
        });
        it('should able to chain return NaN', function(){
            expect(isNaN(ms(500).ms('1 second ☃'))).toBe(true);
            expect(isNaN(ms('1m').ms({min: 'b'}))).toBe(true);
        });
        it('should able to chain NaN and continue to chain', function(){
            expect(isNaN(ms(500).ms('1 second ☃').ms(5))).toBe(true);
            expect(isNaN(ms('1m').ms({min: 'b'}).ms(5))).toBe(true);
        });

    });

    describe('readme should at least work', function(){
        it('should return 90000', function(){
            expect(ms(90000)).toEqual(90000);
            expect(ms(90, 0)).toEqual(90000);
            expect(ms(1, 30, 0)).toEqual(90000);
            expect(ms(0, 1, 30, 0)).toEqual(90000);
            expect(ms(0, 0, 1, 30, 0)).toEqual(90000);
            expect(ms(0, 0, 0, 1, 30, 0)).toEqual(90000);
            expect(ms(0, 0, 0.025, 0, 0, 0)).toEqual(90000);
            expect(ms('1m 30s')).toEqual(90000);
            expect(ms('1minute 30s')).toEqual(90000);
            expect(ms('1 min 30 sec')).toEqual(90000);
            expect(ms('1.5 min')).toEqual(90000);
            expect(ms({minute: 1, second: 30})).toEqual(90000);
            expect(ms({min: 1, seconds: 30})).toEqual(90000);
            expect(ms({m: 1, s: 30})).toEqual(90000);
            expect(ms({m: 0.5, minute: 0.5, second: 15, s: 15})).toEqual(90000);
            expect(ms('1m').second(30)).toEqual(90000);
            expect(ms(30, 0).m(1)).toEqual(90000);
            expect(ms({ms: 1000}).second(29).m('1')).toEqual(90000);
            expect(ms('1m').s(5).add('10 seconds').add({s: 5}).add(5, 0).second(5)).toEqual(90000);
        });
        it('should be NaN', function(){
            expect(isNaN(ms('1m').second('abc'))).toBe(true);
            expect(isNaN(ms('1b').hour(5))).toBe(true);
            expect(isNaN(ms({m: 'foo'}))).toBe(true);
        });
    })
});
