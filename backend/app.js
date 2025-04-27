const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/employment_platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
