/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
}).as('welcome')

Route.group(() => {
  Route.get('/', 'AuthController.view').as('show')
  Route.post('/', 'AuthController.auth').as('auth')
})
  .prefix('login')
  .as('login')

Route.group(() => {
  Route.get('/new', 'UsersController.create').as('create')
  Route.post('/', 'UsersController.store').as('store')
})
  .prefix('/users')
  .as('users')

Route.group(() => {
  Route.get('/', 'PostsController.show').as('show')
})
  .prefix('/posts')
  .as('posts')
