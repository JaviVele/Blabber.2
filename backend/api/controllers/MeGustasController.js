/**
 * MeGustasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Me_gusta = require("../models/Me_gusta");

module.exports = {
    crear: async function (req, res) {
        try {
          const nuevoMeGusta = await Me_gusta.create(req.body).fetch();
          res.status(201).json(nuevoMeGusta);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear el me gusta' });
        }
      },
    
      listar: async function (req, res) {
        try {
          const meGustas = await Me_gusta.find();
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
          const meGustaEliminado = await Me_gusta.destroyOne({ id: req.params.id })
            .intercept((err) => {
              return res.status(404).json({ error: 'Me gusta no encontrado' });
            });
    
          res.json(meGustaEliminado);
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar el me gusta' });
        }
      }
};

