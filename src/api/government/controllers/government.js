'use strict';

/**
 * government controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::government.government');
