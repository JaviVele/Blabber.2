/**
 * NotificacionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    crear: async function (req, res) {
      const { tipo, fecha_notificacion, id_usuario } = req.body;
        try {
          const nuevaNotificacion = await Notificacion.create(
            {
              tipo,
              fecha_notificacion,
              id_usuario
            }
          ).fetch();
          res.status(201).json(nuevaNotificacion);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear la notificacion' });
        }
      },
    
      listar: async function (req, res) {
        //const idUsuario = req.param('idUsuario');
        //console.log(idUsuario);
        try {
          const notificaciones = await Notificacion.find().populate("id_ajeno");
          res.json(notificaciones);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de notificaciones' });
        }
      },
    
    //   listarUno: async function(req, res) {
    //     try {
    //       const notificacion = await Notification.findOne({ id: req.params.id });
    //       if (!comentario) {
    //         return res.notFound('Notificacion no encontrado');
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
          const notificacionEliminado = await Notification.destroyOne({ id: req.params.id })
            .intercept((err) => {
              return res.status(404).json({ error: 'Notificacion no encontrado' });
            });
    
          res.json(notificacionEliminado);
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar la notificacion' });
        }
      }

};

