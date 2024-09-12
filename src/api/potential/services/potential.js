'use strict';

/**
 * potential service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::potential.potential');
