'use strict';

/**
 * demography service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::demography.demography');
