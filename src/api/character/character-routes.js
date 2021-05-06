import express from 'express';
const router = express.Router();
import * as controller from './character-controller';
import * as auth from '../../services/auth-service';

router.post('/character/', auth.requireLogin, controller.create);
router.get('/character/:userId', auth.requireLogin, controller.index);
router.get('/character/game/:userId', auth.requireLogin, controller.game);
router.put('/character/:characterId', auth.requireLogin, controller.update);
router.delete('/character/:characterId', auth.requireLogin, controller.remove);
router.delete('/character/all/:userId', auth.requireLogin, controller.reset);

export default router;