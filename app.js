const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
// local imports
const connectDB = require('./config/db.config');
const productRoutes = require('./src/routes/products.route');
const userRoutes = require('./src/routes/user.route');
const cartRoutes = require('./src/routes/cart.route');

const app = express();
const PORT = 5001;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// calling db connection with config
dotenv.config({path: './config/config.env'});
connectDB();

app.get('/', (req, res) => {
    console.log("hello");
    res.send("Hello");
});

app.use(cors());
app.use('/uploads', express.static('uploads'));
// Products DB routes
app.use('/api/v1/products', productRoutes);
// User/Admin Auth routes
app.use('/api/v1/auth', userRoutes);
// Cart routes
app.use('/api/v1/cart', cartRoutes);

app.listen(PORT, ()=> {
    console.log(`Server is running at: ${PORT}`);
});

