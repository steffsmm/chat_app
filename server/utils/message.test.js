const expect = require('expect');
var {generateMessage,generateLocationMessage} =  require('./message');

describe('generateMessage',()=>{
  it("should generate correct message object",()=>{
    var from = "user1"
    var text = "whats up"
    var messageObj = generateMessage(from,text)
    expect(messageObj).toInclude({from, text});
    expect(messageObj.createdAt).toBeA("number");
  })

})

describe('createNewLocationMessage',()=>{
  it('should generate correct location object',()=>{
    var from = "user1"
    var latitude = 1,longitude=1,url="https://www.google.bg/maps/q=1,1";
    var messageObj = generateLocationMessage(from,latitude,longitude);
    expect(messageObj).toInclude({from, url});
    expect(messageObj.url).toBe(`https://www.google.bg/maps/q=1,1`)

  })
})
