/**
 * ReblabberController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    crear: async function (req, res) {
        try {
          const nuevoReblabber = await Reblabber.create(req.body).fetch();
          res.status(201).json(nuevoReblabber);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear el reblabber' });
        }
      },
    
      listar: async function (req, res) {
        try {
          const reblabbers = await Reblabber.find();
          res.json(reblabbers);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de reblabbers' });
        }
      },
    
      listarUno: async function(req, res) {
        try {
          const reblabber = await Reblabber.findOne({ id: req.params.id });
          if (!reblabber) {
            return res.notFound('Reblabber no encontrado');
          }
          return res.json(reblabber);
        } catch (error) {
          return res.serverError(error);
        }
      },
    
    //   actualizar: async function (req, res) {
    //     try {
    //       const seguidorActualizado = await Reblabber.updateOne({ id: req.params.id })
    //         .set(req.body)
    //         .intercept((error) => {
    //           return res.status(404).json({ error: 'Reblabber no encontrado' });
    //         });
    
    //       res.json(seguidorActualizado);
    //     } catch (error) {
    //       res.status(500).json({ error: 'Error al actualizar el reblabber' });
    //     }
    //   },
    //   eliminar: async function (req, res) {
    //     try {
    //       const seguidorEliminado = await Reblabber.destroyOne({ id: req.params.id })
    //         .intercept((err) => {
    //           return res.status(404).json({ error: 'Reblabber no encontrado' });
    //         });
    
    //       res.json(seguidorEliminado);
    //     } catch (error) {
    //       res.status(500).json({ error: 'Error al eliminar el reblabber' });
    //     }
    //   }

};

