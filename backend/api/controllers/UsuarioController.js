

module.exports = {
  // api/controllers/UsuarioController.js
  crear: async function (req, res) {
    try {
      const { nombre_usuario, nombre_arroba, correo, contrasena, fecha_nacimiento } = req.body;

      // Aquí puedes realizar las validaciones necesarias y el procesamiento de los datos recibidos

      // Por ejemplo, puedes crear un nuevo usuario en la base de datos
      const nuevoUsuario = await Usuario.create({
        nombre_usuario,
        nombre_arroba,
        correo,
        contrasena,
        fecha_nacimiento
      }).fetch();

      return res.status(200).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
      return res.status(500).json({ error: 'Ocurrió un error al crear el usuario', mensaje: error.message });
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
  },

  comprobarUsuario: async function (req, res){
    var nombreArroba = req.body.nombre_arroba;
    var contrasena = req.body.contrasena;
    try {
      const comprobarUsuario = await Usuario.findOne({nombre_arroba: nombreArroba, contrasena: contrasena})
      if (!comprobarUsuario) {
        return res.status(404).json({ error: 'Usuario no encontrado en la base de datos' });
        //return res.notFound('Usuario no encontrado en la base de datos');
      }
      //res.json(comprobarUsuario);
      return res.status(200).json({ mensaje: 'Usuario agregado exitosamente', usuario: comprobarUsuario });
    } catch(error) {
      res.status(500).json({error: 'Error al comprobar el usuario'});
    }
  }

};
