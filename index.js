const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(cors());
//Body parser
app.use(express.json());

const port = process.env.PORT || 5000;


const users = [
    {id: 1, name: 'Monirul', email: 'monirul@gmail.com'},
    {id: 2, name: 'Javed', email: 'javed@gmail.com'},
    {id: 3, name: 'Palton', email: 'palton@gmail.com'}
]

// DBUser : simpleNodeServer
// Password: s03y1QMMwAGYzpNi

const uri = "mongodb+srv://simpleNodeServer:s03y1QMMwAGYzpNi@cluster0.ak6zw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const userCollection = client.db('simpleNode').collection('users');
        // const user = {name: 'Monirul Islam', email: 'monir@gmail.com'}
        // const result = await userCollection.insertOne(user);
        // console.log(result);
        app.post('/users', async (req, res) =>{
            // console.log(req.body);
            const user = req.body;
            const result = await userCollection.insertOne(user)
            // console.log(user)
            user.id = result.insertedId;
            res.send(user);
        })
    }
    finally{

    }
}
run().catch(err => console.log(err));


app.get('/', (req, res) =>{
    res.send('Welcome');
})

app.get('/users', (req, res) =>{
    if(req.query.name){
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
        res.send(filtered);
    }
    else{
        res.send(users);
    }

})


app.listen(port, ()=>{
    console.log('Server is listening on', port);
});