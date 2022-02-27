'use strict';

/**
 * programming-language router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::programming-language.programming-language');
