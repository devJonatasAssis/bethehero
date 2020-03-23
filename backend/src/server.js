const express = require('express')

const app = express();

app.get('/', (req, res) => {
    return res.send({message: 'Oi'});
})

app.use(express.json());
app.listen(3333);