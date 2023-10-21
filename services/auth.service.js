const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

const UserService = require('./users.service');

const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw (boom.unauthorized('User not found'), false);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw (boom.unauthorized('Wrong password'), false);
    }

    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);

    return { user, token };
  }

  async sendRecoveryLink(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    }

    jwt.verify(user.recoveryToken, config.jwtSecret, (err) => {
      if (!err) throw boom.badRequest('You already have a active token.');
    });

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' }); // se puede generar otra clave para el token
    const link = `http://localhost:3000/recovery?token=${token}`;

    await service.update(user.id, { recoveryToken: token });

    const mail = {
      from: `"Duvan Yesid 👻" <${config.email}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email to recover password', // Subject line
      // text: 'Hello world?', // plain text body
      html: `<b>Ingresa al siguiente enlace -> ${link}</b>`, // html body
    };

    const response = await this.sendMail(mail);
    return response;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);

      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized('Invalid token');
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await service.update(user.id, { password: hash, recoveryToken: null });

      return { message: 'Password changed' };
    } catch (error) {
      throw boom.unauthorized('Invalid token');
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        // estos datos deben ser variables de entorno
        user: config.email,
        pass: config.pass,
      },
    });

    await transporter.sendMail(infoMail);

    return { message: 'Email sent' };
  }
}

module.exports = AuthService;
