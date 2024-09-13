const { UserRepository } = require("../database");
const {
  GeneratePassword,
  GenerateSalt,
  ValidatePassword,
  VerifyRefreshToken,
  GenerateAccessToken,
  GenerateRefreshToken,
} = require("../utils/password-utils");
const { ResponseDataSuccess } = require("../utils/common-utils");
const { APIError, STATUS_CODES } = require("../utils/app-errors");
const { FormateUserDataAuth } = require("../utils");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;
    try {
      const existingUser = await this.repository.findUser({ email });

      if (existingUser) {
        const validPassword = await ValidatePassword(password, existingUser.password);
        if (validPassword) {
          const accessToken = await GenerateAccessToken({
            email: existingUser.email,
            id: existingUser.id,
            role: existingUser.role,
            status: existingUser.status,
          });
          const refreshToken = await GenerateRefreshToken({
            email: existingUser.email,
            id: existingUser.id,
            role: existingUser.role,
            status: existingUser.status,
          });

          return {
            userDetails: FormateUserDataAuth(existingUser),
            accessToken,
            refreshToken,
          };
        }
        throw APIError("Password", "Invalid Credential", 401)
      }
    } catch (err) {
      throw new APIError("Invalid Credential", "Invalid Credential" || "Sign In Error", err.statusCode || 401, true);
    }
  }

  async SignUp(userInputs) {
    const { firstName, lastName, email, password } = userInputs;
    try {
      const salt = await GenerateSalt();
      const userPassword = await GeneratePassword(password, salt);
      const newUser = await this.repository.createUser({
        firstName,
        lastName,
        email,
        password: userPassword,
        salt,
        isVerified: false,
        status: 1,
        options: {},
      });
      const accessToken = await GenerateAccessToken({
        email: newUser.email,
        id: newUser.id,
        role: newUser.role,
        status: newUser.status,
      });
      const refreshToken = await GenerateRefreshToken({
        email: newUser.email,
        id: newUser.id,
        role: newUser.role,
        status: newUser.status,
      });
      return { userDetails: FormateUserDataAuth(newUser), accessToken, refreshToken };
    } catch (err) {
      throw new APIError(err.message || "Something went wrong", STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async UpdateUser(userId, updateData) {
    try {
      const updatedUser = await this.repository.updateUser(userId, updateData);
      return updatedUser;
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async UpdateAvatar(userId, url) {
    try {
      const result = await this.repository.updateAvatar(userId, url);
      return ResponseDataSuccess(result);
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async UpdatePassword(userInputs) {
    const { id, newPassword } = userInputs;
    try {
      const salt = await GenerateSalt();
      const hashedPassword = await GeneratePassword(newPassword, salt);
      const updatedUser = await this.repository.updatePassword(id, hashedPassword);
      return ResponseDataSuccess(updatedUser);
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async GetUserDetails(userId) {
    try {
      const user = await this.repository.findUser({ id: userId });
      return user;
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async GetUserDetailDashboard(userId) {
    try {
      const user = await this.repository.findUser({ id: userId }, ["firstName", "lastName", "options"]);
      return user;
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async ResetPassword(email, newPassword) {
    try {
      const user = await this.repository.findUser({ email });
      if (!user) {
        throw new APIError("User not found", STATUS_CODES.NOT_FOUND);
      }

      const salt = await GenerateSalt();
      const hashedPassword = await GeneratePassword(newPassword, salt);
      user.password = hashedPassword;
      user.salt = salt;
      await user.save();
      return ResponseDataSuccess(user);
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async BlockUser(userId) {
    try {
      const updatedUser = await this.repository.blockUser(userId);
      return ResponseDataSuccess(updatedUser);
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async UnblockUser(userId) {
    try {
      const updatedUser = await this.repository.unblockUser(userId);
      return ResponseDataSuccess(updatedUser);
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async VerifyEmail(userId) {
    try {
      const updatedUser = await this.repository.verifyEmail(userId);
      return ResponseDataSuccess(updatedUser);
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async RefreshTokens(token) {
    try {
      const payload = await VerifyRefreshToken(token);
      const existingUser = await this.repository.findUser({ email: payload.email });

      if (existingUser) {
        const accessToken = await GenerateAccessToken({
          email: existingUser.email,
          id: existingUser.id,
          role: existingUser.role,
          status: existingUser.status,
        });
        const refreshToken = await GenerateRefreshToken({
          email: existingUser.email,
          id: existingUser.id,
          role: existingUser.role,
          status: existingUser.status,
        });
        return { accessToken, refreshToken };
      }
      throw new APIError("Token expired", STATUS_CODES.UN_AUTHORIZED);
    } catch (err) {
      throw new APIError(err.message, err.statusCode || STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async CreateAdmin() {
    try {
      const adminUser = await this.repository.createAdmin();
      return ResponseDataSuccess(adminUser);
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
    }
  }

  async CreateCreator(creatorDetails) {
    try {
      const creatorUser = await this.repository.createCreator(creatorDetails);
      return ResponseDataSuccess(creatorUser);
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
    }
  }
}

module.exports = UserService;
