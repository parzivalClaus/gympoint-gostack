import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpOrder from './app/controllers/StudentHelpOrder';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Listar todos os usuários
routes.get('/users', UserController.index);

// Listar todos os estudantes
routes.get('/students', StudentController.index);

// Listar apenas um aluno
routes.get(`/students/:id`, StudentController.index);

// Criar sessão
routes.post('/sessions', SessionController.store);

// Realizar Checkin
routes.post('/students/:id/checkins', CheckinController.store);

// Listar Checkins do usuário
routes.get('/students/:id/checkins', CheckinController.index);

// Cadastrar Pedido de Auxílio
routes.post('/students/:id/help-orders', StudentHelpOrder.store);

// Listar Pedidos de Auxílio por ID
routes.get('/students/:id/help-orders', StudentHelpOrder.index);

// Middleware de Autenticação
routes.use(authMiddleware);

// Listar pedidos sem auxílio
routes.get('/help-orders', HelpOrderController.index);

// Responder pedidos sem auxílio
routes.post('/help-orders/:id/answer', HelpOrderController.store);

// Criar usuário
routes.post('/users', UserController.store);

// Criar estudante
routes.post('/students', StudentController.store);

// Editar dados do usuário
routes.put('/users', UserController.update);

// Editar dados do estudante
routes.put('/students/:id', StudentController.update);

// Deletar estudante
routes.delete('/students/:id', StudentController.delete);

// Listar planos
routes.get('/plans', PlanController.index);
// Cadastrar plano
routes.post('/plans', PlanController.store);
// Editar plano
routes.put('/plans/:id', PlanController.update);
// Deletar plano
routes.delete('/plans/:id', PlanController.delete);

// Listar Matrículas
routes.get('/registrations', RegistrationController.index);

// Criar matrícula
routes.post('/registrations', RegistrationController.store);

// Alterar matrícula
routes.put('/registrations/:id', RegistrationController.update);

// Cancelar matrícula
routes.delete('/registrations/:id', RegistrationController.delete);

export default routes;
