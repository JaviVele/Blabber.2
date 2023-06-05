/**
 * Seguidores.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fecha: {
      type: 'ref',
      columnType: 'date',
      required: true
    },
    seguidor_id: {
      model: 'Usuario',
      columnName: 'seguidor_id',
      required: true
    },
    seguido_id: {
      model: 'Usuario',
      columnName: 'seguido_id',
      required: true
    }

  },
  // find: function(criteria) {
  //   return new Promise((resolve, reject) => {
  //     Seguidores.find(criteria).exec((error, seguidores) => {
  //       if (error) {
  //         reject(new Error('Error al obtener los seguidores'));
  //       } else {
  //         resolve(seguidores);
  //       }
  //     });
  //   });
  // }
};

