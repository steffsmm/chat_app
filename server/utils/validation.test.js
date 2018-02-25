const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString',()=>{
  it('should reject non-string',()=>{
    var nonString = 3;
    expect(isRealString(nonString)).toBe(false);
  });
  it('should reject string with only spaces',()=>{
    var spaceString = " ";
    expect(isRealString(spaceString)).toBe(false);
  });
  it('should allow string with non spaces',()=>{
    var aString = " gfdg";
    expect(isRealString(aString)).toBe(true);
  });
})
