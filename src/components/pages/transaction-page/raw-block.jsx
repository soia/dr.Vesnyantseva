/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import prettyPrint from '../../../helpers/pretty-json';

const Code = ({ code }) => (
    <pre>
        <div dangerouslySetInnerHTML={{ __html: prettyPrint(code) }} />
    </pre>
);

Code.defaultProps = {
    code: {},
};

Code.propTypes = {
    code: PropTypes.object,
};

export default Code;
