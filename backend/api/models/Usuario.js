module.exports = {
  attributes: {
    nombre_usuario: {
      type: 'string',
      required: true
    },
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
    fecha_nacimiento: {
      type: 'string',
      columnType: 'date',
      required: true
    },
    foto_perfil: {
      type: 'string'
    },
    biografia: {
      type: 'string'
    }
    // Otros atributos del usuario
  }
};
