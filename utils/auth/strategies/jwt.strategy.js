// https://www.passportjs.org/packages/passport-jwt/
const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // De donde vamos a sacar el token, en este caso del header de la peticion
  secretOrKey: config.jwtSecret, // La clave secreta para validar el token
}

const JwtStrategy = new Strategy(options, async (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;