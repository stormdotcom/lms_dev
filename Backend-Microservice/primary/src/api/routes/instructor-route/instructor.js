const { EXCHANGE_NAME, ROUTING_KEY } = require("../../../config/constants");
const UserService = require("../../../services/user-service");
const { getRabbitMQChannel } = require("../../../utils/rabbit-mq");
const { ResponseDataSuccess } = require("../../../utils/common-utils");
const { upload } = require("../../../utils/filehandler");
const fs = require('fs');
const { FormateUserData } = require("../../../utils");
const { uploadFileToS3 } = require("../../../utils/s3Util");
const { validateProfileDetails } = require("../../../utils/validator/user-validator");
const express = require('express');
const Course = require("../../../database/models/Course");
const CourseService = require("../../../services/course-service");
const Enrollment = require("../../../database/models/Enrollment");
const router = express.Router();

const service = new UserService();
const courseService = new CourseService();
router.post("/learning/upload", async (req, res, next) => {
    try {
        // db saved
        if (1 === 1) {
            const channel = await getRabbitMQChannel();
            const notification = { type: "course_added", data: "Course Name" }; // send to analytics server
            channel.publish(
                EXCHANGE_NAME,
                ROUTING_KEY.NOTIFICATION,
                Buffer.from(JSON.stringify(notification))
            );
            return res.status(201).json(ResponseDataSuccess());
        }
    } catch (err) {
        next(err);
    }
});
//    ALL_COURSE: "service/instructor/course/all",
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
        const { data } = await service.GetCurrentUserDetails(id);

        return res.json(FormateUserData(data));
    } catch (err) {
        next(err);
    }
});

router.put("/profile", validateProfileDetails, async (req, res, next) => {
    try {
        const { id } = req.user;
        const data = await service.UpdateUser(id, req.body);
        return res.json(FormateUserData(data));
    } catch (err) {
        next(err);
    }
});

router.put("/profile-image-upload", upload.single('file'), async (req, res, next) => {
    try {
        const folder = "profile-picture";
        const filePath = req.file.path;
        const { url } = await uploadFileToS3(folder, filePath);

        fs.unlinkSync(filePath);
        const { id } = req.user;
        const data = await service.UpdateAvatar(id, url);

        return res.status(201).json(data);
    } catch (err) {
        console.log("Error : \n", err)
        next(err);
    }
})
router.get("/dashboard", async (req, res, next) => {
    try {
        const { id } = req.user;

        const publishedCourse = await Course.findAndCountAll({
            where: { instructorId: id, publish: true }
        });
        const DraftedCourse = await Course.findAndCountAll({
            where: { instructorId: id, publish: false }
        })
        const totalCourse = await Course.findAndCountAll({
            where: { instructorId: id }
        })
        const allCourses = await courseService.getCoursersByInstructorGetId(id);

        const allCourseId = allCourses.map(item => item.id);


        const totalStudents = await Enrollment.findAndCountAll({
            where: {
                courseId: allCourseId
            }
        });

        const instructorDashboard = [
            { value: 0, title: "Total Earnings", Icon: "HiCurrencyDollar" },
            { value: publishedCourse.count, title: "Published Course", Icon: "HiBookOpen" },
            { value: totalStudents.count, title: "Total Students", Icon: "HiUserGroup" },
            { value: DraftedCourse.count, title: "Drafted Course", Icon: "HiDocument" },
            { value: totalCourse.count, title: "All Courses", Icon: "HiClipboardCheck" },
            { value: 0, title: "Others", Icon: "HiCollection" }
        ];
        return res.json({ data: instructorDashboard });
    } catch (err) {
        next(err);
    }
});
module.exports = router;