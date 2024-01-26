import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, About, CV, Featured, Projects, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <Helmet title="Site under maintenance" />
    {/* <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <CV />
      <Featured />
      <Projects />
      <Contact />
    </StyledMainContainer> */}
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
