
// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Sign up
router.post(
    '/signup',
    async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });
  
      await setTokenCookie(res, user);
  
      return res.json({
        user
      });
    }
  );
  //get current user: '/me'
router.get(
    '/me',
    restoreUser,
    requireAuth,
    async (req, res) => {
      const { user } = req;
      trees = await User.findOne({
        where: {
          id: user.id
        },
        attributes: ['id', 'firstName', 'lastName', 'email']
    });
      return res.json(trees);
    }
);


module.exports = router;