

module.exports = {
  crear: async function (req, res) {
    console.log(req.body);
    try {
      const { nombre_usuario, nombre_arroba, correo, contrasena, fecha_nacimiento } = req.body;
  
      const nuevoUsuario = await Usuario.create({
        nombre_usuario: nombre_usuario,
        nombre_arroba: nombre_arroba,
        correo: correo,
        contrasena: contrasena,
        fecha_nacimiento: fecha_nacimiento
      }).fetch();
  
      res.ok(nuevoUsuario);
    } catch (error) {
      res.serverError(error).json({ error: 'Error al crear el usuario' });
    }
  },
  

  listar: async function (req, res) {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
  },

  listarUno: async function(req, res) {
    try {
      const usuario = await Usuario.findOne({ id: req.params.id });
      if (!usuario) {
        return res.notFound('Usuario no encontrado');
      }
      return res.json(usuario);
    } catch (error) {
      return res.serverError(error);
    }
  },

  actualizar: async function (req, res) {
    try {
      const usuarioActualizado = await Usuario.updateOne({ id: req.params.id })
        .set(req.body)
        .intercept((err) => {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        });

      res.json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  },
  eliminar: async function (req, res) {
    try {
      
      const usuarioEliminado = await Usuario.destroyOne({ id: req.params.id })
      
        .intercept((err) => {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        });
      
      res.json(usuarioEliminado);
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  }

};
