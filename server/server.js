const path = require('path');
const publicPath = path.join(__dirname,"../public")
const express    = require('express')
const app = express()

app.use(express.static(publicPath))
const port = process.env.PORT || 3000;

// app.get('/', function(req, res){
//     res.send(`${publicPath}\\index.html`);
// });

app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});
