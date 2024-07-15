const handleProgressAchievementsMessages = async (msg, io) => {
    const { type = "", data = {} } = JSON.parse(msg.content.toString() || {});

    switch (type) {
        case "progress_made":
            console.log("progress made");
            io.emit('progress_made', { title: "Progress Made", message: `You have made progress: ${data}` });
            break;
        case "achievement_unlocked":
            console.log("achievement unlocked");
            io.emit('achievement_unlocked', { title: "Achievement Unlocked", message: `${data} unlocked a new achievement!` });
            break;
        default:
            break;
    }
};

module.exports = { handleProgressAchievementsMessages };
