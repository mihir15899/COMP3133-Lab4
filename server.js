const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = "mongodb+srv://kananidhruvish:U19hBm2J26De7JYG@cluster0.rqioa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/users', userRoutes);

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
