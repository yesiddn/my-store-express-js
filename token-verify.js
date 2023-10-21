const jwt = require('jsonwebtoken');

const secret = 'Nami'; // llave secreta para firmar el token (se debería guardar en variable de entorno)
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5Njc5OTc1M30._RiUXCTh2zQMdCi54A-FT7pBXyKnyPvXFyhnkurUehE';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
