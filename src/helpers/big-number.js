/* eslint-disable no-restricted-properties */
const toFixedBigValue = (x = 0, numberAfterDot) => {
    if (Math.abs(x) < 1.0) {
        const e = parseInt(x.toString().split('e-')[1], 10);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = `0.${(new Array(e)).join('0')}${x.toString().substring(2)}`;
        }
    } else {
        let e = parseInt(x.toString().split('+')[1], 10);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }

    let number = '';
    const value = parseFloat(x).toFixed(numberAfterDot);
    number = value.replace(/0*$/, '');
    return number.replace(/\.$/gm, '');
};

export default toFixedBigValue;
