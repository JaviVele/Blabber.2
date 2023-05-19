/**
 * Publicacion.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      contenido: {
        type: 'string',
      },
      fecha_publicacion: {
        type: 'string',
        columnType: 'date',
      },
      num_mg: {
        type:'integer',
      },
      num_comentarios: {
        type:'integer',
      },
      usuario: {
        model: 'Usuario'
      }

  },

};

