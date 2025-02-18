import express from 'express';
const router = express.Router();

import AuthController from '../controllers/AuthController';
import JwtMiddleware from '../auth/JwtMiddleware';
import ONGsController from '../controllers/ONGsController';

// Rotas de autenticação
router.post('/signUp', AuthController.signUp);
router.post('/login', AuthController.signIn);
// router.get('/infoUser', AuthController.dataToken);
router.get('/ongs', ONGsController.GetAll);
router.get('/ongs/:id', ONGsController.GetById);
router.post('/ongs/donation', ONGsController.PostDonation);

router.get('/infoUser/:userID', AuthController.infoUser);
router.get('/ongDonations/:userID', ONGsController.GetDonationOng);

// Rota de teste
router.get('/', (req, res) => {
  res.json({ msg: 'ta rodando pai' });
  console.log('hi');
});

export default router;
