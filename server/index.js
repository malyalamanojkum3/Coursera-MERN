const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin.js');
const userRouter = require('./routes/user.js');
const cors = require('cors');
const port = 3000

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', async(req, res) => {
res.send("hi")
})

app.use('/admin',adminRouter);
app.use('/users',userRouter);
app.listen(port, () => console.log('Server running on port'+ port));