import React, { Suspense } from 'react';

import { ProjectSearchResults } from '../components/projects/projectSearchResults';

export const ProjectsPage = (props) => {
  return (
    <div className="pull-center">
      <section className="cf">
        <ProjectSearchResults />
      </section>
    </div>
  );
};
