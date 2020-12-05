import React from 'react';
import { useTranslation } from 'react-i18next';
import style from './contract.module.scss';

const ReadContract = () => {
    const { t } = useTranslation();

    return (
        <div className={style.readContract}>
            {t('readContract')}
        </div>
    );
};

export default ReadContract;
