/**
 * MensajesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    crear: async function (req, res) {
        try {
          const nuevoMensaje = await Mensaje.create(req.body).fetch();
          res.status(201).json(nuevoMensaje);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear el mensaje' });
        }
      },
    
      listar: async function (req, res) {
        try {
          const mensajes = await Mensaje.find();
          res.json(mensajes);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de mensajes' });
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
          const mensajeEliminado = await Mensaje.destroyOne({ id: req.params.id })
            .intercept((err) => {
              return res.status(404).json({ error: 'Mensaje no encontrado' });
            });
    
          res.json(mensajeEliminado);
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar el mensaje' });
        }
      }

};

