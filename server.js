// Import the dotenv package
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');

//allow cross origin (frontend)
const corsOptions = {
    origin: "*", //process.env.FRONT_END,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
//pour utiliser les fichiers json
app.use(express.json());
// increase maximum string size to 10mb for files (illustrations) converted to string in Base64
// node_modules -> body-parser -> lib -> types :
//   ? bytes.parse( '10mb')


//routes
app.use('/api/users', require('./routes/userRoute'));

app.use('/api/cards', require('./routes/cardRoute'));

app.use('/api/lessons', require('./routes/lessonRoute'));

app.use('/api/subjects', require('./routes/subjectRoute'));

app.use('/api/progressions', require('./routes/progressionRoute'));

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
