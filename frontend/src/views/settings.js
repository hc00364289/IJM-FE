import React from 'react';

import {
  UserInformationForm,
  UserSettingsForm,
  UserNotificationsForm,
} from '../components/user/forms';

export function Settings() {
  return (
    <div className="pull-center">
      <div className="cf pa4 bg-tan">
        <div className="fl w-100 w-40-l pb3 pl3-l">
          <UserInformationForm />
        </div>

        <div className="fl w-100 w-60-l pb3 pr3-l">
          <UserSettingsForm />
          <UserNotificationsForm />
        </div>
      </div>
    </div>
  );
}
