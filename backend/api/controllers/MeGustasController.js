/**
 * MeGustasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//const MeGusta = require("../models/MeGusta");

module.exports = {
  crear: async function (req, res) {
    try {
      //console.log(req.body);
      const { id_usuario, id_publicacion } = req.body;
  
      // Buscar el registro de "Me gusta" existente para la publicación y el usuario
      const existeMeGusta = await MeGusta.find({ id_usuario: id_usuario, id_publicacion: id_publicacion }).limit(1);
  
      if (existeMeGusta.length > 0) {
        // Si existe, eliminar el registro de "Me gusta"
        await MeGusta.destroy({ id: existeMeGusta[0].id });
  
        // Obtener el número actual de "Me gusta" para la publicación
        const numMgActualizado = await MeGusta.count({ id_publicacion: id_publicacion });
  
        // Actualizar el contador de "Me gusta" en la publicación
        await Publicacion.update({ id: id_publicacion }).set({ num_mg: numMgActualizado });
  
        res.status(200).json({ num_mg: numMgActualizado });
      } else {
        // Si no existe, crear un nuevo registro de "Me gusta"
        // console.log('usuarioId:', id_usuario);
        // console.log('publicacionId:', id_publicacion);

        const nuevoMegusta = await MeGusta.create({
          id_usuario,
          id_publicacion
          
        }).fetch();
        // Obtener el número actual de "Me gusta" para la publicación
        const numMgActualizado = await MeGusta.count({ id_publicacion: id_publicacion });
  
        // Actualizar el contador de "Me gusta" en la publicación
        await Publicacion.update({ id: id_publicacion }).set({ num_mg: numMgActualizado });

        const tipoNotificacion = 'me gusta';
        const fecha_notificacion = new Date().toISOString();
        const idNotificacion = await Notificacion.create({
          tipo_noti: tipoNotificacion,
          fecha_notificacion: fecha_notificacion,
          id_usuario
        }).fetch();
  
        res.status(200).json({ num_mg: numMgActualizado, nuevo_megusta: nuevoMegusta });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al dar/quitar Me gusta' });
    }
  },
  
    
      listar: async function (req, res) {
        try {
          const meGustas = await MeGusta.find();
          res.json(meGustas);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de me gustas' });
        }
      },
    
    //   listarUno: async function(req, res) {
    //     try {
    //       const comentario = await Comentario.findOne({ id: req.params.id });
    //       if (!comentario) {
    //         return res.notFound('Comentario no encontrado');
    //       }
    //       return res.json(comentario);
    //     } catch (error) {
    //       return res.serverError(error);
    //     }
    //   },
    
    //   actualizar: async function (req, res) {
    //     try {
    //       const seguidorActualizado = await Comentario.updateOne({ id: req.params.id })
    //         .set(req.body)
    //         .intercept((error) => {
    //           return res.status(404).json({ error: 'Comentario no encontrado' });
    //         });
    
    //       res.json(seguidorActualizado);
    //     } catch (error) {
    //       res.status(500).json({ error: 'Error al actualizar el comentario' });
    //     }
    //   },
      eliminar: async function (req, res) {
        try {
          const meGustaEliminado = await MeGusta.destroyOne({ id: req.params.id })
            .intercept((err) => {
              return res.status(404).json({ error: 'Me gusta no encontrado' });
            });
    
          res.json(meGustaEliminado);
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar el me gusta' });
        }
      }
};

