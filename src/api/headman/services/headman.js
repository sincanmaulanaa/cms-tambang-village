'use strict';

/**
 * headman service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::headman.headman');
