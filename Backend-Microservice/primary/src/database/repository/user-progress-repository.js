
const { setCachedData, getCachedData } = require('../../utils/cache');
const { sequelize } = require('../connection');
const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');
const Video = require('../models/Video');

const getTotalProgressById = (courseId, data, totalVideos) => {
    const courseData = data.filter((item) => item.courseId === courseId);

    const totalProgress = courseData.reduce((sum, item) => sum + parseFloat(item.progress), 0);

    const progressPercentage = ((totalProgress / totalVideos) * 100).toFixed(2);
    return progressPercentage
}
class UserProgressRepository {
    async createUpdateUserProgress(data) {
        const { userId, videoId, courseId, progress } = data;
        try {
            let isVideoProgress = await UserProgress.findOne({
                where: {
                    userId,
                    videoId,
                    courseId
                },
            });
            if (!isVideoProgress) {
                videoDuration = await UserProgress.create({
                    userId,
                    videoId,
                    courseId,
                    progress
                });
            } else {
                if (isVideoProgress.dataValues.progress < progress) {
                    isVideoProgress.progress = progress;
                    await isVideoProgress.save()
                }

            }
            return isVideoProgress
        } catch (error) {
            console.error('Error creating or updating video progress:', error);
            throw new Error('Error creating or updating video progress');
        }
    }
    async getCourseOverallProgress(userId) {
        try {
     
            const courseProgressEntries = await UserProgress.findAll({
                where: { userId },
                attributes: [
                    'courseId',
                    [sequelize.fn('SUM', sequelize.col('progress')), 'totalProgress']
                ],
                group: ['courseId'],
                useCache: true, 
                cacheTTL: 60  
            });
            // console.log("here", courseProgressEntries)
            const progress = courseProgressEntries?.map(item => item.dataValues?  item.dataValues : item) || 0
            if (!progress || progress.length === 0) {
                return 0;
            }

            // Calculate the total progress by summing all unique course progresses
            const totalProgress = progress.reduce((total, entry) => {
                return total + parseFloat(entry['totalProgress']);
            }, 0);

            // Calculate the overall progress
            const overallProgress = totalProgress / progress.length;
            return overallProgress > 100 ? 100 : overallProgress.toFixed(1);
        } catch (error) {
            console.error('Error retrieving course overall progress:', error);
            throw new Error('Error retrieving course overall progress');
        }
    }
    async getLastAccessedThree(userId) {
        try {
            const qresult = await UserProgress.findAll({
                where: { userId },
                order: [['updatedAt', 'DESC']],
                include: [{
                    as: "Course",
                    model: Course,
                    attributes: ['slug', 'id', 'title']
                }],
                useCache: true, 
                cacheTTL: 300  
            });
            const courseProgressEntries = qresult.dataValues ? qresult.dataValues : qresult
            if (!courseProgressEntries || courseProgressEntries.length === 0) {
                return [];
            }
            const uniqueCoursesMap = new Map();

            for (const entry of courseProgressEntries) {
                if (!uniqueCoursesMap.has(entry.courseId)) {

                    const totalVideos = await Video.count({
                        where: { courseId: entry.courseId }
                    });

                    uniqueCoursesMap.set(entry.courseId, {
                        course: entry.Course,
                        totalProgress: parseFloat(entry.progress),
                        totalVideos,
                        entry
                    });
                } else {
                    const existingEntry = uniqueCoursesMap.get(entry.courseId);
                    existingEntry.totalProgress += parseFloat(entry.progress);
                    existingEntry.entry = entry; // Update the latest entry
                    uniqueCoursesMap.set(entry.courseId, existingEntry);
                }
            }

            const lastAccessedThreeCourses = Array.from(uniqueCoursesMap.values()).slice(0, 3);

            // Prepare the final result
            const result = lastAccessedThreeCourses.map(({ course, totalProgress, totalVideos, entry }) => ({
                ...entry.dataValues,
                // course,
                totalProgress: totalProgress.toFixed(2),
                progressPercentage: ((totalProgress / totalVideos) * 100).toFixed(2) // Calculate percentage
            }));

            return result;
        } catch (error) {
            console.error('Error retrieving last accessed three courses:', error);
            throw new Error('Error retrieving last accessed three courses');
        }
    }
}





module.exports = UserProgressRepository;
