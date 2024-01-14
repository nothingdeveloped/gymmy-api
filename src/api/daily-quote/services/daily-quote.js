'use strict';

/**
 * daily-quote service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::daily-quote.daily-quote');
