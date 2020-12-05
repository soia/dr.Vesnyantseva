const library = {};
library.json = {
    replacer(match, pIndent, pKey, pVal, pEnd) {
        const key = '<span class=json-key>';
        const val = '<span class=json-value>';
        const str = '<span class=json-string>';
        let r = pIndent || '';
        if (pKey) r = `${r + key + pKey.replace(/[": ]/g, '')}</span>: `;
        if (pVal) r = `${r + (pVal[0] === '"' ? str : val) + pVal}</span>`;
        return r + (pEnd || '');
    },
    prettyPrint(obj) {
        const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        return JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(jsonLine, library.json.replacer);
    },
};

export default library.json.prettyPrint;
