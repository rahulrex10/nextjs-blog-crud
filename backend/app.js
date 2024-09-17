const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});