import fs from 'node:fs';

const imagePath = '/Users/huakun/Desktop/000000.jpg';
const encode = 'base64';
const rawImgBuf = fs.readFileSync(imagePath);
const encodedStr = rawImgBuf.toString(encode);
const recoveredBuf = Buffer.from(encodedStr, encode);
fs.writeFileSync('test.jpg', recoveredBuf);
console.log(encodedStr.length);

// the other way
const base64Raw = fs.readFileSync(imagePath, {encoding: 'base64'});
fs.writeFileSync('test2.jpg', Buffer.from(base64Raw, 'base64'));
