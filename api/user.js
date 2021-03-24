const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class User {
  constructor({ name, email, password }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  info() {
    return {
      name: this.name,
      email: this.email,
    };
  }

  async comparePassword(plainText) {
    return await bcrypt.compare(plainText, this.password);
  }

  encoded() {
    return jwt.sign(
      {
        ...this.info(),
      },
      process.env.TOKEN_SECRET
    );
  }

  static async decoded(userJwt) {
    return jwt.verify(userJwt, process.env.TOKEN_SECRET, (error, res) => {
      if (error) {
        return { error };
      }
      return new User(res);
    });
  }
};