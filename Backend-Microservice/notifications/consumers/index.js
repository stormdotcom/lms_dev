const { getUserNotifications } = require("./notifications");

const startConsumer = async () => {
    await getUserNotifications();


}
module.exports = {
    startConsumer
}