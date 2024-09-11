'use strict';

/**
 * headman router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::headman.headman');
