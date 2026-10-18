import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }

  html.is-scrolling,
  body.is-scrolling {
    scrollbar-color: rgba(100, 116, 139, 0.4) transparent;
  }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  html::-webkit-scrollbar-track,
  body::-webkit-scrollbar-track {
    background: transparent;
  }

  html::-webkit-scrollbar-thumb,
  body::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 9999px;
    transition: background-color 0.25s ease;
  }

  html.is-scrolling::-webkit-scrollbar-thumb,
  body.is-scrolling::-webkit-scrollbar-thumb {
    background-color: rgba(100, 116, 139, 0.4);
  }

  html::-webkit-scrollbar-thumb:hover,
  body::-webkit-scrollbar-thumb:hover {
    background-color: rgba(100, 116, 139, 0.65) !important;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input, select, textarea {
    font-family: inherit;
  }
`;
