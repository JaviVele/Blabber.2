/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //RUTAS DE USUARIO//
  '/': { view: 'pages/homepage' },
  'POST /usuarios': 'UsuarioController.crear',
  'GET /usuarios/:id': 'UsuarioController.listarUno',
  'GET /usuarios': 'UsuarioController.listar',
  'PUT /usuarios/:id': 'UsuarioController.actualizar',
  'DELETE /usuarios/:id': 'UsuarioController.eliminar',
  
  
  //RUTAS DE SEGUIDORES//
  'POST /seguidores': 'SeguidoresController.crear',
  'GET /seguidores/:id': 'SeguidoresController.listarUno',
  'GET /seguidores/': 'SeguidoresController.listar',
  'PUT /seguidores/:id': 'SeguidoresController.actualizar',
  'DELETE /seguidores/:id': 'SeguidoresController.eliminar',
  
  
  
  //RUTAS DE COMENTARIOS//
  'POST /comentarios': 'ComentariosController.crear',
  'GET /comentarios/:id': 'ComentariosController.listarUno',
  'GET /comentarios/': 'ComentariosController.listar',
  'PUT /comentarios/:id': 'ComentariosController.actualizar',
  'DELETE /comentarios/:id': 'ComentariosController.eliminar',




  //RUTAS DE CONFIGURACION//
  'POST /configuracion': 'ConfiguracionController.crear',
  'GET /configuracion/': 'ConfiguracionController.listar',
  'PUT /configuracion/:id': 'ConfiguracionController.actualizar',



    //RUTAS DE REBLABBER//
    'POST /reblabbers': 'ReblabberController.crear',
    'GET /reblabbers': 'ReblabberController.listar',
    'DELETE /reblabbers/:id': 'ReblabberController.eliminar',

    //RUTAS DE NOTIFICACIONES//
    'POST /notificaciones': 'NotificacionesController.crear',
    'GET /notificaciones': 'NotificacionesController.listar',
    'DELETE /notificaciones/:id': 'NotificacionesController.eliminar',

    //RUTAS DE MENSAJES//
    'POST /mensajes': 'MensajesController.crear',
    'GET /mensajes': 'MensajesController.listar',
    'DELETE /mensajes/:id': 'MensajesController.eliminar',

    //RUTA DE ME GUSTAS//
    'POST /megustas': 'MeGustasController.crear',
    'GET /megustas': 'MeGustasController.listar',
    'DELETE /megustas/:id': 'MeGustasController.eliminar',

    //RUTAS DE PUBLICACIONES//
    'POST /publicaciones': 'PublicacionesController.crear',
    'GET /publicaciones': 'PublicacionesController.listar',
    'GET /publicaciones/:id': 'PublicacionesController.listarUno',
    'PUT /publicaciones/:id': 'PublicacionesController.actualizar',
    'DELETE /publicaciones/:id': 'PublicacionesController.eliminar',

};
