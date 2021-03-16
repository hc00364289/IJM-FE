import React, { useEffect, useState } from 'react';
import { Redirect } from '@reach/router';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ReactPlaceholder from 'react-placeholder';

// import { NotFound } from './notFound';
import { USER_STATS_API_URL } from '../config';
import { fetchExternalJSONAPI } from '../network/genericJSONRequest';

import DataTable from 'react-data-table-component';

export const UserDetail = ({ username, withHeader = true }) => {
  const token = useSelector((state) => state.auth.get('token'));
  const currentUser = useSelector((state) => state.auth.get('userDetails'));
  const [osmStats, setOsmStats] = useState({});
  const [errorDetails, loadingDetails, userDetails] = [];

  const columnsSummary = [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,

      minWidth: '100px',
    },

    {
      name: 'Director ',
      selector: 'director',
      sortable: true,
      grow: 2,
      minWidth: '100px',
    },
    {
      name: 'year',
      selector: 'year',
      sortable: true,
      grow: 2,

      minWidth: '100px',
    },
  ];
  const dataSum = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
      director: 'Tim Burton',
    },
    {
      id: 2,
      title: 'City of God',
      year: '2002',
      director: ' Fernando Meirelles,',
    },
    {
      id: 3,
      title: 'Memento',
      year: '2000',
      director: '  Christopher Nolan',
    },
  ];
  const rowSelectCritera = (row) => row.fat > 6;

  useEffect(() => {
    if (token && username) {
      fetchExternalJSONAPI(`${USER_STATS_API_URL}${username}`)
        .then((res) => setOsmStats(res))
        .catch((e) => console.log(e));
    }
  }, [token, username]);

  // if (!token) {
  //   return <Redirect to={'/login'} noThrow />;
  // }

  const blockClass = 'w-third-l w-50-m w-100 fl pa2';
  const titleClass = 'f3 fw6 ttu barlow-condensed blue-dark mt0 pt3 mb3';
  return errorDetails ? (
    <div></div>
  ) : (
    <div className="bg-tan w-100">
      <div className={withHeader ? 'w-100 ph4-l ph2 cf pb3' : ''}>
        <div className="mv4">
          {/* <ElementsMapped userStats={userStats} osmStats={osmStats} /> */}
        </div>
        <div className="mv4">
          <h3 className={titleClass}>Link 1</h3>

          <DataTable
            title="Movies"
            columns={columnsSummary}
            data={dataSum}
            selectableRows
            selectableRowSelected={rowSelectCritera}
          />
        </div>
      </div>
    </div>
  );
};
