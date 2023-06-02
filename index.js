const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000
const app = express()

// middelware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.hrkpt8c.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // COLLECTION 
        const menuCollection = client.db("bistroBoss").collection('menu')
        const reviewsCollection = client.db("bistroBoss").collection('reviews')
        const cartCollection = client.db("bistroBoss").collection('carts')

        // MENU COLLECTION
        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result)
        })

        // REVIEWS COLLECTION
        app.get('/reviews', async (req, res) => {
            const result = await reviewsCollection.find().toArray();
            res.send(result)
        })

        // CARTS COLLECTION
        app.get("/carts", async (req, res) => {
            const result = await cartCollection.find().toArray();
            res.send(result)
        })

        app.post('/carts', async (req, res) => {
            const doc = req.body
            console.log(doc);
            const result = await reviewsCollection.insertOne(doc)
            res.send(result)
        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// get of test
app.get('/', (req, res) => {
    res.send('Bistro Boss .............')
})

app.listen(port, () => {
    console.log(`Bistro Boss port ${port} `);
})
