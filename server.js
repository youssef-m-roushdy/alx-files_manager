const express = require('express');
const routes = require('./routes/index');

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
