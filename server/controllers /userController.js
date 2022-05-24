const db = require("../models");

// Defining methods for the userController
module.exports = {
  getUser: (req, res, next) => {
    console.log('getUser:', req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  register: (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    // ADD VALIDATION
    db.User.findOne({ 'email': email }, (err, userMatch) => {
      if (userMatch) {
        return res.json({
          error: `Sorry, already a user with the email: ${email}`
        });
      }
      const newUser = new db.User({
        'username': userame,
        'email': email,
        'password': password
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        return res.json(savedUser);
      });
    });
  },
  updateProfile: (req, res) => {
    const { firstName, lastName, email, bio, } = req.body;
     console.log(req.body);
    db.User.findOneAndUpdate({
      _id: req.params.id
    }, req.body, { new: true }
    ).then(dbModel => res.json(dbModel)
    ).catch(err => res.status(422).json(err));
  },
  
},
logout; (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie('connect.sid'); 
    return res.json({ msg: 'logging you out' });
  } else {
    return res.json({ msg: 'no user to log out!' });
  }
},
auth; (req, res, next) => {
      console.log('auth:', req.body);
      next();
}
authenticate; (req, res) => {
      const user = JSON.parse(JSON.stringify(req.user)); 
  const cleanUser = Object.assign({}, user);
  console.log('authenticate:', user);
      if (cleanUser) {
          delete cleanUser.password;
      }
      res.json({ user: cleanUser })}