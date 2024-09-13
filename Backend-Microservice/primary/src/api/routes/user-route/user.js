const { EXCHANGE_NAME, ROUTING_KEY } = require("../../../config/constants");
const UserStreakService = require("../../../services/streak-service");
const UserService = require("../../../services/user-service");
const { getRabbitMQChannel, publishMessageConsume } = require("../../../utils/rabbit-mq");
const { v4: uuidv4 } = require('uuid');
const UserAuth = require("../../middlewares/auth");
const { upload } = require("../../../utils/filehandler");
const fs = require('fs');
const { FormateUserData } = require("../../../utils");
const { uploadFileToS3 } = require("../../../utils/s3Util");
const { validateProfileDetails, searchValidator } = require("../../../utils/validator/user-validator");
const express = require('express');
const UserProgressService = require("../../../services/user-progress-service");
const { APIError } = require("../../../utils/app-errors");
const { error } = require("console");
const CourseService = require("../../../services/course-service");
const router = express.Router();


const service = new UserService();
const userStreakService = new UserStreakService();
const progressService = new UserProgressService();
const courseService = new CourseService()

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
    const { id } = req.user;
    const data = await service.UpdateUser(id, req.body);
    return res.json({ data: FormateUserData(data) });
  } catch (err) {
    next(err);
  }
});

router.get("/search", searchValidator, async (req, res, next) => {
  try {
    const { search } = req.query;
    const data = await courseService.search(search);
    return res.json({ data });
  } catch (err) {
    next(err);
  }
});
router.get("/dashboard", async (req, res, next) => {
  try {
    const { id } = req.user;
    const lastAccessed = await progressService.getLastAccessedThree(id);
    const overAllProgress = await progressService.getCourseOverallProgress(id);
    const userProfile = await service.GetUserDetailDashboard(id);
    return res.json({ data: { userProfile, overAllProgress, lastAccessed } });
  } catch (err) {
    next(err);
  }
});

router.get('/activities', async (req, res, next) => {
  const { id } = req.user;
  const correlationId = uuidv4();

  try {
    const channel = await getRabbitMQChannel();
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const message = { type: 'get_recent_activities', userId: id };

    channel.consume(
      queue,
      (msg) => {
        if (msg.properties.correlationId === correlationId) {
          const response = JSON.parse(msg.content.toString());

          if (response.error) {
            res.status(500).json({ message: response.message });
          } else {
            res.status(200).json(response);
          }

          channel.ack(msg);
        }
      },
      { noAck: false }
    );

    channel.publish(
      EXCHANGE_NAME,
      ROUTING_KEY.ANALYTICS,
      Buffer.from(JSON.stringify(message)),
      {
        correlationId,
        replyTo: queue,
      }
    );

    console.log('Message published to queue:', message);

  } catch (err) {
    console.error('Error in /activities route:', err);
    res.status(500).json({ message: err.message });
    next(err);
  }
});

router.get("/notifications", async (req, res, next) => {
  try {
    const { id } = req.user;
    const { offset, limit } = req.query;
    const correlationId = uuidv4();
    const channel = await getRabbitMQChannel();
    const { queue } = await channel.assertQueue('', { exclusive: true });

    const message = { type: "get_notifications", userId: id, offset, limit };

    channel.consume(queue, (msg) => {
      if (msg.properties.correlationId === correlationId) {
        try {
          const data = JSON.parse(msg.content.toString());
          if (data.error) {
            res.status(500).json({ error: data.message });
          } else {
            res.json({ data });
          }
        } catch (error) {
          console.error('Error processing message:', error);
          res.status(500).json({ error: 'Failed to process notifications' });
        } finally {
          // Acknowledge the message regardless of the result
          channel.ack(msg);
        }
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
    const notificationId = req.params.id;
    const correlationId = uuidv4()
    const channel = await getRabbitMQChannel();
    const { queue } = await channel.assertQueue('', { exclusive: true });
    const message = { type: "update_notification", notificationId }
    channel.consume(queue, (msg) => {
      if (msg.properties.correlationId === correlationId) {
        try {
          const data = JSON.parse(msg.content.toString());
          if (data.error) {
            res.status(500).json({ error: data.message });
          } else {
            res.json({ data });
          }
        } catch (error) {
          console.error('Error notification message:', error);
          res.status(500).json({ error: 'Failed to update notifications' });
        } finally {
          channel.ack(msg);
        }
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
        try {
          const data = JSON.parse(msg.content.toString());
          if (data.error) {
            res.status(500).json({ error: data.message });
          } else {
            res.json({ data });
          }
        } catch (error) {
          console.error('Error processing message:', error);
          res.status(500).json({ error: 'Failed to process notifications' });
        } finally {
          channel.ack(msg);
        }
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


router.get("/learning-progress", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const message = { userId, type: "get_total_hours" }
    const totalLearningHours = await publishMessageConsume(message, ROUTING_KEY.ANALYTICS)
    return res.status(200).json({
      data: {
        dailyGoal: 0,
        weeklyGoal: 0,
        monthlyGoal: 0, mileStoneAchieved: 0,
        totalLearningHours
      }
    });
  } catch (err) {
    next(err);
  }
})

module.exports = router;
