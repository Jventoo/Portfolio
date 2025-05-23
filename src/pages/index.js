import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, About, CV, Featured, Projects, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

// const StyledTitle = styled.h1`
//   color: var(--green);
//   font-family: var(--font-mono);
//   font-size: clamp(100px, 25vw, 200px);
//   line-height: 1;
//   flex-direction: column;
//   align-items: flex-start;
//   margin-top: 20vh;
//   min-height: 70vh;
//   padding: 0;
// `;
// const StyledSubtitle = styled.h2`
//   font-size: clamp(30px, 5vw, 50px);
//   font-weight: 400;
// `;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <CV />
      <Featured />
      <Projects />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
