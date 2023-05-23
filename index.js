const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const alltoys = require('./Data/toys.json')


// middleware
app.use(cors());
app.use(express.json());


app.get('/alltoys' , (req,res)=>{
    res.send(alltoys)
})

app.get('/alltoys/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const findingdata = alltoys.find(singleData => parseInt(singleData.id) === id)
    res.send(findingdata)
})




app.get('/',(req, res)=>{
    res.send('Toy marketplace is running')
})
app.listen(port,()=>{
    console.log(`Server is running pn port: ${port}`)
})