'use strict';

/**
 * apbd service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::apbd.apbd');
