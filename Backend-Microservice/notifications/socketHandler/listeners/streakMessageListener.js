const handleStreaksMessages = async (msg, io) => {
    const { type = "", data = {} } = JSON.parse(msg.content.toString() || {});

    switch (type) {
        case "streak_achieved":
            console.log("streak achieved");
            io.emit('streak_achieved', { title: "Streak Achieved", message: `${data} has achieved a new streak!` });
            break;
        default:
            break;
    }
};

module.exports = { handleStreaksMessages };
