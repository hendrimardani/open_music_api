const Joi = require('joi');

const albumsSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

const songsSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

module.exports = { albumsSchema, songsSchema };