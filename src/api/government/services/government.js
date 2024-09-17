'use strict';

/**
 * government service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::government.government');
