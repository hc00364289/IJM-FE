import React from 'react';
import { useSelector } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';

import { HeaderProfile } from '../components/userDetail/headerProfile';
import { UserDetail } from './userDetail';

export const ContributionsPage = (props) => {
  return (
    <>
      <div className="pb5 pt180 pull-center bg-tan">
        <h3>Link3</h3>
      </div>
    </>
  );
};

export const ContributionsPageIndex = (props) => {
  return (
    <div className="bg-tan w-100 cf">
      <div className="w-100 cf pb3">
        {' '}
        <HeaderProfile selfProfile={true} />{' '}
      </div>
      <div className="w-100 ph5-l ph2 cf pb3">{props.children}</div>
    </div>
  );
};

export const UserStats = (props) => {
  const userDetails = useSelector((state) => state.auth.get('userDetails'));
  return (
    <div className="pb5 pt180 pull-center bg-tan">
      <UserDetail username={userDetails.username} withHeader={false} />
    </div>
  );
};
export function MyNewProjects() {
  return (
    <div className="w-100 cf bg-tan blue-dark">
      <h3>Link2</h3>
    </div>
  );
}

export function MyNewTeam() {
  return (
    <div className="w-100 cf bg-tan blue-dark">
      <h3>Link4</h3>
    </div>
  );
}
