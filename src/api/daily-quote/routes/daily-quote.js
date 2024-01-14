'use strict';

/**
 * daily-quote router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::daily-quote.daily-quote');
