const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId
const cors = require('cors');
const { query } = require('express');
const app = express()
const port = process.env.PORT || 5000;

// midlewere

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tul8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run (){

    try{
    
        await client.connect()

        const database = client.db('portfolioDb');
        const projectsCollection = database.collection('projects')

        app.get('/projects', async (req, res)=>{
            const query =  projectsCollection.find({})
            const projects = await query.toArray()
            res.send(projects)
        })

        app.get('/projects/:id', async (req, res)=>{
            const  id = req.params.id
            const filter ={_id:ObjectId(id)}
            const query = await projectsCollection.findOne(filter)  
            res.send(query);
        })
        
    }

    finally{
        // await client.close()
    }

}

run().catch(console.dir)


app.get('/', (req, res) => {
  res.send('Imamul Hasan Turzo')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:`,port)
})