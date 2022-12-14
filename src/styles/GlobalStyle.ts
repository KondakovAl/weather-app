import { createGlobalStyle } from 'styled-components';

/*Import Styles*/
import { colors,  gradients } from './variables';

const GlobalSlyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
  }  

  body {
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    line-height: 14.5px;
    color: ${colors.lightColor};
    background: ${gradients.other};
    font-weight: 400;
  }

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

ul,
ol {
  list-style: none;
}

button,
select {
  font: inherit;
  color: inherit;
  border: none;
  background: transparent;
}
`;

export {GlobalSlyle}