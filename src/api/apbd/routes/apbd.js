'use strict';

/**
 * apbd router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::apbd.apbd');
