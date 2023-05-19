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
    Fecha_notificacion: {
      type: 'string',
      columnType: 'date',
    },
    id_usuario: {
      model: 'usuario'
    }

  },

};

