const { Strategy } = require('passport-local');
// const boom = require('@hapi/boom');
// const bcrypt = require('bcrypt');

const AuthService = require('../../../services/auth.service');
const service = new AuthService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      // const user = await service.findByEmail(email);
      // if (!user) {
      //   return done(boom.unauthorized('User not found'), false);
      // }

      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) {
      //   return done(boom.unauthorized('Wrong password'), false);
      // }

      // delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);

module.exports = LocalStrategy;
