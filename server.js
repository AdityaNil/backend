require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();
const uri = "mongodb+srv://adityaanand2809:kPNVNGW2ZfXhVJvR@cluster0.ufcntjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!uri) {
    console.error('Error: MONGODB_URI is not defined in .env file');
    process.exit(1);
}

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Create a schema and model for the contact data
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    ip: String,
    location: Object
});

const Contact = mongoose.model('Contact', contactSchema);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).send('API is working');
});

// Define a route to handle the contact form submission
// app.post('/api/saveContact', (req, res) => {
//     console.log('Request Body:', req.body); 

//     console.log(req.body.email);

//     const contactData = Contact.create(req.body);

//     contactData.save()
//         .then(() => {
//             console.log('Contact data saved');
//             res.status(200).send('Contact data saved');
//         })
//         .catch(err => {
//             console.error('Error saving contact data:', err);
//             res.status(500).send('Error saving contact data: ' + err);
//         });
// });

app.post('/api/saveContact', async (req, res) => {
    try {
    //   const { email, name } = req.body;
      console.log(req.body);
  
      const result = await Contact.create(req.body);
      
      return res.status(201).json(result); 
    } catch (error) {
      console.log('Something went wrong in crud repo', error);
      return res.status(500).json({ error: 'An error occurred while saving the contact' });
    }
  });


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
