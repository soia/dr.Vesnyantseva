import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Code from './code';
import ReadContract from './read-contract';
import WriteContract from './write-contract';
import style from './contract.module.scss';

const Contract = () => {
    const { t } = useTranslation();
    const tabsId = {
        code: 1,
        readContract: 2,
        writeContract: 3,
    };

    const tabs = [
        {
            id: tabsId.code,
            title: t('code'),
        },
        {
            id: tabsId.readContract,
            title: t('readContract'),
        },
        {
            id: tabsId.writeContract,
            title: t('writeContract'),
        },
    ];

    const [activeTab, setTab] = useState(tabsId.code);

    return (
        <div className={style.contract}>
            <div className={style.tabWrapper}>
                {tabs.map(item => {
                    const { id, title } = item;

                    const itemTabStyle = activeTab === id
                        ? style.tabWrapper__tabActive
                        : style.tabWrapper__tab;

                    return (
                        <div
                            key={id}
                            className={itemTabStyle}
                            onClick={() => setTab(id)}
                        >
                            {title}
                        </div>
                    );
                })}
            </div>
            {activeTab === tabsId.code ? <Code /> : null}
            {activeTab === tabsId.readContract ? <ReadContract /> : null}
            {activeTab === tabsId.writeContract ? <WriteContract /> : null}
        </div>
    );
};

export default Contract;
