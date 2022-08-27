
// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Image, Review, Booking } = require('../../db/models');

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
        attributes: ['id', 'userName', 'email']
    });
      return res.json(trees);
    }
);
router.get(
  '/allusers',

  
  async (req, res) => {
    
    trees = await User.findAll({
      
      attributes: ['id', 'userName', 'email']
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

//get all reviews of current user

router.get(
  '/reviews',
  requireAuth,
  
  async (req, res) => {
    console.log(req.user.id)
    
    const Reviews = await Review.findAll({
      where: {
        userId: req.user.id
      },
      include: [{
        model: User,
        attributes:['id','userName']
      },
      {
        model: Spot,
        attributes: {exclude: ['previewImage','description','createdAt','updatedAt']}
      },
     {
        model: Image,
        attributes:['id','imageableId','url']
      }]
  
    })
   
    return res.json({Reviews});
  }
);

//get bookings by user
router.get(
  '/bookings',
  requireAuth,
  
  async (req, res) => {
    console.log(req.user.id)
    
    const Bookings = await Booking.findAll({
      where: {
        userId: req.user.id
      },
      include: 
      {
        model: Spot,
        attributes: {exclude: ['description','createdAt','updatedAt']}
      }
     
  
    })
   
    return res.json({Bookings});
  }
);



module.exports = router;