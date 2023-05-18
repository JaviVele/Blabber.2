/**
 * ComentariosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    crear: async function (req, res) {
        try {
          const nuevoComentario = await Comentario.create(req.body).fetch();
          res.status(201).json(nuevoComentario);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear el comentario' });
        }
      },
    
      listar: async function (req, res) {
        try {
          const comentarios = await Comentario.find();
          res.json(comentarios);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de comentarios' });
        }
      },
    
      listarUno: async function(req, res) {
        try {
          const comentario = await Comentario.findOne({ id: req.params.id });
          if (!comentario) {
            return res.notFound('Comentario no encontrado');
          }
          return res.json(comentario);
        } catch (error) {
          return res.serverError(error);
        }
      },
    
      actualizar: async function (req, res) {
        try {
          const seguidorActualizado = await Comentario.updateOne({ id: req.params.id })
            .set(req.body)
            .intercept((error) => {
              return res.status(404).json({ error: 'Comentario no encontrado' });
            });
    
          res.json(seguidorActualizado);
        } catch (error) {
          res.status(500).json({ error: 'Error al actualizar el comentario' });
        }
      },
      eliminar: async function (req, res) {
        try {
          const comentarioEliminado = await Comentario.destroyOne({ id: req.params.id })
            .intercept((err) => {
              return res.status(404).json({ error: 'Comentario no encontrado' });
            });
    
          res.json(comentarioEliminado);
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar el comentario' });
        }
      }

};

