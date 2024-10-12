const express = require('express');
const sequelize = require('./config/db');
const routes = require('./routes/index');

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
}).catch(error => console.error(error));