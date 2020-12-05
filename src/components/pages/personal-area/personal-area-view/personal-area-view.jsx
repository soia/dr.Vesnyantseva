import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {
    profilePath,
    watchListPath,
    apiKeysPath,
    editApiKeysPath,
    addApiKeysPath,
    addWatchListPath,
    editWatchListPath,
    masterNodeValidatorPath,
    editMasterNodeValidatorPath,
    addMasterNodeValidatorPath,
    txnPrivateNotesPath,
    editTxnPrivateNotesPath,
    addTxnPrivateNotesPath,
} from '../../../../constants/pathLocation';
import { compose } from '../../../../utils';
import Aside from './aside';
import Profile from './profile-page';
import WatchList from './watch-list';
import WatchListAdd from './watch-list/watch-list-add';
import WatchListEdit from './watch-list/watch-list-edit';
import ApiKeys from './api-keys';
import apiKeysEdit from './api-keys/api-keys-edit';
import apiKeysAdd from './api-keys/api-keys-add';
import MasterNodeValidator from './masterNode-validator';
import MasterNodeValidatorAdd from './masterNode-validator/masterNode-validator-add';
import MasterNodeValidatorEdit from './masterNode-validator/masterNode-validator-edit';
import PrivateNotes from './private-notes';
import PrivateNotesEdit from './private-notes/private-notes-edit';
import PrivateNotesAdd from './private-notes/private-notes';
import style from './personal-area.module.scss';

const PersonalAreaView = () => (
    <div className={style.container}>
        <div className={style.wrapper}>
            <Aside />
            <Switch>
                <Route path={profilePath} component={Profile} exact />
                <Route path={watchListPath} component={WatchList} exact />
                <Route path={addWatchListPath} component={WatchListAdd} exact />
                <Route
                    path={`${editWatchListPath}/:id?`}
                    component={WatchListEdit}
                    exact
                />
                <Route path={apiKeysPath} component={ApiKeys} exact />
                <Route path={`${editApiKeysPath}/:id?`} component={apiKeysEdit} exact />
                <Route path={addApiKeysPath} component={apiKeysAdd} exact />
                <Route
                    path={masterNodeValidatorPath}
                    component={MasterNodeValidator}
                    exact
                />
                <Route
                    path={`${editMasterNodeValidatorPath}/:id?`}
                    component={MasterNodeValidatorEdit}
                    exact
                />
                <Route
                    path={addMasterNodeValidatorPath}
                    component={MasterNodeValidatorAdd}
                    exact
                />
                <Route path={txnPrivateNotesPath} component={PrivateNotes} exact />
                <Route
                    path={`${editTxnPrivateNotesPath}/:id?`}
                    component={PrivateNotesEdit}
                    exact
                />
                <Route path={addTxnPrivateNotesPath} component={PrivateNotesAdd} exact />
            </Switch>
        </div>
    </div>
);

export default compose(withRouter)(PersonalAreaView);
