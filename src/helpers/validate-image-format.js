const validateImageFormat = file => {
    const isValidFormat = file === 'image/jpeg' || file === 'image/png' || file === 'image/gif';

    return isValidFormat;
};

export default validateImageFormat;
