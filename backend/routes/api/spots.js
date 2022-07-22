const express = require('express')
const sequelize = require('sequelize')
const { setTokenCookie, requireAuth, restoreUser, isOwner } = require('../../utils/auth');
const { User,Spot,Image,Review } = require('../../db/models');


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
      // ,
      // include: [
      //   {
      //   model:Review,
      //   attributes: 
      //       [[sequelize.fn('COUNT', sequelize.col('stars')),'numsReviews']]
        
      //   },
      //   {
      //   model: Image,
      //   attributes: ['id','imageableId','url']
      //   },
      //   {
      //     model: User, as: 'Owner',
      //     attributes: ['id','firstName','lastName']
      //   },
      // ]
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
    }
  })
   const Owner =await User.findOne({
     where: {
      id: Spots.ownerId
     }
   })
  return res.json({
    "id": Spots.id,
    "numReviews": revs,
    "aveStarRating": ave/revs,
   Images,
   Owner
  });
  }
);







module.exports = router;