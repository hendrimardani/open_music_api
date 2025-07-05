class OpenMusicHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postAlbum(request, h) {
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Data berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

}

module.exports = OpenMusicHandler;