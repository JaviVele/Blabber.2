module.exports = {
  crear: function (req, res) {
    var usuarioData = {
      nombre_usuario: req.param('nombre_usuario'),
      nombre_arroba: req.param('nombre_arroba'),
      correo: req.param('correo'),
      fecha_nacimiento: req.param('fecha_nacimiento')
      // Otros atributos del usuario
    };
    Usuario.create(usuarioData).exec(function (error, usuarioCreado) {
      if (error) {
        return res.serverError(error);
      }
      return res.ok(usuarioCreado);
    });
  },
  find: function (req, res) {
    Usuario.find().exec(function (error, usuariosEncontrados) {
      if (error) {
        return res.serverError(error);
      }
      //console.log(res.ok(usuariosEncontrados));
      return res.ok(usuariosEncontrados);
    });
  }
};
