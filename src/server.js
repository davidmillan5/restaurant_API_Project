require('dotenv').config();
const PORT = process.env.PORT || 4000,
  express = require('express'),
  app = express();

const sequelize = require('./utils/postgresql');

app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

app.use('/', require('./router/orderRouter'));
app.use('/', require('./router/authProductRouter'));
app.use('/', require('./router/userRouter'));
app.use('/', require('./router/cashierRoute'));
app.use('/', require('./router/chefRouter'));
app.use('/', require('./router/waiterRouter'));

const start = async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`);
      console.log('Connected to ElephantSQL');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
