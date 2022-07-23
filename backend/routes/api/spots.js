const express = require('express')
const sequelize = require('sequelize')
const { setTokenCookie, requireAuth, restoreUser, isOwner } = require('../../utils/auth');
const { User,Spot,Image,Review } = require('../../db/models');
const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//get all spots
router.get(
    '/',
    async (req, res) => {
      
    const Spots = await Spot.findAll({});

    return res.json({Spots});
    }
  );

//get details of spot by id
router.get(
  '/:spotId',
  async (req, res) => {
  const {spotId} = req.params 
  const Spots = await Spot.findOne({
      where: {
        id: spotId
      }
  });
  const revs=await Review.count(
    {where: 
      {spotId: Spots.id}
    })
  const ave=await Review.sum('stars',
   {where: 
     {spotId: Spots.id}
   })
  const Images =await Image.findAll({
    where: {
      imageableType: 'spot',
      imageableId: Spots.id
    },
    attributes: ['id','imageableId','url']
  })
   const Owner =await User.findOne({
     where: {
      id: Spots.ownerId
     },
     attributes: ['id','firstName','lastName']
   })
  return res.json({
  "id": Spots.id,
  "ownerId": Spots.ownerId,
  "address": Spots.address,
  "city": Spots.city,
  "state": Spots.state,
  "country": Spots.country,
  "lat": Spots.lat,
  "lng": Spots.lng,
  "name": Spots.name,
  "description": Spots.description,
  "price": Spots.price,
  "createdAt": Spots.createdAt,
  "updatedAt": Spots.updatedAt,
  "numReviews": revs,
  "aveStarRating": ave/revs,
   Images,
   Owner
  });
  }
);

//create Spot
// part1 validate spot
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude is not valid'),
  check('lng')
     .isFloat({ min: -180, max: 180 })
     .withMessage('Longitude is not valid'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];
//create spot 
//part 2 route handler 
router.post(
  '/',
  requireAuth,
  validateSpot,
  async (req, res) => {
  const ownerId = req.user.id
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const newSpot = await Spot.makeSpot({ 
ownerId, address, city, state, country, lat, lng, name, description, price });
 const retObj = await Spot.findOne({
   where: {
     id: newSpot.id
   },
   attributes: {exclude: ['previewImage']}
 })
    return res.json(retObj);
  }
);





module.exports = router;