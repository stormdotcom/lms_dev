const { consumeLoginStats, getUserRecentActivity } = require('./consumers/user');
const { consumeLearningStats } = require("./consumers/learnings")
const startConsumer = async () => {
    await consumeLoginStats();
    await getUserRecentActivity();
    await consumeLearningStats()

}
module.exports = {
    startConsumer
}