// backend/routes/api/session.js
const express = require('express')

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
        err.title = 'Validation Failed';
        err.errors = {
          "email": "Email is required",
          "password": "Password is required"
        };
        return next(err);
      }

      const user = await User.login({ email, password });
  
      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }
      
  
      const token=await setTokenCookie(res, user);
      //console.log(token)
  
      return res.json( {
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
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
    const { firstName, lastName, email, password } = req.body;
    if (!email || !firstName || !lastName){
      const err = new Error('Validation Failed');
      err.status = 400;
      err.title = 'Validation Failed';
      err.errors = {
        "email": "Invalid email",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      };
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
        err.title = 'User Already Exists';
        err.errors = {
          "email": "User with that email already exists"
        };
        return next(err);
    }


    const user = await User.signup({ firstName, lastName, email, password });

    const token=await setTokenCookie(res, user);

    return res.json( {
      "id": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "token": token
    });
  }
);


module.exports = router;