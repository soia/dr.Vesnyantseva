const validateImageSize = file => {
    const isLt5M = file / 1024 / 1024 < 5;
    return isLt5M;
};

export default validateImageSize;
