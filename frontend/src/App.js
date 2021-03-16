import React from 'react';
import { Router, Redirect, globalHistory } from '@reach/router';
import { QueryParamProvider } from 'use-query-params';
import { useMeta } from 'react-meta-elements';
import { connect } from 'react-redux';

import './assets/styles/index.scss';
import { ORG_NAME, MATOMO_ID } from './config';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Preloader } from './components/preloader';
import { Home } from './views/home';
import { AboutPage } from './views/about';
import { UserDetail } from './views/userDetail';
import { ProjectsPage } from './views/project';
import { Settings } from './views/settings';

import {
  ContributionsPage,
  ContributionsPageIndex,
  UserStats,
  MyNewTeam,
  MyNewProjects,
} from './views/contributions';
import { Banner } from './components/banner/index';

/*TODO(tdk): if QueryParamProvider is not needed elsewhere,
 *  create special sub-router for Projects page and wrap it only around that */
let App = (props) => {
  useMeta({ property: 'og:url', content: process.env.REACT_APP_BASE_URL });
  useMeta({ name: 'author', content: ORG_NAME });
  const { isLoading } = props;

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="w-100 base-font bg-white" lang={props.locale}>
          <Router>
            <Header path="/*" />
          </Router>
          <main className="cf w-100 base-font">
            <QueryParamProvider reachHistory={globalHistory}>
              <Router primary={false}>
                <Home path="/" />
                <ProjectsPage path="projects"></ProjectsPage>
                <AboutPage path="about" />
                <ContributionsPageIndex path="adminforms">
                  <UserStats path="/" />
                  <ContributionsPage path="tasks/*" />
                  <MyNewProjects path="projects/*" />

                  <MyNewTeam path="teams/*" />
                </ContributionsPageIndex>
                <UserDetail path="users/:username" />

                <Settings path="enquiryform" />
              </Router>
            </QueryParamProvider>
          </main>
          {MATOMO_ID && <Banner />}
          <Router primary={false}>
            <Footer path="/*" />
          </Router>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  locale: state.preferences.locale,
});

App = connect(mapStateToProps)(App);

export default App;
