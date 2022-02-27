'use strict';

/**
 * programming-language service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::programming-language.programming-language');
