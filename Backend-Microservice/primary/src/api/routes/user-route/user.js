const { EXCHANGE_NAME, ROUTING_KEY } = require("../../../config/constants");
const UserStreakService = require("../../../services/streak-service");
const UserService = require("../../../services/user-service");
const { getRabbitMQChannel } = require("../../../utils/rabbit-mq");
const { v4: uuidv4 } = require('uuid');
const UserAuth = require("../../middlewares/auth");
const { upload } = require("../../../utils/filehandler");
const fs = require('fs');
const { FormateUserData } = require("../../../utils");
const { uploadFileToS3 } = require("../../../utils/s3Util");
const { validateProfileDetails } = require("../../../utils/validator/user-validator");
const express = require('express');
const router = express.Router();


const service = new UserService();
const userStreakService = new UserStreakService();

router.get("/streak", async (req, res, next) => {
  try {
    const { id } = req.query;
    const { data } = await userStreakService.getCurrentStreak(id);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});
router.post("/update-password", async (req, res, next) => {
  try {
    const { id } = req.user;
    const { newPassword } = req.body;
    const { data } = await service.UpdatePassword({ id, newPassword });
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const { id } = req.user;
    const updateData = req.body;
    const { data } = await service.UpdateUser(id, updateData);

    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/profile", async (req, res, next) => {

  try {
    const { id } = req.user;
    const data = await service.GetUserDetails(id);

    return res.json({ data: FormateUserData(data) });
  } catch (err) {
    next(err);
  }
});

router.put("/profile", async (req, res, next) => {
  try {
    const { id } = req.user; console.log("here profile", req.body)
    const data = await service.UpdateUser(id, req.body);
    return res.json({ data: FormateUserData(data) });
  } catch (err) {
    next(err);
  }
});

router.get("/dashboard", async (req, res, next) => {
  try {
    // const { id } = req.user;
    // const { data } = await service.GetCurrentUserDetails(id);
    const profile = {}, course = {}, achievements = {};
    return res.json({ profile, course, achievements });
  } catch (err) {
    next(err);
  }
});

router.get("/activities", async (req, res, next) => {
  try {
    const { id } = req.user;
    const correlationId = uuidv4()
    const channel = await getRabbitMQChannel();
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const message = { type: "get_recent_notification", userId: id }
    channel.consume(queue, (msg) => {
      if (msg.properties.correlationId === correlationId) {
        const response = JSON.parse(msg.content.toString());
        res.json(response);

        // Acknowledge the message
        channel.ack(msg);
      }
    }, { noAck: false });
    channel.publish(
      EXCHANGE_NAME,
      ROUTING_KEY.ANALYTICS,
      Buffer.from(JSON.stringify(message)),
      {
        correlationId,
        replyTo: queue
      }
    );
  } catch (err) {
    next(err);
  }
});

router.get("/notifications", async (req, res, next) => {
  try {
    const { id } = req.user;
    const { offset, limit } = req.query;
    const correlationId = uuidv4()
    const channel = await getRabbitMQChannel();
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const message = { type: "get_notifications", userId: id, offset, limit }
    channel.consume(queue, (msg) => {
      if (msg.properties.correlationId === correlationId) {
        const data = JSON.parse(msg.content.toString());
        res.json({ data });

        channel.ack(msg);
      }
    }, { noAck: false });
    channel.publish(
      EXCHANGE_NAME,
      ROUTING_KEY.NOTIFICATION,
      Buffer.from(JSON.stringify(message)),
      {
        correlationId,
        replyTo: queue
      }
    );
  } catch (err) {
    next(err);
  }
});

router.get("/notification/:id", async (req, res, next) => {
  try {
    const { id } = req.user;
    const notificationId = req.params.id;
    const correlationId = uuidv4()
    const channel = await getRabbitMQChannel();
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const message = { type: "update_notification", notificationId }
    channel.consume(queue, (msg) => {
      if (msg.properties.correlationId === correlationId) {
        const data = JSON.parse(msg.content.toString());
        res.json({ data });

        channel.ack(msg);
      }
    }, { noAck: false });
    channel.publish(
      EXCHANGE_NAME,
      ROUTING_KEY.NOTIFICATION,
      Buffer.from(JSON.stringify(message)),
      {
        correlationId,
        replyTo: queue
      }
    );
  } catch (err) {
    next(err);
  }
});

router.put("/notifications", async (req, res, next) => {
  try {
    const ids = req.body;
    const correlationId = uuidv4()
    const channel = await getRabbitMQChannel();
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const message = { type: "update_notifications", ids }
    channel.consume(queue, (msg) => {
      if (msg.properties.correlationId === correlationId) {
        const data = JSON.parse(msg.content.toString());
        res.json({ data });

        channel.ack(msg);
      }
    }, { noAck: false });
    channel.publish(
      EXCHANGE_NAME,
      ROUTING_KEY.NOTIFICATION,
      Buffer.from(JSON.stringify(message)),
      {
        correlationId,
        replyTo: queue
      }
    );
  } catch (err) {
    next(err);
  }
})

router.post("/user/block", UserAuth, async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { data } = await service.BlockUser(userId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/user/unblock", UserAuth, async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { data } = await service.UnblockUser(userId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/user/verify-email", UserAuth, async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { data } = await service.VerifyEmail(userId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});




module.exports = router;
