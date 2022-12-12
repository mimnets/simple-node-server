const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
//Body parser
app.use(express.json());

const port = process.env.PORT || 5000;

const users = [
    {id: 1, name: 'Monirul', email: 'monirul@gmail.com'},
    {id: 2, name: 'Javed', email: 'javed@gmail.com'},
    {id: 3, name: 'Palton', email: 'palton@gmail.com'}
]

app.get('/', (req, res) =>{
    res.send('Welcome');
})

app.get('/users', (req, res) =>{
    res.send(users);
})

app.post('/users', (req, res) =>{
    console.log('Post API called')
    console.log(req.body);
})

app.listen(port, ()=>{
    console.log('Server is listening on', port);
});