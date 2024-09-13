const { ROUTING_KEY } = require('../../config/constants');
const { publishMessage } = require('../../utils/rabbit-mq');

const sendDurationAnalytics = async (

    { type, ...data }
) => {
    await publishMessage({ type, data, routingKey: ROUTING_KEY.COURSE_VISIT });
};

module.exports = { sendDurationAnalytics }