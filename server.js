import controllerRouting from './routes/index';

const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
controllerRouting(app);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default app;
