module.exports = {
  attributes: {
    // eslint-disable-next-line camelcase
    nombre_usuario: {
      type: 'string',
      required: true
    },
    // eslint-disable-next-line camelcase
    nombre_arroba: {
      type: 'string',
      required: true
    },
    correo: {
      type: 'string',
      required: true,
      unique: 'true'
    },
    contraseña: {
      type: 'string',
      required: true
    },
    // eslint-disable-next-line camelcase
    fecha_nacimiento: {
      type: 'ref',
      columnType: 'date',
      required: true
    },
    // eslint-disable-next-line camelcase
    foto_perfil: {
      type: 'string',
      allowNull: true
    },
    biografia: {
      type: 'string',
      allowNull: true
    },
    // Otros atributos del usuario
  },
  beforeCreate: function (values, next) {
    if (values.fecha_nacimiento) {
      values.fecha_nacimiento = moment(values.fecha_nacimiento).format('YYYY-MM-DD');
    }
    return next();
  },

  beforeUpdate: function (values, next) {
    if (values.fecha_nacimiento) {
      values.fecha_nacimiento = moment(values.fecha_nacimiento).format('YYYY-MM-DD');
    }
    return next();
  }
};
