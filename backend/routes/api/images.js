const express = require('express')
const sequelize = require('sequelize')
const { Op, DATEONLY } = require("sequelize");
const { setTokenCookie, requireAuth, restoreUser, isOwner } = require('../../utils/auth');
const { User,Spot,Image,Review, Booking } = require('../../db/models');
const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

 
 //delete image
  router.delete(
    '/:imageId',
    requireAuth,

    async (req, res, next) => {
    const {imageId} = req.params 
    const userId = req.user.id
    console.log('userId: ',userId)

    const image = await Image.findOne({
        where: {
          id: imageId
        }
    });
    if (!image){
      const err = new Error("Image couldn't be found");
          err.status = 404;
          return next(err);
    }
    const imgSpot = await Spot.findOne({
        where: {
            id: image.imageableId,
            ownerId: userId
          }
    });
    const imgReview = await Review.findOne({
        where: {
          id: image.imageableId,
          userId: userId
        }
    });


    if (!imgSpot&&image.imageableType==="spot"){
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    };
    if (!imgReview&&image.imageableType==="review"){
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    };


    await image.destroy()
    return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    });
  }
  );
module.exports = router;