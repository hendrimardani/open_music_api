const OpenMusicValidator = require("../../validator/open_music");

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: (request, h) => handler.postAlbumsHandler(request, h),
    options: {
      validate: {
        payload: (value, options) => {
          return OpenMusicValidator.validateAlbumsPayload(value);
        },
        failAction: (request, h, error) => {
          return h.response({
            status: 'fail',
            message: error.details ? error.details.map((err) => err.message) : error.message,
          }).code(400).takeover();
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: (request, h) => handler.getAlbumsByIdHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: (request, h) => handler.putAlbumsByIdHandler(request, h),
    options: {
      validate: {
        payload: (value, options) => {
          return OpenMusicValidator.validateAlbumsPayload(value);
        },
        failAction: (request, h, error) => {
          return h.response({
            status: 'fail',
            message: error.details ? error.details.map((err) => err.message) : error.message,
          }).code(400).takeover();
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: (request, h) => handler.deleteAlbumsByIdHandler(request, h),
  },
  {
    method: 'POST',
    path: '/songs',
    handler: (request, h) => handler.postSongsHandler(request, h),
    options: {
      validate: {
        payload: (value, options) => {
          return OpenMusicValidator.validateSongsPayload(value);
        },
        failAction: (request, h, error) => {
          return h.response({
            status: 'fail',
            message: error.details ? error.details.map((err) => err.message) : error.message,
          }).code(400).takeover();
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/songs',
    handler: (request, h) => handler.getSongsHandler(request, h),
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: (request, h) => handler.getSongsByIdHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: (request, h) => handler.putSongsByIdHandler(request, h),
    options: {
      validate: {
        payload: (value, options) => {
          return OpenMusicValidator.validateSongsPayload(value);
        },
        failAction: (request, h, error) => {
          return h.response({
            status: 'fail',
            message: error.details ? error.details.map((err) => err.message) : error.message,
          }).code(400).takeover();
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: (request, h) => handler.deleteSongsByIdHandler(request, h),
  }
];

module.exports = routes;