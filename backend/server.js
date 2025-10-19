const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');


const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/contacts', contactRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req,res)=>res.send('Gururobos Backend Running'));

// connect db
const MONGO_URI = process.env.MONGO_URI || '';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.error('DB connect error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log('Server running on port '+ PORT));
