import injectDevServer from '@cypress/react/plugins/react-scripts'

/// <reference types="cypress" />

/**
 *
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  injectDevServer(on, config)
  return config
}
