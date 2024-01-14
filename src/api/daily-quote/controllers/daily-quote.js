'use strict';

/**
 * daily-quote controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::daily-quote.daily-quote');
