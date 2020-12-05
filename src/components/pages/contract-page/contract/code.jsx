import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import SyntaxHighlighter from 'react-syntax-highlighter';
import classNames from 'classnames';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import notification from '../../../../helpers/notifications';
import copyToClipboard from '../../../../helpers/copy-to-clipboard';
import conractSourseCode from './contract-source-code';
import { compose } from '../../../../utils';
import successIcon from '../../../assets/images/icons/success-icon.svg';
import extendIcon from '../../../assets/images/icons/extend-icon.svg';
import CopyIcon from '../../../assets/images/icons/copy-icon';
import style from './contract.module.scss';

class Code extends Component {
    static defaultProps = {
        t: () => {},
    };

    static propTypes = {
        t: PropTypes.func,
    };

    state = {
        extend: false,
    };

    copied = value => {
        const { t } = this.props;
        copyToClipboard(value);
        notification(t('successNotification'), t('сopiedToClipboard'), 'success');
    };

    switchExtend = () => {
        this.setState(state => ({
            extend: !state.extend,
        }));
    };

    render() {
        const { extend } = this.state;
        const syntaxHighlighterStyle = extend
            ? classNames(style.syntaxHighlighter, style.syntaxHighlighterOpen)
            : style.syntaxHighlighter;

        return (
            <div className={style.code}>
                <div className={style.code__codeVerified}>
                    <img
                        className={style.code__codeVerified_icon}
                        src={successIcon}
                        alt="icon"
                    />
                    <p>Contract Source Code Verified (Similar Match)</p>
                </div>
                <p className={style.code__note}>
                    Note: This contract matches the deployed ByteCode of the Source Code
                    for Contract{' '}
                    <Link to="/">0x487b653c98e12b00938c132a96d9565138865be5</Link>
                </p>
                <div className={style.code__infoWrapper}>
                    <div className={style.code__infoWrapper_item}>
                        <p>Contract Name: ERC20</p>
                        <p>Compiler Version: v0.4.24+commit.e67f0147</p>
                    </div>
                    <div className={style.code__infoWrapper_item}>
                        <p>Optimization Enabled: Yes with 200 runs</p>
                        <p>Other Settings: default evmVersion</p>
                    </div>
                </div>
                <div className={style.code__sourceCode}>
                    <div className={style.code__sourceCode_header}>
                        <p>Contract Source Code (Solidity)</p>
                        <div className={style.code__iconsWrapper}>
                            <div onClick={() => this.copied(conractSourseCode)}>
                                <CopyIcon className={style.code__sourceCode_copy} />
                            </div>
                            <div onClick={this.switchExtend}>
                                <img src={extendIcon} alt="extendIcon" />
                            </div>
                        </div>
                    </div>
                    <div className={syntaxHighlighterStyle}>
                        <SyntaxHighlighter
                            language="jsx"
                            style={docco}
                            showLineNumbers
                            wrapLines
                        >
                            {conractSourseCode}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withTranslation())(Code);
