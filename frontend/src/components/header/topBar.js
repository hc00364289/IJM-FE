import React from 'react';
import { SectionMenu } from '../menu';
//import { SectionMenu } from '../userDetail/';
import { FormattedMessage } from 'react-intl';
import messages from '../user/messages';
export function TopBar({ pageName }: Object) {
  const items = [
    { url: `/about`, label: <FormattedMessage {...messages.myStats} /> },
    {
      url: '/about/projects/?mappedByMe=1',
      label: <FormattedMessage {...messages.myProjects} />,
    },
    { url: '/about/tasks', label: <FormattedMessage {...messages.myTasks} /> },
    { url: '/about/teams', label: <FormattedMessage {...messages.myTeams} /> },
  ];

  return (
    <div className="cf w-100 bg-grey-light">
      {/* <SectionMenu items={items} /> */}
      <div className="ph6-l">
        <h1 className="ttu f1 barlow-condensed white pv3 ph4 mt6 mb0 bg-red dib">{pageName}</h1>
      </div>
    </div>
  );
}
