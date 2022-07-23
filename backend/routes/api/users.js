
// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

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

//get all spots owned by current user
router.get(
  '/spots',
  requireAuth,
  
  async (req, res) => {
    console.log(req.user.id)
    
  const  Spots = await Spot.findAll({
      
    where: {
          ownerId: req.user.id
        },
        attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",
        "previewImage"]
      
  });
    return res.json({Spots});
  }
);




module.exports = router;