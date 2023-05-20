/**
 * Notificacion.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    tipo: {
      type: 'string',
      isIn: ['Me gusta', 'Rebblaber','Seguidor'],
    },  
    fecha_notificacion: {
      type: 'ref',
      columnType: 'date',
    },
    id_usuario: {
      model: 'Usuario'
    }

  },
  beforeCreate: function (values, next) {
    if (values.fecha_notificacion) {
      values.fecha_notificacion = moment(values.fecha_notificacion).format('YYYY-MM-DD');
    }
    return next();
  },

  beforeUpdate: function (values, next) {
    if (values.fecha_notificacion) {
      values.fecha_notificacion = moment(values.fecha_notificacion).format('YYYY-MM-DD');
    }
    return next();
  }

};

