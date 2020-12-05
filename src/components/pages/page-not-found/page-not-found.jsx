import React from 'react';

import style from './page-not-found.module.scss';
import notFound from './images/404.svg';

const PageNotFound = () => <div className={style.pageNotFound}><img src={notFound} alt="notFound" /></div>;

export default PageNotFound;
