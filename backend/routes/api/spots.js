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
  async (req, res, next) => {
  const {spotId} = req.params 
  const Spots = await Spot.findOne({
      where: {
        id: spotId
      }
  });
  if (!Spots){
    const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
  }
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
  check('name')
    .exists({ checkFalsy: true })
    .isLength({max: 50})
    .withMessage('Name must be less than 50 characters'),
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

//edit a spot
router.put(
  '/:spotId',
  requireAuth,
  validateSpot,
  isOwner,
  async (req, res, next) => {
  const ownerId = req.user.id
  const {spotId} = req.params
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const newSpot = await Spot.findByPk(spotId);

  newSpot.address=address
  newSpot.city=city
  newSpot.state=state
  newSpot.country=country
  newSpot.lat=lat
  newSpot.lng=lng
  newSpot.name=name
  newSpot.description=description
  newSpot.price=price

  await newSpot.save()
  const retObj = await Spot.findOne({
   where: {
     id: newSpot.id
   },
   attributes: {exclude: ['previewImage']}
 })
 return res.json(retObj);
}
);

//delete a spot
router.delete(
  '/:spotId',
  requireAuth,
  validateSpot,
  isOwner,
  async (req, res, next) => {
  const ownerId = req.user.id
  const {spotId} = req.params
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const newSpot = await Spot.findByPk(spotId);
  await newSpot.destroy()
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  });
}
);

//get all reveiws by spotId

router.get(
  '/:spotId/reviews',
  async (req, res, next) => {
  const {spotId} = req.params 
  const Spots = await Spot.findOne({
      where: {
        id: spotId
      },
      attributes: {},
      include: {
        model: Review
      }
  });
  if (!Spots){
    const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
  }
  const Reviews = await Review.findAll({
    where: {
      spotId: Spots.id
    },
    include: [{
      model: User,
      attributes:['id','firstName','lastName']
    },
   {
      model: Image,
      attributes:['id','imageableId','url']
    }]

  })

    return res.json({
      Reviews
      //Images
    });
    }
  );


module.exports = router;