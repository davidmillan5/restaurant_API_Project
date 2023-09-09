const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginWaiter = async (req, res) => {
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
      user.role === 'waiter'
    ) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY_WAITER,
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
