import express from 'express';
const router = express.Router();
import * as controller from './game-controller';
import * as auth from '../../services/auth-service';

router.post('/game/', auth.requireLogin, controller.create);
router.get('/game/:userId', auth.requireLogin, controller.index);
router.get('/game/join/:joinCode', auth.requireLogin, controller.join);
router.put('/game/:gameId', auth.requireLogin, controller.update);
router.delete('/game/:gameId', auth.requireLogin, controller.remove);
router.delete('/game/all/:userId', auth.requireLogin, controller.reset);

export default router;