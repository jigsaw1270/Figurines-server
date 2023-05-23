const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const alltoys = require('./Data/toys.json')


// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@jigsaw1270.6chjsjt.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });




  async function run() {
    try {
    
      await client.connect();

      const toyclintcollection = client.db('toyDB').collection('toy');

//get
app.get('/toy', async (req, res) => {
    const cursor = toyclintcollection.find();
    const result = await cursor.toArray();
    res.send(result);
})
app.get('/toy/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await toyclintcollection.findOne(query);
    res.send(result);
})

app.post('/toy', async (req, res) => {
    const newtoy = req.body;
    console.log(newtoy);
    const result = await toyclintcollection.insertOne(newtoy);
    res.send(result);
})

app.put('/toy/:id', async(req, res) => {
    const id = req.params.id;
    const toy = req.body;
    const filter = {_id: new ObjectId(id)}
    const options = { upsert: true };
    const updatedtoy =  {

    
        $set: {
            name: toy.name, 
            quantity: toy.quantity, 
            productName: toy.productName, 
            sub: toy.sub, 
            rating: toy.rating,
            price: toy.price, 
            description: toy.description, 
            photo: toy.photo
        }
    }

    const result = await toyclintcollection.updateOne(filter, updatedtoy, options);
    res.send(result);
})

app.delete('/toy/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await toyclintcollection.deleteOne(query);
    res.send(result);
})

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/alltoys' , (req,res)=>{
    res.send(alltoys)
})

app.get('/alltoys/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const findingdata = alltoys.find(singleData => parseInt(singleData.id) === id)
    res.send(findingdata)
})




app.get('/',(req, res)=>{
    res.send('Toy-marketplace is running')
})
app.listen(port,()=>{
    console.log(`Server is running pn port: ${port}`)
})