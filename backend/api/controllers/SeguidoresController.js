/**
 * SeguidoresController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    crear: async function (req, res) {
        try {
          const nuevoSeguidor = await Seguidores.create(req.body).fetch();
          res.status(201).json(nuevoSeguidor);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear el seguidor' });
        }
      },
    
      listar: async function (req, res) {
        try {
          const seguidores = await Seguidores.find();
          res.json(seguidores);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de seguidores' });
        }
      },
    
      listarUno: async function(req, res) {
        try {
          const seguidor = await Seguidores.findOne({ id: req.params.id });
          if (!seguidor) {
            return res.notFound('Seguidor no encontrado');
          }
          return res.json(seguidor);
        } catch (error) {
          return res.serverError(error);
        }
      },
    
      actualizar: async function (req, res) {
        try {
          const seguidorActualizado = await Seguidores.updateOne({ id: req.params.id })
            .set(req.body)
            .intercept((error) => {
              return res.status(404).json({ error: 'Seguidor no encontrado' });
            });
    
          res.json(seguidorActualizado);
        } catch (error) {
          res.status(500).json({ error: 'Error al actualizar el seguidor' });
        }
      },
      eliminar: async function (req, res) {
        try {
          const seguidorEliminado = await Seguidores.destroyOne({ id: req.params.id })
            .intercept((err) => {
              return res.status(404).json({ error: 'Seguidor no encontrado' });
            });
    
          res.json(seguidorEliminado);
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar el seguidor' });
        }
      }

};

