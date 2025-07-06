const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { rows } = require('pg/lib/defaults');


class OpenMusicService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbums({ name, year }) {
    const id = `album-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Data gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getAlbumsById({ id }) {
    const query = {
      text: `SELECT
              albums.id AS albums_id,
              albums.name AS albums_name,
              albums.year AS albums_year,
              songs.id AS songs_id,
              songs.title AS songs_title,
              songs.performer AS songs_performer
            FROM albums
            LEFT JOIN songs ON albums.id = songs."albumId"
            WHERE albums.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Data tidak ditemukan');
    }

    const isSongsAtributeNull = result.rows[0].songs_id;

    const resultMap = {
        id: result.rows[0].albums_id,
        name: result.rows[0].albums_name,
        year: result.rows[0].albums_year,
        songs: isSongsAtributeNull === null ? [] : result.rows.map(row => ({
          id: row.songs_id,
          title: row.songs_title,
          performer: row.songs_performer,
        })),
      };
      return resultMap;
  }

  async editAlbumsById({ id, name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui data. Id tidak ditemukan');
    }
  }

  async deleteAlbumsById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Data gagal dihapus. Id tidak ditemukan');
    }
  }

  async addSongs({ title, year, genre, performer, duration, albumId }) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId],
    };
    const result = await this._pool.query(query);
    
    if (!result.rows[0].id) {
      throw new InvariantError('Data gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getSongs(title, performer) {
    let query;
    if (title === null && performer === null) {
      query = 'SELECT id, title, performer FROM songs'
    } else if (title !== null && performer !== null) {
      query = {
        text: `SELECT id, title, performer FROM songs WHERE title ILIKE '%' || $1 || '%'
              AND performer ILIKE '%' || $2 || '%'`,
        values: [title, performer]
      }
    } else {
      query = {
        text: `SELECT id, title, performer FROM songs WHERE title ILIKE '%' || $1 || '%'
              OR performer ILIKE '%' || $2 || '%'`,
        values: [title, performer]
      }
    }
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getSongsById({ id }) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result.rows[0];
  }

  async editSongsById({ id, title, year, genre, performer, duration, albumId }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, "albumId" = $6 WHERE id = $7 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui data. Id tidak ditemukan');
    }
  }

  async deleteSongsById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Data gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = OpenMusicService;