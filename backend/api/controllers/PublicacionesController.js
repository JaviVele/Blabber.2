/**
 * PublicacionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const cloudinary = require('cloudinary').v2;
const path = require('path');
//const Publicacion = require("../models/Publicacion");
cloudinary.config({
  cloud_name: 'dvvoon3qo',
  api_key: '166311839662986',
  api_secret: 'HPBj4wE3lryIXHbd72YCIytJ250'
})
// Configurar el middleware Multer para manejar la carga de archivos

module.exports = {
 


    crear: function (req, res) {
      //console.log(req.body);
      //console.log(req.file('imagen'));
      req.file('imagen').upload(function (err, uploadedFiles) {
        if (err) {
          return res.send(500, err);
        }
  
        if (!uploadedFiles || uploadedFiles.length === 0) {
          return res.badRequest('No se ha seleccionado ningún archivo.');
        }
  
        cloudinary.uploader.upload(uploadedFiles[0].fd, async function (error, result) {
          if (error) {
            return res.send(500, error);
          }
  
          const { contenido, fecha_publicacion, num_mg, num_comentarios, id_usuario } = req.body;
          let mensaje =req.body.contenido;
          //console.log(mensaje);
          try {
            const nuevaPublicacion = await Publicacion.create({
              contenido: {
                mensaje: mensaje,
                imagen: result.secure_url
              },
              fecha_publicacion,
              num_mg,
              num_comentarios,
              id_usuario
            }).fetch();
  
            return res.status(200).json({ mensaje: 'Publicacion creada exitosamente', publicacion: nuevaPublicacion });
          } catch (error) {
            return res.status(500).json({ error: 'Error al crear la publicación' });
          }
        });
      });
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
      },

      upload: function (req, res) {
        req.file('imagen').upload(function (err, uploadedFiles) {
          if (err) { 
            return res.send(500, err);
          } else {        
            cloudinary.uploader.upload(uploadedFiles[0].fd, function(result) {
              res.json(result);
            });
          }
        });
      },
    
      

};

