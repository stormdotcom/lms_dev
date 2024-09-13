const { User } = require("../models");
const { USER_TYPES, adminDetails } = require("../../config/constants");
const { GeneratePassword, GenerateSalt } = require("../../utils/password-utils");
const bcrypt = require("bcrypt");
const { APIError, BadRequestError, STATUS_CODES } = require("../../utils/app-errors");

class UserRepository {
  async createUser(data) {
    try {
      const isExists = await User.findOne({ where: { email: data.email } });
      if (isExists?.dataValues) {
        throw new APIError("User Already Exists", "Email Already exists", STATUS_CODES.INTERNAL_ERROR);
      }

      const result = await User.create(data);
      if (!result) {
        throw new APIError("Failed to create user", "No Result", STATUS_CODES.INTERNAL_ERROR);
      }

      return result.dataValues;
    } catch (err) {
      throw new APIError(err.message, err.name || "API Error", err.statusCode || STATUS_CODES.INTERNAL_ERROR);
    }
  }

  async findUser(criteria, attributes = ['firstName', 'lastName', 'options', 'email', 'phone', 'password', 'id', 'role', 'isVerified']) {
    try {
      const data = await User.findOne({
        where: criteria,
        attributes,
        useCache: true, 
         cacheTTL: 300  
      });
      if (!data) {
        throw new APIError("Email", "Invalid Credential");
      }
      return data.dataValues ? data.dataValues : data;
    } catch (err) {
      throw new APIError("", err.message, STATUS_CODES.NOT_FOUND, true);
    }
  }
  async updateUser(id, updateData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new BadRequestError("User not found", "No Data", STATUS_CODES.NOT_FOUND);
      }

      Object.assign(user, updateData);
      await user.save();
      return user.dataValues;
    } catch (err) {
      throw new APIError(err.message, err.message, STATUS_CODES.INTERNAL_ERROR);
    }
  }

  async updateAvatar(id, imageUrl) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new BadRequestError("User not found", "No Data", STATUS_CODES.NOT_FOUND);
      }

      user.profileAvatarUrl = imageUrl;
      await user.save();
      return imageUrl;
    } catch (err) {
      throw new APIError(err.message, "API Error", STATUS_CODES.INTERNAL_ERROR);
    }
  }

  async updatePassword(id, newPassword) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new BadRequestError("User not found", "No Data", STATUS_CODES.NOT_FOUND);
      }

      user.password = newPassword;
      await user.save();
      return user;
    } catch (err) {
      throw new APIError(err.message, "API Error", STATUS_CODES.INTERNAL_ERROR);
    }
  }

  async blockUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new BadRequestError("User not found", "No Data", STATUS_CODES.NOT_FOUND);
      }

      user.status = 0;
      await user.save();
      return user;
    } catch (err) {
      throw new APIError(err.message, "API Error", STATUS_CODES.INTERNAL_ERROR);
    }
  }

  async unblockUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new BadRequestError("User not found", "No Data", STATUS_CODES.NOT_FOUND);
      }

      user.status = 1;
      await user.save();
      return user;
    } catch (err) {
      throw new APIError(err.message, "API Error", STATUS_CODES.INTERNAL_ERROR);
    }
  }

  async verifyEmail(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new BadRequestError("User not found", "No Data", STATUS_CODES.NOT_FOUND);
      }

      user.isVerified = true;
      await user.save();
      return user;
    } catch (err) {
      throw new APIError(err.message, "API Error", STATUS_CODES.INTERNAL_ERROR);
    }
  }

  async storeRefreshToken(id, refreshToken) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new BadRequestError("User not found", "No Data", STATUS_CODES.NOT_FOUND);
      }

      user.refreshToken = refreshToken;
      await user.save();
      return user;
    } catch (err) {
      throw new APIError(err.message, "API Error", STATUS_CODES.INTERNAL_ERROR);
    }
  }

  async createAdmin() {
    try {
      const existingUser = await this.findUser({ email: adminDetails.email });
      if (existingUser) {
        return existingUser;
      }

      const salt = await GenerateSalt();
      const hashedPassword = await GeneratePassword(adminDetails.password, salt);
      const newAdminDetails = {
        ...adminDetails,
        password: hashedPassword,
        role: USER_TYPES.ADMIN,
      };

      return await this.createUser(newAdminDetails);
    } catch (err) {
      throw new APIError(err.message, "API Error", STATUS_CODES.INTERNAL_ERROR);
    }
  }

  async createCreator(details) {
    try {
      const existingUser = await this.findUser({ email: details.email });
      if (existingUser) {
        return existingUser;
      }

      const hashedPassword = await bcrypt.hash(details.password, 10);
      const creatorDetails = {
        ...details,
        password: hashedPassword,
        role: USER_TYPES.CREATOR,
      };

      return await this.createUser(creatorDetails);
    } catch (err) {
      throw new APIError(err.message, "API Error", STATUS_CODES.INTERNAL_ERROR);
    }
  }
}

module.exports = UserRepository;
