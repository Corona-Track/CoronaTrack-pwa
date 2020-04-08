import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }


  #root {
    max-width: 600px;
    margin: 0 auto;

  }
    body {
      -webkit-font-smoothing: antialiased;
    }

    body, input, button, p, h1, div, span {
      font-family: 'Prompt', sans-serif;
    }

    a {
      text-decoration: none;
    }

    ul {
      list-style: none;
    }

    button {
      cursor: pointer;
    }

`;
