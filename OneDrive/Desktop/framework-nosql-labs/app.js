const express = require('express');
const app = express();
const PORT = 3000;

const homeRoutes = require('./routes/homeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');

app.use('/', homeRoutes);
app.use('/', aboutRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

