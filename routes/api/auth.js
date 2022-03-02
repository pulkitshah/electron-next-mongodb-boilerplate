const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config');

const auth = require('../../middlleware/auth');
const User = require('../../models/User');
const Prospect = require('../../models/Prospect');

const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.subuser).select('-password');
    let allUsers = await User.find({ createdBy: user.createdBy });
    let { marketName, accountType, defaultCharges } = allUsers.find((user) => {
      return user._id.toString() === user.createdBy.toString();
    });
    user.accountType = accountType;
    user.marketName = marketName;
    user.defaultCharges = defaultCharges;

    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Sign In Users
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: 'Please recheck email and password' });
      }

      let allUsers = await User.find({ createdBy: user.createdBy });
      let waIds = allUsers.map((user) => {
        return user.waId;
      });
      //Remove empty elements
      waIds = waIds.filter(function (el) {
        return el != null;
      });
      let {
        marketName,
        mobile,
        accountType,
        defaultCharges,
        extraDeliveryCharge,
      } = allUsers.find((user) => {
        return user._id.toString() === user.createdBy.toString();
      });
      // Check Password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ error: 'Please recheck email and password' });
      }

      user.accountType = accountType;

      // Return JSON Webtoken
      const payload = {
        user: {
          id: user.createdBy,
          waIds: waIds,
          defaultBranch: user.defaultBranch,
          subuser: user.id,
          branchIds: user.branchIds,
          marketName: marketName,
          mobile: mobile,
          accountType,
          defaultCharges,
          extraDeliveryCharge,
        },
      };

      console.log(payload);
      jwt.sign(
        payload,
        process.env.NODE_ENV !== 'production'
          ? process.env.jwtSecret_DEV.toString()
          : process.env.jwtSecret_PROD.toString(),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ accessToken: token, user });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
