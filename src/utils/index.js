const mapImage = Symbol('mapImage');
const createParticles = Symbol('createParticles');
const { random, floor, sin, cos, PI } = Math;
const instance = Symbol('instance');
const d = document;

/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 */
const getRelativeBrightness = (r, g, b) =>
  Math.sqrt(r ** 2 * 0.299 + g ** 2 * 0.587 + b ** 2 * 0.114) / 100;
