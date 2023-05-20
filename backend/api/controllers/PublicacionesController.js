/**
 * PublicacionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//const Publicacion = require("../models/Publicacion");

module.exports = {
    crear: async function (req, res) {
        try {
          const nuevaPublicacion = await Publicacion.create(req.body).fetch();
          res.status(201).json(nuevaPublicacion);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear la publicación' });
        }
      },
    
      listar: async function (req, res) {
        try {
          const publi = await Publicacion.find();
          res.json(publi);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de publicaciones' });
        }
      },
    
      listarUno: async function(req, res) {
        try {
          const publicacion = await Publicacion.findOne({ id: req.params.id });
          if (!publicacion) {
            return res.notFound('Publicacion no encontrado');
          }
          return res.json(publicacion);
        } catch (error) {
          return res.serverError(error);
        }
      },
    
      actualizar: async function (req, res) {
        try {
          const publicacionActualizada = await Publicacion.updateOne({ id: req.params.id })
            .set(req.body)
            .intercept((error) => {
              return res.status(404).json({ error: 'Publicacion no encontrado' });
            });
    
          res.json(publicacionActualizada);
        } catch (error) {
          res.status(500).json({ error: 'Error al actualizar las publicaciones' });
        }
      },
      eliminar: async function (req, res) {
        try {
          const publicacionEliminado = await Publicacion.destroyOne({ id: req.params.id })
            .intercept((err) => {
              return res.status(404).json({ error: 'Publicacion no encontrado' });
            });
    
          res.json(publicacionEliminado);
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar la publicacion' });
        }
      }

};

