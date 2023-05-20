module.exports = {
  crear: async function (req, res) {
    try {
      const nuevoUsuario = await Usuario.create(req.body).fetch();
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario' });
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
      await Publicacion.destroy({ id_usuario: req.params.id })
      res.json(usuarioEliminado);
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  }

};
