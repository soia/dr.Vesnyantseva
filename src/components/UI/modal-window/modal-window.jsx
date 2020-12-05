import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './modal-window.module.scss';

class ModalWindow extends Component {
    myRef = React.createRef();

    static propTypes = {
        children: PropTypes.element.isRequired,
        triggerButton: PropTypes.element.isRequired,
    };

    state = {
        isShow: false,
        clickedOutside: false,
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = e => {
        const { isShow } = this.state;
        if (isShow && !this.myRef.current.contains(e.target)) {
            this.setState({
                isShow: false,
                clickedOutside: true,
            });
        }
    };

    handleClickInside = () => this.setState({ clickedOutside: false });

    toggleModal = () => {
        this.setState(state => ({
            isShow: !state.isShow,
            clickedOutside: false,
        }));
    };

    render() {
        const { isShow, clickedOutside } = this.state;
        const { triggerButton, children } = this.props;
        const modalStyle = isShow && !clickedOutside
            ? classNames(style.modal, style.showModal)
            : style.modal;

        return (
            <div>
                <div
                    className={style.trigger}
                    onClick={this.toggleModal}
                >
                    {triggerButton}
                </div>
                <div className={modalStyle}>
                    <div
                        className={style.modalContent}
                        ref={this.myRef}
                        onClick={this.handleClickInside}
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalWindow;
