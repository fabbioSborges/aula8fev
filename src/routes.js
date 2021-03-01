import { Router } from 'express'; // importr apenas o Routers do express
import multer from 'multer';
import multerConfig from './config/multer'

// import User from './app/models/User';

import UserController from './app/controllers/USerController';
import SessionController from './app/controllers/SessionController';

import MiddlewareAuth from './app/Middleware/auth';
import FileController from './app/controllers/FileController';
import PrestadorServicoController from './app/controllers/PrestadorServicoController';

const upload = multer(multerConfig);

const routes = new Router();

routes.get('/', (req, res) => res.json({ mensagem: 'Olá turma ' }));

routes.post('/login', SessionController.store);

routes.post('/user', UserController.store);

routes.put('/user', MiddlewareAuth, UserController.update);

routes.post('/files', MiddlewareAuth, upload.single('file'), FileController.store);

routes.get("/prestadoservico",  MiddlewareAuth, PrestadorServicoController.index);

export default routes;
