export const STATE_REDUCER_KEY = "common";

export const VIDEO_PLAYER_CONFIG = {
    file: {
        attributes: {
            controlsList: "nodownload"
        },
        tracks: []
    },
    youtube: {
        playerVars: {
            modestbranding: 1,
            autoplay: 0,
            showinfo: 0
        }
    },
    vimeo: {
        playerOptions: {
            autopause: 0,
            muted: false
        },
        preload: "auto"
    }
};


