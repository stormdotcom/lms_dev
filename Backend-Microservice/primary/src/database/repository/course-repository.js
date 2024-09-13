const { Op } = require('sequelize');
const { User } = require('../models');
const Course = require('../models/Course');

class CourseRepository {
    async createCourse(courseData) {
        try {
            const existingCourse = await Course.findOne({ where: { slug: courseData.slug } });

            if (existingCourse) {
                throw new Error('Course with this slug already exists');
            }
            const course = await Course.create(courseData);
            return course;
        } catch (error) {
            throw new Error(error.message || 'Error creating course entry');
        }
    }

    async getCourse(criteria) {
        try {
            const course = await Course.findOne({
                where: criteria
            });
            return course.dataValues;
        } catch (error) {
            throw new Error('Error fetching course');
        }
    }
    async updateCourseDetailed({ criteria, data }) {
        try {
            const course = await Course.findOne({
                where: criteria
            });
            const currentOptions = course.options || {};

            const updatedOptions = {
                ...currentOptions,
                ...data
            };

            course.options = updatedOptions;

            await course.save();
        } catch (error) {
            throw new Error('Error fetching course');
        }
    }
    async searchCourse(criteria) {
        try {
            const courses = await Course.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.like]: `%${criteria}%` } },
                        { description: { [Op.like]: `%${criteria}%` } }
                    ]
                },
                attributes: ["slug", "title", "description", "thumbnailUrl"]
            });
            return courses.map(course => course.dataValues);
        } catch (error) {
            throw new Error('Error fetching courses');
        }
    }

    async updateCourse(courseId, updates) {
        try {
            const course = await Course.findByPk(courseId);
            if (!course) {
                throw new Error('Course not found');
            }

            const updatedCourse = await course.update(updates);
            return updatedCourse.dataValues;
        } catch (error) {
            console.error('Error updating course:', error);
            throw new Error('Error updating course');
        }
    }

    async deleteCourse(courseId) {
        try {
            const course = await Course.findByPk(courseId);
            if (!course) {
                throw new Error('Course not found');
            }
            await course.destroy();
            return true;
        } catch (error) {
            console.error('Error deleting course:', error);
            throw new Error('Error deleting course');
        }
    }

    async listCourses(criteria = {}, attributes = {}, includeUser = false) {
        try {
            const options = {
                where: criteria,
                attributes: attributes
            };

            if (includeUser) {
                options.include = [{
                    model: User,
                    as: 'instructor',
                    attributes: ['id', 'firstName', 'lastName']
                }];
            }

            const courses = await Course.findAll(options);
            return courses;
        } catch (error) {
            console.error('Error listing courses:', error);
            throw new Error('Error listing courses');
        }
    }
    async findById(id, pagination) {
        const { pageNo, pageSize, limit } = pagination;
        const offset = (pageNo - 1) * pageSize;
        const effectiveLimit = Math.min(pageSize, limit);

        try {
            const { count, rows: courses } = await Course.findAndCountAll({
                where: {
                    instructorId: id
                },
                offset: offset,
                limit: effectiveLimit
            });

            const totalPages = Math.ceil(count / pageSize);

            return {
                data: courses,
                pagination: {
                    pageNo: pageNo,
                    pageSize: pageSize,
                    totalRecords: count,
                    totalPages: totalPages,
                    hasNextPage: pageNo < totalPages,
                    hasPrevPage: pageNo > 1
                }
            };
        } catch (error) {
            console.error('Error listing courses:', error);
            throw new Error('Error listing courses');
        }
    }

    async findByCourseId(id) {
        try {
            const data = await Course.findAll({
                where: {
                    instructorId: id
                }
            });
            return data;
        } catch (error) {
            console.error('Error listing courses:', error);
            throw new Error('Error listing courses');
        }
    }
}

module.exports = CourseRepository;
