/**
 * Mensaje.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    contenido: {
      type: 'string',
    },
    fecha_envio: {
      type: 'ref',
      columnType: 'date',
    },
    id_usuario_envia: {
      model: 'Usuario'
    },
    id_usuario_recibe: {
      model: 'Usuario'
    }

  },
  beforeCreate: function (values, next) {
    if (values.fecha_envio) {
      values.fecha_envio = moment(values.fecha_envio).format('YYYY-MM-DD');
    }
    return next();
  },

  beforeUpdate: function (values, next) {
    if (values.fecha_envio) {
      values.fecha_envio = moment(values.fecha_envio).format('YYYY-MM-DD');
    }
    return next();
  }

};

