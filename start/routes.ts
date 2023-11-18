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
import Post from 'App/Models/Post'

Route.get('/', async ({ view }) => {
  const posts = await Post.query().preload('creatorUser').withCount('comments')

  return view.render('welcome', { posts })
})
  .as('welcome')
  .middleware('silentAuth')

Route.group(() => {
  Route.get('/', 'AuthController.show').as('show')
  Route.get('/logout', 'AuthController.logout').as('logout')
  Route.post('/', 'AuthController.login').as('login')
})
  .prefix('login')
  .as('login')

Route.group(() => {
  Route.get('/new', 'UsersController.create').as('create')
  Route.get('/:id', 'UsersController.index').as('index').middleware('auth')
  Route.post('/', 'UsersController.store').as('store')
})
  .prefix('/users')
  .as('users')

Route.group(() => {
  Route.get('/', 'PostsController.show').as('show')
  Route.get('/favorite', 'PostsController.favorite').as('favorite')
  Route.get('/:id', 'PostsController.index').as('index')
  Route.get('/my_posts/:id', 'PostsController.show').as('myShow')
  Route.post('/', 'PostsController.store').as('store')

  Route.group(() => {
    Route.post('/:id', 'CommentsController.create').as('create')
  })
    .prefix('/comments')
    .as('comments')
})
  .prefix('/posts')
  .as('posts')
  .middleware('auth')
