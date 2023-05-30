/**
 * PublicacionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//const Publicacion = require("../models/Publicacion");
const multer = require('multer');
const fs = require('fs');
// Configurar el middleware Multer para manejar la carga de archivos
const upload = multer({
  dest: 'uploads/' // Especifica la carpeta de destino donde se guardarán los archivos adjuntos
});
module.exports = {
    crear: async function (req, res) {
      //console.log(req.body);
      upload.single('imagen')
        try {
          const { contenido, fecha_publicacion, num_mg, num_comentarios, id_usuario } = req.body;
          const imagen = req.body.contenido.imagen; // Obtener la información de la imagen adjunta
    
          // Aquí puedes procesar la imagen, como guardarla en una ubicación específica o realizar otras operaciones necesarias
          const  mensaje  = contenido.mensaje;
          const nuevaPublicacion = await Publicacion.create({
            contenido: {
              mensaje,
              imagen
            },
            fecha_publicacion,
            num_mg,
            num_comentarios,
            id_usuario
          }).fetch();
          
    
          res.status(200).json({ mensaje: 'Publicacion creada exitosamente', publicacion: nuevaPublicacion });
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

