
const { adminDetails, USER_TYPES } = require("../config/constants");
const { User } = require("../database/models")
const ProjectConfig = async () => {
    try {
        const existingUser = await User.Find({ email: adminDetails.email });
        if (existingUser) {
            return existingUser;
        }

        const hashedPassword = await bcrypt.hash(details.password, 10);
        const newAdminDetails = {
            ...adminDetails,
            password: hashedPassword,
            role: USER_TYPES.ADMIN,

        };
        return await User.create(newAdminDetails);
    } catch (err) {
        console.log("here ", err)
    }
}

module.exports = { ProjectConfig }