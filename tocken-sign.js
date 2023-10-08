const jwt = require('jsonwebtoken');

const secret = 'Nami'; // llave secreta para firmar el token (se debería guardar en variable de entorno)

const payload = {
  sub: 1, // Identificador del usuario en el sistema
  // se pueden agregar más propiedades como scope para los permisos, role para el rol del usuario, etc.
  role: 'customer',
}; // El payload es la información que queremos encriptar

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);

/*
Para los refresh tokens hay que definir un tiempo de expiración, eso se puede lograr pasando un tercer argumento de configuración a la función sign.

Para hacer que expire el token después de un cierto tiempo sería:


const jwt = require('jsonwebtoken')

const jwtConfig = {
  expiresIn: '7d',
};
const payload = {
  sub: user.id,
  role: "customer"
}

const token = jwt.sign(payload, process.env.JWTSECRET, jwtConfig)
*/