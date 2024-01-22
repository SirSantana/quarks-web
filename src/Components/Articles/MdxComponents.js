import React from 'react';

const components = {
  h1: (props) => <h1 style={{ color: 'blue' }} {...props} />,
  a: (props) => <a style={{ color: 'green' }} {...props} />,
  // Agrega más componentes personalizados según sea necesario
};

export { components };