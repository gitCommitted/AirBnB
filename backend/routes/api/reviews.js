const express = require('express')
const sequelize = require('sequelize')
const { setTokenCookie, requireAuth, restoreUser, isOwner } = require('../../utils/auth');
const { User,Spot,Image,Review } = require('../../db/models');
const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
  
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];
  
  //part 2 edit review route handler
  
  router.put(
    '/:reviewId',
    requireAuth,
    validateReview,
    async (req, res, next) => {
    const {reviewId} = req.params 
    const userId = req.user.id
    console.log('userId: ',userId)
    const {review,stars}=req.body
    const rev = await Review.findOne({
        where: {
          id: reviewId
        }
    });
    if (!rev){
      const err = new Error("Review couldn't be found");
          err.status = 404;
          return next(err);
    }
    const userReview = await Review.findOne({
      where: {
        userId: req.user.id,
        id: reviewId
      }
    })
    if (!userReview){
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    };
    
    const newReview = await Review.findByPk(reviewId);

    newReview.review=review
    newReview.stars=stars
     
    await newReview.save()
    const retObj = await Review.findOne({
     where: {
       id: newReview.id
     }
   })
   return res.json(retObj);
  }
  );
  
 //delete a review  

  router.delete(
    '/:reviewId',
    requireAuth,

    async (req, res, next) => {
    const {reviewId} = req.params 
    const userId = req.user.id
    console.log('userId: ',userId)

    const rev = await Review.findOne({
        where: {
          id: reviewId
        }
    });
    if (!rev){
      const err = new Error("Review couldn't be found");
          err.status = 404;
          return next(err);
    }
    const userReview = await Review.findOne({
      where: {
        userId: req.user.id,
        id: reviewId
      }
    })
    if (!userReview){
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    };
    await userReview.destroy()
    return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    });
  }
  );
module.exports = router;