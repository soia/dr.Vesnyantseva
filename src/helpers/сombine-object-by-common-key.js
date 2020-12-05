const combineObjectByCommonKey = (arr1, arr2, name) => arr1.map(itm => ({
    ...arr2.find(item => (+item[name] === +itm[name]) && item),
    ...itm,
}));

export default combineObjectByCommonKey;
