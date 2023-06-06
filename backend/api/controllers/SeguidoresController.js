<<<<<<< HEAD
=======
const Seguidores = require('../models/Seguidores');

>>>>>>> parent of 5731d28 (inicio publicaciones hecho)
module.exports = {
  seguirUsuario: async function (req, res) {
    try {
      const { idUsuarioSeguir } = req.body;
      const seguidor = req.user.id;

      // Verificar si el usuario ya sigue al usuario objetivo
      const existeSeguidor = await Seguidores.findOne({ seguidor, seguido: idUsuarioSeguir });
      if (existeSeguidor) {
        return res.status(400).json({ error: 'Ya sigues a este usuario' });
      }

      // Crear el nuevo seguidor
      const nuevoSeguidor = await Seguidores.create({ seguidor, seguido: idUsuarioSeguir });
      res.status(201).json(nuevoSeguidor);
    } catch (error) {
      res.status(500).json({ error: 'Error al seguir al usuario' });
    }
  },

  obtenerSeguidores: async function (req, res) {
    try {
<<<<<<< HEAD
      const usuarioId = req.query.userId; // Obtén el ID del usuario del parámetro de la consulta
      //console.log(usuarioId);
      // Busca los seguidores del usuario especificado
      const seguidores = await Seguidores.find({ seguido_id: usuarioId })
        .populate('seguidor_id'); // Realiza el populate para obtener los datos de los seguidores
  
=======
      const seguidores = await Seguidores.find({ seguidor_id: req.Usuario.id }).populate('seguido_id');
>>>>>>> d2a4add1ba593d72d442fb609cdcd3752d1d7507
      res.status(200).json(seguidores);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los seguidores' });
    }
  },

  obtenerSeguidos: async function (req, res) {
    try {
<<<<<<< HEAD
      const usuarioId = req.query.userId; // Obtén el ID del usuario del parámetro de la consulta
      //console.log(usuarioId);
      // Busca los usuarios seguidos por el usuario especificado
      const seguidos = await Seguidores.find({ seguidor_id: usuarioId })
        .populate('seguido_id'); // Realiza el populate para obtener los datos de los usuarios seguidos
  
      res.status(200).json(seguidos);
=======
      const seguidores = await Seguidores.find({ seguidor_id: req.query.userId }).populate('seguido_id');
      const usuariosSeguidos = seguidores.map(seguidor => seguidor.seguido_id);
      res.status(200).json(usuariosSeguidos);
>>>>>>> d2a4add1ba593d72d442fb609cdcd3752d1d7507
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios seguidos' });
    }
  },

  dejarSeguirUsuario: async function (req, res) {
    try {
      const { idUsuarioDejarSeguir } = req.params;
      const seguidor = req.user.id;

      // Verificar si el usuario ya sigue al usuario objetivo
      const seguidorExistente = await Seguidores.findOne({ seguidor, seguido: idUsuarioDejarSeguir });
      if (!seguidorExistente) {
        return res.status(400).json({ error: 'No sigues a este usuario' });
      }

      // Eliminar el seguidor
      await Seguidores.destroy({ seguidor, seguido: idUsuarioDejarSeguir });
      res.status(200).json({ mensaje: 'Has dejado de seguir al usuario' });
    } catch (error) {
      res.status(500).json({ error: 'Error al dejar de seguir al usuario' });
    }
  },
};
