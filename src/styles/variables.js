import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #020c1b;
    --navy: #ffffff; // Background
    --light-navy: #e0e0db; // Proj text box
    --lightest-navy: #233554; // No idea
    --navy-shadow: rgba(235, 230, 230, 0.7); // Proj shadows
    --dark-slate: #495670; // Scrollbar
    --slate: #42557a; // Most other text
    --light-slate: #000000; // Sidebar+proj text
    --lightest-slate: #000000; // Hero name, header titles, proj titles
    --white: #e6f1ff; // No idea
    --green: #253551; // Buttons,nums, links
    --green-tint: rgba(37, 53, 81, 0.1);

    --font-sans: 'Calibre', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 150px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
