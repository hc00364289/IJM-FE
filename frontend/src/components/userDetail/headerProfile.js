import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from '../user/messages';
import { TwitterIconNoBg, FacebookIcon, LinkedinIcon, ProfilePictureIcon } from '../svgIcons';
//import { MappingLevelMessage } from '../mappingLevel';
//import { NextMappingLevel } from '../user/settings';
//import { UserOrganisations } from './userTeamsOrgs';
import { SectionMenu } from '../menu';
//import OsmLogo from '../../assets/img/osm_logo.png';
import { OSM_SERVER_URL } from '../../config';

const SocialMedia = ({ data }) => {
  const socialMediaItems = ['twitterId', 'facebookId', 'linkedinId'];

  const getSocialIcon = (field) => {
    const iconStyle = {
      width: '1.4em',
      height: '1.4em',
    };

    switch (field) {
      case 'twitterId':
        return <TwitterIconNoBg style={iconStyle} className="light-blue v-mid" />;
      case 'facebookId':
        return <FacebookIcon style={iconStyle} className="dark-blue v-mid" />;
      case 'linkedinId':
        return <LinkedinIcon style={iconStyle} className="blue v-mid" />;
      default:
        return null;
    }
  };

  const createLink = (field, value) => {
    const aClass = 'blue-grey no-underline';
    let url = null;
    switch (field) {
      case 'twitterId':
        url = 'https://www.twitter.com/' + value;
        break;
      case 'facebookId':
        url = 'https://www.facebook.com/' + value;
        break;
      case 'linkedinId':
        url = 'https://www.linkedin.com/' + value;
        break;
      case 'osm':
        url = OSM_SERVER_URL + '/user/' + value;
        break;
      default:
        return null;
    }

    return (
      <a className={aClass} rel="noopener noreferrer" target="_blank" href={url}>
        {value}
      </a>
    );
  };

  return (
    <ul className="list pa0 ma0 mt3">
      <li className="dib mr4-ns mr2 cf f7">
        <div className="mr2 h2">
          {/* <img className="h1 v-mid" src={OsmLogo} alt="OpenStreetMap" />{' '} */}
          {createLink('osm', data.username)}
        </div>
      </li>
      {socialMediaItems.map((i) => {
        if (data[i] === null) {
          return null;
        }

        return (
          <li key={i} className="dib mr4-ns mr2 cf f7">
            <div className="mr2 h2">
              {getSocialIcon(i)} {createLink(i, data[i])}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const MyContributionsNav = () => {
  const items = [
    { url: `/adminforms`, label: <FormattedMessage {...messages.myStats} /> },
    {
      url: '/adminforms/projects/?mappedByMe=1',
      label: <FormattedMessage {...messages.myProjects} />,
    },
    { url: '/adminforms/tasks', label: <FormattedMessage {...messages.myTasks} /> },
    { url: '/adminforms/teams', label: <FormattedMessage {...messages.myTeams} /> },
  ];

  return (
    <div className="fl ph5-l ph2">
      <SectionMenu items={items} />
    </div>
  );
};

export const HeaderProfile = ({ userDetails, changesets, selfProfile }) => {
  // const authDetails = useSelector((state) => state.auth.get('userDetails'));
  //const [user, setUser] = useState({});

  // useEffect(() => {
  //   if (selfProfile && authDetails) {
  //     setUser(authDetails);
  //   }
  // }, [selfProfile, authDetails, authDetails.username]);

  // useEffect(() => {
  //   if (userDetails && userDetails.id) {
  //     setUser(userDetails);
  //   }
  // }, [userDetails]);

  return (
    <>
      <div className="w-100 h-100 cf pv3 pl5-l ph2 bg-white blue-dark">
        <div className="fl dib pr3">
          {/* {user.pictureUrl ? (
            <img
              className="h4 w4 br-100 pa1 ba b--grey-light bw3 red"
              src={user.pictureUrl}
              alt={user.username}
            />
          ) : (
            <ProfilePictureIcon className="red" />
          )} */}
        </div>
        <div className="w-70-ns w-100 fl dib">
          <div className="pl2 dib w-50-l fl w-100">
            {/* <p className="barlow-condensed f2 ttu b ma0 mb2">{user.name || user.username}</p> */}
            <p className="f4 ma0 mb2">{/* <MappingLevelMessage level={user.mappingLevel} /> */}</p>
            {/* <NextMappingLevel changesetsCount={changesets} /> */}
            {/* <SocialMedia data={user} /> */}
          </div>
          <div className="pt1 dib fl w-50-l w-100 v-btm">
            {/* <UserOrganisations userId={user.id} /> */}
          </div>
        </div>
      </div>
      {/* {user.username === authDetails.username && <MyContributionsNav username={user.username} />} */}
      {<MyContributionsNav />}
    </>
  );
};
