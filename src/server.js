// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const openMusic = require('./api/open_music');
const OpenMusicService = require('./services/postgres/OpenMusicService');
const ClientError = require('./exceptions/ClientError');
const OpenMusicValidator = require('./validator/open_music');

let server;

const init = async () => {
  if (!server) {
    const openMusicService = new OpenMusicService();

    server = Hapi.server({
      host: process.env.HOST,
      port: process.env.PORT,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    await server.register({
      plugin: openMusic,
      options: {
        service: openMusicService,
        validator: OpenMusicValidator,
      },
    });

    server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
      const { response } = request;
      console.log(response);
      if (response instanceof Error) {
        // penanganan client error secara internal.
        if (response instanceof ClientError) {
          const newResponse = h.response({
            status: 'fail',
            message: response.message,
          });
          newResponse.code(response.statusCode);
          return newResponse;
        }

        // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
        if (!response.isServer) {
          return h.continue;
        }

        // penanganan server error sesuai kebutuhan
        const newResponse = h.response({
          status: 'error',
          message: 'terjadi kegagalan pada server kami',
        });
        newResponse.code(500);
        return newResponse;
      }

      // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
      return h.continue;
    });
    
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  }
  return server;
};

init();
