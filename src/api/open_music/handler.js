class OpenMusicHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postAlbumsHandler(request, h) {
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbums({ name, year });
    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumsByIdHandler(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbumsById({ id });
    const response = h.response({
      status: 'success',
      data: {
        album,
      },
    });
    response.code(200);
    return response;
  }

  async putAlbumsByIdHandler(request, h) {
    const { id } = request.params;
    const { name, year } = request.payload;

    await this._service.editAlbumsById({ id, name, year });
    const response = h.response({
      status: 'success',
      message: 'Data berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  async deleteAlbumsByIdHandler(reuqest, h) {
    const { id } = reuqest.params;

    await this._service.deleteAlbumsById(id);
    const response = h.response({
      status: 'success',
      message: 'Data berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  async postSongsHandler(request, h) {
    const { title, year, genre, performer, duration = null, albumId = null } = request.payload;
    const songId = await this._service.addSongs({ title, year, genre, performer, duration, albumId });
    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler(request, h) {
    const { title = null, performer = null } = request.query;
    const songs = await this._service.getSongs(title, performer);
    const response = h.response({
      status: 'success',
      data: {
        songs,
      },
    });
    response.code(200);
    return response;
  }

  async getSongsByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongsById({ id });
    const response = h.response({
      status: 'success',
      data: {
        song,
      },
    });
    response.code(200);
    return response;
  }

  async putSongsByIdHandler(request, h) {
    const { id } = request.params;
    const { title, year, genre, performer, duration = null, albumId = null }= request.payload;

    await this._service.editSongsById({ id, title, year, genre, performer, duration, albumId });
    const response = h.response({
      status: 'success',
      message: 'Data berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  async deleteSongsByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteSongsById(id);
    const response = h.response({
      status: 'success',
      message: 'Data berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = OpenMusicHandler;