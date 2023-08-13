// Import the dotenv package
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');

//allow cross origin (frontend)
const corsOptions = {
    origin: process.env.FRONT_END,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
//pour utiliser les fichiers json
app.use(express.json());
//utiliser form URL à la place de json
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/users', require('./routes/userRoute'));

app.use(errorMiddleware);


//connection à la base de donnée
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('connected to MongoDB');
    app.listen(process.env.PORT || 3000 , ()=> {
        console.log('Node API is running on port 3000');
    })
}).catch((error) => {
    console.log(error);
})
