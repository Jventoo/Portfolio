import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledCVSection = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 420px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--lightest-slate)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 150px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: #6197ff;
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 150%;
  height: auto;
  padding: 5px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.2;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 15px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const CV = () => {
  const data = useStaticQuery(graphql`
    query {
      cv: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/cv/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        group(field: { frontmatter: { company: SELECT } }) {
          fieldValue
          totalCount
          edges {
            node {
              frontmatter {
                date
                title
                company
                location
                range
                url
                sidebar
                project
              }
              html
            }
          }
        }
      }
    }
  `);

  const sortCV = (a, b) => {
    const dateA = a.edges[0].node.frontmatter.date;
    const dateB = b.edges[0].node.frontmatter.date;
    return new Date(dateB) - new Date(dateA);
  };

  const cvData = data.cv.group.toSorted(sortCV);

  let panelIndex = 0;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  const cvSection = (
    <StyledCVSection id="cv" ref={revealContainer}>
      <h2 className="numbered-heading">Curriculum Vitae</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="CV tabs" onKeyDown={e => onKeyDown(e)}>
          {cvData &&
            cvData.map((group, i) => {
              // Only generating one tab per company
              const node = group.edges[0].node;
              const { sidebar } = node.frontmatter;
              const { company } = node.frontmatter;

              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{sidebar ? sidebar : company}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>
        <StyledTabPanels>
          {cvData &&
            cvData.map((group, groupIdx) =>
              group.edges.map(({ node }, idxInGroup) => {
                const { frontmatter, html } = node;
                const { title, url, company, range, project } = frontmatter;
                const panelKey = panelIndex;
                const panelGroupID = groupIdx;

                const panel = (
                  <CSSTransition
                    key={panelKey}
                    in={activeTabId === panelGroupID}
                    timeout={250}
                    classNames="fade">
                    <StyledTabPanel
                      id={`panel-${panelKey}`}
                      role="tabpanel"
                      tabIndex={activeTabId === panelGroupID ? '0' : '-1'}
                      aria-labelledby={`tab-${panelGroupID}`}
                      aria-hidden={activeTabId !== panelGroupID}
                      hidden={activeTabId !== panelGroupID}>
                      <h3>
                        <span>{title}</span>
                        <span className="company" hidden={idxInGroup !== 0}>
                          &nbsp;-&nbsp;
                          <a href={url} className="inline-link">
                            {company}
                          </a>
                        </span>
                      </h3>

                      <p className="range">
                        <span>
                          {project}
                          {project && <span>,&nbsp;</span>}
                          {range}
                        </span>
                      </p>

                      <div dangerouslySetInnerHTML={{ __html: html }} />
                    </StyledTabPanel>
                  </CSSTransition>
                );

                panelIndex = panelIndex + 1;

                return panel;
              }),
            )}
        </StyledTabPanels>
      </div>
    </StyledCVSection>
  );

  panelIndex = 0;

  return cvSection;
};

export default CV;
