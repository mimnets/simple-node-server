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
    if(req.query.name){
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
        res.send(filtered);
    }
    else{
        res.send(users);
    }

})

app.post('/users', (req, res) =>{
    console.log('Post API called')
    // console.log(req.body);
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user)
    res.send(user);
})

app.listen(port, ()=>{
    console.log('Server is listening on', port);
});