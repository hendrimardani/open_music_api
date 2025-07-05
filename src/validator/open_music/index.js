const InvariantError = require('../../exceptions/InvariantError');
const { albumnsSchema, songsSchema } = require('../../validator/open_music/schema');

const OpenMusicValidator = {
  validateAlbumnsPayload: (payload) => {
    const validationResult = albumnsSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateAlbumnsPayload: (payload) => {
    const validationResult = songsSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = OpenMusicValidator;