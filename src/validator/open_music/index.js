const InvariantError = require('../../exceptions/InvariantError');
const { albumsSchema, songsSchema } = require('../../validator/open_music/schema');

const OpenMusicValidator = {
  validateAlbumsPayload: (payload) => {
    const { error, value } = albumsSchema.validate(payload, { abortEarly: false });
    if (error) {
      throw new InvariantError(error.details.map((err) => err.message).join(', '));
    }
    return value;
  },
  validateSongsPayload: (payload) => {
    const { error, value } = songsSchema.validate(payload, { abortEarly: false });
    if (error) {
      throw new InvariantError(error.details.map((err) => err.message).join(', '));
    }
    return value;
  },
};

module.exports = OpenMusicValidator;