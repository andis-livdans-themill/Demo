import { formats, transformGroups } from 'style-dictionary/enums';

const { cssVariables } = formats;

function generateComponentFiles(components) {
  return components.map((comp) => ({
    // output the component tokens in the right folder and file e.g. components/button/button-vars.css
    destination: `components/${comp}/${comp}-vars.css`,
    format: cssVariables,
    // only include the tokens that are inside this component token group
    filter: (token) => token.path[0] === comp,
  }));
}

export default {
  source: ['tokens.json'],
  source: ['tokens.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      files: [
        {
          destination: 'global.css',
          format: cssVariables,
          // filter only the tokens that are inside the global object
          filter: (token) => token.path[0] === 'global',
        },
        // dynamically generate file outputs for each component
        ...generateComponentFiles(['button', 'select', 'switch']),
      ],
    },
  },
};