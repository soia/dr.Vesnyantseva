import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Pag from 'rc-pagination';
import DropDown from '../../UI/drop-down/drop-down';
import style from './paginations.module.scss';

const Pagination = ({
    numItemsPerPage,
    recordsOnClick,
    totalCount,
    currentPageNumber,
    paginationOnChange,
}) => {
    const { t } = useTranslation();

    const textItemRender = (current, type, element) => {
        if (type === 'prev') {
            return t('previous');
        }
        if (type === 'next') {
            return t('next');
        }
        return element;
    };

    const arr = [
        {
            value: 10,
        },
        {
            value: 25,
        },
        {
            value: 50,
        },
        {
            value: 100,
        },
    ];

    if (+totalCount < 11) {
        return null;
    }

    return (
        <div className={style.pagination}>
            <div className={style.records}>
                <DropDown
                    placeholder={numItemsPerPage}
                    dropDownList={arr}
                    onClick={recordsOnClick}
                />
            </div>
            <Pag
                showTitle={false}
                total={+totalCount}
                pageSize={numItemsPerPage}
                itemRender={textItemRender}
                current={+currentPageNumber}
                onChange={paginationOnChange}
                jumpNextIcon=". . ."
                jumpPrevIcon=". . ."
            />
        </div>
    );
};

Pagination.defaultProps = {
    recordsOnClick: () => {},
    paginationOnChange: () => {},
    numItemsPerPage: '',
    totalCount: 1,
    currentPageNumber: '',
};

Pagination.propTypes = {
    recordsOnClick: PropTypes.func,
    paginationOnChange: PropTypes.func,
    numItemsPerPage: PropTypes.any,
    totalCount: PropTypes.any,
    currentPageNumber: PropTypes.any,
};

export default Pagination;
