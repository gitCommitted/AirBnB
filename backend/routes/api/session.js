// backend/routes/api/session.js
const express = require('express')
const validator = require('validator');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();



// Log in
router.post(
    '/login',
    async (req, res, next) => {
      const { email, password } = req.body;
      
      if (!email || !password){
        const err = new Error('Validation Failed');
        err.status = 400;
      
        err.errors = {};
        if (!email){err.errors.email= "Email Required"}
        if (!password){err.errors.password="Password Required"}
        return next(err);
      }

      const user = await User.login({ email, password });
  
      if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        return next(err);
      }
      
  
      const token=await setTokenCookie(res, user);
      //console.log(token)
  
      return res.json( {
        "id": user.id,
        "userName": user.userName,
        "email": user.email,
        "token": token
      });
    }
  );

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // Restore session user endpoint
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );
// Sign up: /signup
router.post(
  '/signup',
  async (req, res, next) => {
    const { userName, email, password } = req.body;
    if (!email || !userName){
      const err = new Error('Validation Failed');
      err.status = 400;
      err.errors = {};
      if (!email) {err.errors.email= "Email Required"}
      if (email && !validator.isEmail(email)){err.errors.email= "Invalid email"}
      if (!userName){err.errors.userName="user Name Required"}
      return next(err);
    }
    
    const tryAddy = await User.findOne({
      where : {
        email: email
      }
    })
    if (tryAddy){
      const err = new Error('User Already Exists');
        err.status = 403;
        err.errors = {
          "email": "User with that email already exists"
        };
        return next(err);
    }


    const user = await User.signup({ userName, email, password });

    const token=await setTokenCookie(res, user);

    return res.json( {
      "id": user.id,
      "userName": user.userName,
      "email": user.email,
      "token": token
    });
  }
);


module.exports = router;