
// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


  //get current user: '/me'
router.get(
    '/',
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
router.get(
  '/allusers',

  
  async (req, res) => {
    
    trees = await User.findAll({
      
      attributes: ['id', 'firstName', 'lastName', 'email']
  });
    return res.json(trees);
  }
);

module.exports = router;