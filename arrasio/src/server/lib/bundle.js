/*jslint esversion: 6*/
/*jslint node: true */
'use strict';exports.a = {};exports.b = {};exports.c = {};//add variables to bunde files
// util.js
exports.a.addArticle = function(string) {return (/[aeiouAEIOU]/.test(string[0])) ? 'an ' + string : 'a ' + string;};exports.a.getDistance = function (p1, p2) {return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));};exports.a.getDirection = function (p1, p2) {return Math.atan2(p2.y - p1.y, p2.x - p1.x);};exports.a.clamp = function(value, min, max) {return Math.min(Math.max(value, min), max);};/*exports.a.angleDifference = function(a1, a2) {let diff1 = a2 - a1;while (diff1 >= 2*Math.PI) {diff1 -= 2*Math.PI;}while (diff1 < 0) {diff1 += 2*Math.PI;}let diff2 = a1 - a2;while (diff2 >= 2*Math.PI) {diff2 -= 2*Math.PI;}while (diff2 < 0) {diff2 += 2*Math.PI;}if (Math.abs(diff1) <= Math.abs(diff2)) { return diff1; }if (Math.abs(diff2) <= Math.abs(diff1)) { return diff2; }};*/exports.a.angleDifference = (() => {let mod = function(a, n) {return (a % n + n) % n;};return (sourceA, targetA) => { let a = targetA - sourceA;return mod(a + Math.PI, 2*Math.PI) - Math.PI;};})();exports.a.loopSmooth = (angle, desired, slowness) => {return exports.a.angleDifference(angle, desired)/slowness;};/*exports.a.loopClamp = function(angle, min, max) {angle = angle % (Math.PI * 2);min = min % (Math.PI * 2); if (min < 0) min += Math.PI * 2;max = max % (Math.PI * 2); if (max < 0) max += Math.PI * 2;let a = (max - min) % (Math.PI * 2); if (a < 0) a += Math.PI * 2;if (angle - min > a) return max;if (angle - min < 0) return min;return angle;};*//*exports.a.pointInArc = function(point, givenAngle, allowedDifference) {let len = Math.sqrt(point.x * point.x + point.y * point.y);let norm = { x: point.x / len, y: point.y / len, };let vect = { x: Math.cos(givenAngle), y: Math.sin(givenAngle), };let dot = norm.x * vect.x + norm.y * vect.y;let a1 = Math.atan2(point.y, point.x);let a2 = Math.acos(dot);let diff = exports.a.angleDifference(a1, a2);};*//*exports.a.isInArc = function(angle, arc) {return exports.a.loopClamp(angle, arc[0], arc[1]) == angle;};*/exports.a.deepClone = (obj, hash = new WeakMap()) => {let result;/*/ Do not try to clone primitives or functions*/if (Object(obj) !== obj || obj instanceof Function) return obj;if (hash.has(obj)) return hash.get(obj); /*/ Cyclic reference */try { /*/ Try to run constructor (without arguments, as we don't know them)*/result = new obj.constructor();} catch(e) { /*/ Constructor failed, create object without running the constructor */result = Object.create(Object.getPrototypeOf(obj));}/*/ Optional: support for some standard constructors (extend as desired) */if (obj instanceof Map)Array.from(obj, ([key, val]) => result.set(exports.a.deepClone(key, hash), exports.a.deepClone(val, hash)) );else if (obj instanceof Set)Array.from(obj, (key) => result.add(exports.a.deepClone(key, hash)) );/*/ Register in hash    */hash.set(obj, result);/*/ Clone and assign enumerable own properties recursively*/return Object.assign(result, ...Object.keys(obj).map (key => ({ [key]: exports.a.deepClone(obj[key], hash) }) ));};exports.a.averageArray = arr => {if (!arr.length) return 0;    var sum = arr.reduce((a, b) => { return a + b; });return sum / arr.length;};exports.a.sumArray = arr => {if (!arr.length) return 0;    var sum = arr.reduce((a, b) => { return a + b; });return sum;};exports.a.signedSqrt = x => {return Math.sign(x) * Math.sqrt(Math.abs(x));};exports.a.getJackpot = x => {return (x > 26300 * 1.5) ? Math.pow(x - 26300, 0.85) + 26300 : x / 1.5;};exports.a.serverStartTime = Date.now();/*/ Get a better logging function*/exports.a.time = () => {return Date.now() - exports.a.serverStartTime;};/*/ create a custom timestamp format for log statements*/exports.a.log = text => {console.log('[' + (exports.a.time()/1000).toFixed(3) + ']: ' + text);};exports.a.warn = text => {console.log('[' + (exports.a.time()/1000).toFixed(3) + ']: ' + '[WARNING] ' + text);};exports.a.error = text => {console.log(text);};exports.a.remove = (array, index) => {/*/ there is more than one object in the container*/if(index === array.length - 1){/*/ special case if the obj is the newest in the container*/return array.pop();} else {let o = array[index];array[index] = array.pop();return o;}};
// random.js
exports.b.random = x => {return x * Math.random();};exports.b.randomAngle = () => {return Math.PI * 2 * Math.random();};exports.b.randomRange = (min, max) => {return Math.random() * (max - min) + min;};exports.b.irandom = i => {let max = Math.floor(i);return Math.floor(Math.random() * (max + 1)); /*/Inclusive*/};exports.b.irandomRange = (min, max) => {min = Math.ceil(min);max = Math.floor(max);return Math.floor(Math.random() * (max - min + 1)) + min; /*/Inclusive*/};exports.b.gauss = (mean, deviation) => {let x1, x2, w;do {x1 = 2*Math.random() - 1;x2 = 2*Math.random() - 1;w = x1 * x1 + x2 * x2;} while (0 == w || w >= 1);w = Math.sqrt(-2 * Math.log(w) / w);return mean + deviation * x1 * w;};exports.b.gaussInverse = (min, max, clustering) => {let range = max - min;let output = exports.b.gauss(0, range / clustering);while (output < 0) {output += range;}while (output > range) {output -= range;}return output + min;};exports.b.gaussRing = (radius, clustering) => {let r = exports.b.random(Math.PI * 2);let d = exports.b.gauss(radius, radius*clustering);return {x: d * Math.cos(r),y: d * Math.sin(r),};};exports.b.chance = prob => {return exports.b.random(1) < prob;};exports.b.dice = sides => {return exports.b.random(sides) < 1;};exports.b.choose = arr => {return arr[exports.b.irandom(arr.length - 1)];};exports.b.chooseN = (arr, n) => {let o = [];for (let i=0; i<n; i++) {o.push(arr.splice(exports.b.irandom(arr.length - 1), 1)[0]);}return o;};exports.b.chooseChance = (...arg) => {let totalProb = 0;arg.forEach(function(value) { totalProb += value; });let answer = exports.b.random(totalProb);for (let i=0; i<arg.length; i++) {if (answer<arg[i]) return i;answer -= arg[i];}};
exports.b.chooseBotName = () => {
    return exports.b.choose([
        'Charlie',
        'Delta',
        'Echo',
        'Foxtrot',
        'Hotel',
        'India',
        'Juliet',
        'Kilo',
        'Lima',
        'Mike',
        'November',
        'Oscar',
        'Papa',
        'Quebec',
        'Romeo',
        'Sierra',
        'Tango',
        'Uniform',
        'Victor',
        'Whiskey',
        'X-Ray',
        'Yankee',
        'Zulu',
        /*'The Guy',
        'Insert Name Here',
        'Saturated Fat', 
        'Your doom',
        'BoB Da Builder',
        'HSUDGsdbsdIY',
        'Trapper',
        'Best namer ever',
        '101010001001',
        'Fortnite',
        'John',
        'John4',
        'Mr Bean',
        'The best name ever',
        'Killer',
        'I am not a Bot',
        'Tanky',
        '#1 person',
        'destoryer', 
        'memes are good for u',
        'happy Christmas',//change this depending on the season
        'Ghost',
        'N0ob',
        '🌌',*/
    ]);
};
exports.b.chooseBossName = (code, n) => {
    switch (code) {
    case 'a':
    return exports.b.chooseN([
        'Archimedes',
        'Akilina',
        'Anastasios',
        'Athena',
        'Alkaios',
        'Amyntas',
        'Aniketos',
        'Artemis',
        'Anaxagoras',
        'Apollon',
        'Acarous',
        'Shockwave'
    ], n);
    case 'castle':
    return exports.b.chooseN([
        'Berezhany',
        'Lutsk',
        'Dobromyl',
        'Akkerman',
        'Palanok',
        'Zolochiv',
        'Palanok',
        'Mangup',
        'Olseko',
        'Brody',
        'Isiaslav',
        'Kaffa',
        'Bilhorod'
    ], n);
    default: return 'God';
    }
};
// fasttalk.js

/*function checkEndian() {var arrayBuffer = new ArrayBuffer(2);var uint8Array = new Uint8Array(arrayBuffer);var uint16array = new Uint16Array(arrayBuffer);uint8Array[0] = 0xAA; // set first byteuint8Array[1] = 0xBB; // set second byteif(uint16array[0] === 0xBBAA) return 0;if(uint16array[0] === 0xAABB) return 1;else throw new Error("Something crazy just happened")}var isBigEndian = new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x12;var isLittleEndian = new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78;*/exports.c.encode = (() => {/*/ unsigned 8-bit integer*/var arrUint8 = new Uint8Array(1);/*/ unsigned 16-bit integer*/var arrUint16 = new Uint16Array(1);var charUint16 = new Uint8Array(arrUint16.buffer);/*/ unsigned 32-bit integer*/var arrUint32  = new Uint32Array(1);var charUint32 = new Uint8Array(arrUint32.buffer);/*/ 32-bit float*/var arrFloat32  = new Float32Array(1);var charFloat32 = new Uint8Array(arrFloat32.buffer);/*/ build some useful internal functions*/var typeEncoder = (type, number) => {let output = '';switch (type) {case 'RawUint8':arrUint8[0] = number;return String.fromCharCode(arrUint8[0]);case 'RawUint16':arrUint16[0] = number;return String.fromCharCode(charUint16[0], charUint16[1]);case 'Uint8':arrUint8[0] = number;return '0' + String.fromCharCode(arrUint8[0]);case 'Uint16':arrUint16[0] = number;return '1' + String.fromCharCode(charUint16[0], charUint16[1]);case 'Uint32':arrUint32[0] = number;return '2' + String.fromCharCode(charUint32[0], charUint32[1], charUint32[2], charUint32[3]);case 'Sint8':arrUint8[0] = -1 - number;return '3' + String.fromCharCode(arrUint8[0]);case 'Sint16':arrUint16[0] = -1 - number;return '4' + String.fromCharCode(charUint16[0], charUint16[1]);case 'Sint32':arrUint32[0] = -1 - number;return '5' + String.fromCharCode(charUint32[0], charUint32[1], charUint32[2], charUint32[3]);case 'Float32':arrFloat32[0] = number;return '6' + String.fromCharCode(charFloat32[0], charFloat32[1], charFloat32[2], charFloat32[3]);case 'String8':return '7' + typeEncoder('RawUint16', number.length) + number;case 'String16':for (let i=0, strLen=number.length; i < strLen; i++) {output += typeEncoder('RawUint16', number.charCodeAt(i));}return '8' + typeEncoder('RawUint16', output.length) + output;default: throw new Error('Unknown encoding type.');}};var findType = value => {if (typeof value === 'string') {for (var i = 0; i < value.length; i++) {if (value.charCodeAt(i) > 255) return 'String16';}return 'String8';}if (typeof value === 'boolean') return 'Uint8';if (typeof value !== 'number') { console.log(value); throw new Error('Unencodable data type!'); }if (value != Math.round(value)) return 'Float32';if (value < 0) {if (value >= -256) return 'Sint8';if (value >= -65535) return 'Sint16';if (value >= -4294967295) return 'Sint32';} else {if (value < 256) return 'Uint8';if (value < 65535) return 'Uint16';if (value < 4294967295) return 'Uint32';}return 'Float32';};/*/ build the function*/return (arr, verbose = false) => {let output = arr.splice(0, 1)[0];if (typeof output !== 'string') throw new Error('No identification code!');arr.forEach((value) => { output += typeEncoder(findType(value), value); });let len = output.length;let buffer = new ArrayBuffer(len);let integerView = new Uint8Array(buffer);for (let i=0; i<len; i++) {integerView[i] = output.charCodeAt(i);}if (verbose) {console.log('OUTPUT: ' + integerView);console.log('RAW OUTPUT: ' + output);console.log('SIZE: ' + len);}return buffer;};})();exports.c.decode = (() => {/*/ unsigned 8-bit integer (none needed)*//*/ unsigned 16-bit integer*/var arrUint16 = new Uint16Array(1);var charUint16 = new Uint8Array(arrUint16.buffer);/*/ unsigned 32-bit integer*/var arrUint32  = new Uint32Array(1);var charUint32 = new Uint8Array(arrUint32.buffer);/*/ 32-bit float*/var arrFloat32  = new Float32Array(1);var charFloat32 = new Uint8Array(arrFloat32.buffer);/*/ build a useful internal function*/var typeDecoder = (str, type, offset) => {switch(type) {case 'Uint8':return str.charCodeAt(offset++); case 'Uint16':for (let i=0; i<2; i++) {charUint16[i] = str.charCodeAt(offset++);}  return arrUint16[0]; case 'Uint32':for (let i=0; i<4; i++) {charUint32[i] = str.charCodeAt(offset++);}  return arrUint32[0];        case 'Sint8':return -1 - str.charCodeAt(offset++);case 'Sint16':for (let i=0; i<2; i++) {charUint16[i] = str.charCodeAt(offset++);}return -1 - arrUint16[0];case 'Sint32':for (let i=0; i<4; i++) {charUint32[i] = str.charCodeAt(offset++);}return -1 - arrUint32[0];case 'Float32':for (let i=0; i<4; i++) {charFloat32[i] = str.charCodeAt(offset++);}  return arrFloat32[0];default: throw new Error('Unknown decoding type!');}};/*/ actually decode it*/
    return raw => { try {let intView = new Uint8Array(raw);
        let str = '';
        for (let i=0, len=intView.length; i<len; i++) {
            str += String.fromCharCode(intView[i]);
        }
        let offset = 1;
        let output = [str.charAt(0)];
        while (offset < str.length) {
            switch (str[offset++]) {
            case '0': output.push(typeDecoder(str, 'Uint8', offset)); offset++; break;
            case '1': output.push(typeDecoder(str, 'Uint16', offset)); offset+=2; break;
            case '2': output.push(typeDecoder(str, 'Uint32', offset)); offset+=4; break;
            case '3': output.push(typeDecoder(str, 'Sint8', offset)); offset++; break;
            case '4': output.push(typeDecoder(str, 'Sint16', offset)); offset+=2; break;
            case '5': output.push(typeDecoder(str, 'Sint32', offset)); offset+=4; break;
            case '6': output.push(typeDecoder(str, 'Float32', offset)); offset+=4; break;
            case '7': { // String8
                let len = typeDecoder(str, 'Uint16', offset); offset+=2;
                output.push(str.slice(offset, offset + len)); 
                offset += len;
            } break;
            case '8': { // String16
                let len = typeDecoder(str, 'Uint16', offset); offset+=2;
                let arr = str.slice(offset, offset + len);
                let buf = new Uint16Array(len/2);
                for (let i=0; i<len; i+=2) {
                    buf[i/2] = typeDecoder(arr, 'Uint16', i);
                }
                output.push(String.fromCharCode.apply(null, buf));   
                offset += len;
            } break;
            default: offset = str.length; throw new Error('Unknown decoding command. Decoding exited.');
            }
        }
        return output;
    } catch(err) { console.log(err); return -1; } };
})();