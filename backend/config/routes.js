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
  'POST /usuarios/listar:id': 'UsuarioController.listarUno',
  'GET /usuarios/listar': 'UsuarioController.listar',
  'PUT /usuarios/actualizar': 'UsuarioController.actualizar',
  'DELETE /usuarios/:id': 'UsuarioController.eliminar',
  
  
  //RUTAS DE SEGUIDORES//
  'POST /seguidores': 'SeguidoresController.crear',
  'POST /seguidores/listar:id': 'SeguidoresController.listarUno',
  'GET /seguidores/listar': 'SeguidoresController.listar',
  'PUT /seguidores/actualizar': 'SeguidoresController.actualizar',
  'DELETE /seguidores/:id': 'SeguidoresController.eliminar',
  
  
  
  //RUTAS DE COMENTARIOS//
  'POST /comentarios': 'ComentariosController.crear',
  'POST /comentarios/listar:id': 'ComentariosController.listarUno',
  'GET /comentarios/listar': 'ComentariosController.listar',
  'PUT /comentarios/actualizar': 'ComentariosController.actualizar',
  'DELETE /comentarios/:id': 'ComentariosController.eliminar',




  //RUTAS DE CONFIGURACION//
  'POST /configuracion': 'ConfiguracionController.crear',
  'POST /configuracion/listar:id': 'ConfiguracionController.listarUno',
  //'GET /configuracion/listar': 'ConfiguracionController.listar',
  'PUT /configuracion/actualizar': 'ConfiguracionController.actualizar',
  'DELETE /configuracion/:id': 'ConfiguracionController.eliminar',



    //RUTAS DE REBLABBER//
    'POST /reblabbers': 'ReblabberController.crear',
    'POST /reblabbers/listar:id': 'ReblabberController.listarUno',
    'GET /reblabbers/listar': 'ReblabberController.listar',
    //'PUT /reblabbers/actualizar': 'ReblabberController.actualizar',
    //'DELETE /reblabbers/:id': 'ReblabberController.eliminar',



};
