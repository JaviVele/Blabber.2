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
        type: 'ref',
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

  beforeCreate: function (values, next) {
    if (values.fecha_publicacion) {
      values.fecha_publicacion = moment(values.fecha_publicacion).format('YYYY-MM-DD');
    }
    return next();
  },

  beforeUpdate: function (values, next) {
    if (values.fecha_publicacion) {
      values.fecha_publicacion = moment(values.fecha_publicacion).format('YYYY-MM-DD');
    }
    return next();
  }

};

