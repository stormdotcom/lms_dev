
const Video = require('../database/models/Video');
const CourseRepository = require('../database/repository/course-repository');
const { APIError, STATUS_CODES } = require('../utils/app-errors');
const { generateSlug } = require('../utils/common-utils');

class CourseService {
    constructor() {
        this.repository = new CourseRepository();
    }

    async createCourse(instructorId, courseData) {
        try {
            const slug = generateSlug(courseData.title || "")
            const data = { date: Date.now(), slug, instructorId, ...courseData }
            const course = await this.repository.createCourse(data);
            return course;
        } catch (err) {
            throw new APIError(err.message || "Something went wrong", STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async getCourseById(courseId) {
        try {
            const course = await this.repository.getCourse({ id: courseId });
            return course;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }
    async updateDetailed(courseId, data) {
        try {
            const criteria = { id: courseId }
            const course = await this.repository.updateCourseDetailed({ criteria, data });
            return course;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }
    async updateCourseById(courseId, data) {
        try {
            const course = await this.repository.getCourse({ id: courseId });
            if (course) {
                const result = await this.repository.updateCourse(courseId, data);
                return result;
            }
            throw new APIError("No course found for this id", STATUS_CODES.INTERNAL_ERROR, true);

        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async getCourseBySlug(slug) {
        try {
            const course = await this.repository.getCourse({ slug });
            return course;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async updateCourse(courseId, updates) {
        try {
            const duration = Video.findAll({ where: { courseId }, attributes: ["duration"] })
            const updatedCourse = await this.repository.updateCourse(courseId, updates);
            return updatedCourse;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async deleteCourse(courseId) {
        try {
            const deleted = await this.repository.deleteCourse(courseId);
            return deleted;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }
    async search(criteria) {
        try {
            const data = await this.repository.searchCourse(criteria);
            return data.map(item => ({ ...item, type: "course", subTitle: item.description }));
        } catch (error) {

        }
    }

    async listCourses(criteria, attributes, includeUser) {
        try {
            const courses = await this.repository.listCourses(criteria, attributes, includeUser);
            return courses;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async getCoursersByInstructor(id, pagination) {
        try {
            const courses = await this.repository.findById(id, pagination);
            return courses;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }
    async getCoursersByInstructorGetId(id) {
        try {
            const courses = await this.repository.findByCourseId(id);
            return courses;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async getCoursersByInstructor(id, pagination) {
        try {
            const courses = await this.repository.findById(id, pagination);
            return courses;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }
}

module.exports = CourseService;
