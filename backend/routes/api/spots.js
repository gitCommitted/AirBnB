const express = require('express')

const { setTokenCookie, requireAuth, restoreUser, isOwner } = require('../../utils/auth');
const { User,Spot } = require('../../db/models');

const router = express.Router();

//get all spots
router.get(
    '/',
    async (req, res) => {
      
    const Spots = await Spot.findAll({});

    return res.json({Spots});
    }
  );







module.exports = router;