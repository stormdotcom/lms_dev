export const getCounts = (data) => {
    let count = data.reduce((acc, obj) => {
        if (!obj.hasRead) {
            acc += 1;
        }
        return acc;
    }, 0);

    return count;
};
