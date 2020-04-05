import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body, #root {
      height: 100%;
    }

  #root {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;

  }
    body {
      -webkit-font-smoothing: antialiased;
    }

    body, input, button, p, h1 {
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
