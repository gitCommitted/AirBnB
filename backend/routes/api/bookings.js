const express = require('express')
const sequelize = require('sequelize')
const { Op, DATEONLY } = require("sequelize");
const { setTokenCookie, requireAuth, restoreUser, isOwner } = require('../../utils/auth');
const { User,Spot,Image,Review, Booking } = require('../../db/models');
const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

  
  //part 2 edit booking route handler
  
  router.put(
    '/:bookingId',
    requireAuth,
    async (req, res, next) => {
    const {bookingId} = req.params 
    const userId = req.user.id
   
    const {startDate,endDate}=req.body
    const book = await Booking.findOne({
        where: {
          id: bookingId
        }
    });
    if (!book){
      const err = new Error("Booking couldn't be found");
          err.status = 404;
          return next(err);
    }
    if (book.userId!==userId){
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    };
    const now = new Date()
    const newEnd = new Date(endDate)
    const newStart = new Date(startDate)
    if (newStart.valueOf()>=newEnd.valueOf()){
        const err = new Error("Validation Error");
        err.status = 400;
        err.errors = {}
        err.errors.endDate="endDate cannot be on or before startDate"
        return next(err);
    }
    if (newEnd.valueOf()<now.valueOf()){
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }

      const startBookings = await Booking.findAll({
        where: {
          spotId: book.spotId,
          [Op.not]: {id: book.id},
          [Op.or]: {
            [Op.or]: [
              {
                startDate: {
                  [Op.eq]: req.body.startDate
              }
              },
              {
                endDate: {
                  [Op.eq]: req.body.startDate
                }
              }
            ],
            [Op.and]: [
              {
                startDate: {
                  [Op.lt]: req.body.startDate
              }
              },
              {
                endDate: {
                  [Op.gt]: req.body.startDate
                }
              }
            ]
          }
        }
      
    
      })
      const endBookings = await Booking.findAll({
        where: {
          spotId: book.spotId,
          [Op.not]: {id: book.id},
          [Op.or]: {
            [Op.or]: [
              {
                startDate: {
                  [Op.eq]: req.body.endDate
              }
              },
              {
                endDate: {
                  [Op.eq]: req.body.endDate
                }
              }
            ],
            [Op.and]: [
              {
                startDate: {
                  [Op.lt]: req.body.endDate
              }
              },
              {
                endDate: {
                  [Op.gt]: req.body.endDate
                }
              }
            ]
          }
        }
      
    
      })
      const allBookings = await Booking.findAll({
        where: {
          spotId: book.spotId,
          [Op.not]: {id: book.id},
            [Op.and]: [
              {
                startDate: {
                  [Op.gt]: req.body.startDate
              }
              },
              {
                endDate: {
                  [Op.lt]: req.body.endDate
                }
              }
            ]
          
        }
      
    
      })
    
      if (startBookings.length>0||endBookings.length>0||allBookings.length>0){
        const err = new Error("Sorry, this spot is already booked for the specified dates");
            err.status = 403;
            err.errors = {}
            if (startBookings.length>0){err.errors.startDate="Start date conflicts with an existing booking"}
            if (endBookings.length>0){err.errors.endDate="End date conflicts with an existing booking"}
            if (allBookings.length>0){
              err.errors.startDate="Start date conflicts with an existing booking",
              err.errors.endDate="End date conflicts with an existing booking"
            }
            return next(err);
      }

    const newBooking = await Booking.findByPk(bookingId);

    newBooking.startDate=startDate
    newBooking.endDate=endDate
     
    await newBooking.save()
    const retObj = await Booking.findOne({
     where: {
       id: newBooking.id
     }
   })
   return res.json(retObj);
  }
  );
  
 //delete a booking
  router.delete(
    '/:bookingId',
    requireAuth,

    async (req, res, next) => {
    const {bookingId} = req.params 
    const userId = req.user.id
    console.log('userId: ',userId)

    const book = await Booking.findOne({
        where: {
          id: bookingId
        }
    });
    if (!book){
      const err = new Error("Booking couldn't be found");
          err.status = 404;
          return next(err);
    }
    
    if (book.userId!==userId){
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    };
    const now = new Date()
    const newEnd = new Date(book.endDate)
    const newStart = new Date(book.startDate)

    if (newStart.valueOf()<now.valueOf()){
        const err = new Error("Bookings that have been started can't be deleted");
        err.status = 403;
        return next(err);
    }

    await userReview.destroy()
    return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    });
  }
  );
module.exports = router;