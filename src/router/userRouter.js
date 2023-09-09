const { Router } = require('express');
const router = Router(),
  userController = require('../controller/userController'),
  authController = require('../controller/authController'),
  cashierLogin = require('../controller/cashierLogin'),
  chefLogin = require('../controller/chefLogin'),
  waiterLogin = require('../controller/waiterLogin'),
  { verifyTokenAdmin } = require('../middleware/authmiddleware');

router.get('/health', (_, res) => {
  try {
    res.send('check');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/api/v1/users', verifyTokenAdmin, userController.getAllUsers);
router.post('/api/v1/users', verifyTokenAdmin, userController.createUser);
router.post('/api/v1/users/login/admin', userController.loginAdmin);
router.post('/api/v1/users/login/cashier', cashierLogin.loginCashier); // Changed to router.post()
router.post('/api/v1/users/login/chef', chefLogin.loginChef); // Changed to router.post()
router.post('/api/v1/users/login/waiter', waiterLogin.loginWaiter); // Changed to router.post()
router.post('/api/v1/users/register', authController.registerUser); // Changed to router.post()
router.post('/api/v1/users/login', authController.loginUser); //

module.exports = router;
