const expect = require('expect');
var {generateMessage} =  require('./message');

describe('generateMessage',()=>{
  it("should generate correct message object",()=>{
    var from = "user1"
    var text = "whats up"
    var messageObj = generateMessage(from,text)
    expect(messageObj).toInclude({from, text});
    expect(messageObj.createdAt).toBeA("number");
  })

})
