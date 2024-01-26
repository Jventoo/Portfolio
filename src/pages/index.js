import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Layout, Hero, About, CV, Featured, Projects, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const maintenanceContent = (
  <StyledMainContainer className="fillHeight">
    <StyledTitle>Site under maintenance</StyledTitle>
    <StyledSubtitle>Please visit https://www.linkedin.com/in/jack-vento/</StyledSubtitle>
  </StyledMainContainer>
);

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <Helmet title="Site under maintenance" />
    {content}
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
