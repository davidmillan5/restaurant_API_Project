const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {
  try {
    const { name, lastname, email, password, role } = req.body;

    if (!(name && lastname && email && password && role)) {
      res.status(400).send('All input is required');
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      lastname,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY_ADMIN,
      {
        expiresIn: '1h',
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllUsers = async (_, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send('All input is required');
    }
    // Validate if user exist in our database
    const user = await User.findOne({ where: { email } });

    if (
      user &&
      (await bcrypt.compare(password, user.password)) &&
      user.role === 'admin'
    ) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY_ADMIN,
        {
          expiresIn: '2h',
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    } else {
      res.status(400).send('Invalid Credentials');
    }
  } catch (err) {
    console.log(err);
  }
};
