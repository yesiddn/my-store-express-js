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

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    }

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

    await transporter.sendMail({
      from: `"Duvan Yesid 👻" <${config.email}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });

    return { message: 'Email sent' };
  }
}

module.exports = AuthService;
