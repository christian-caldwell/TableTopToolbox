import express from 'express';
const router = express.Router();
import * as controller from './actor-controller';
import * as auth from '../../services/auth-service';

router.post('/actor', auth.requireLogin, controller.create);
router.get('/actor', auth.requireLogin, controller.indexDefault);
router.get('/actor/custom/:userId', auth.requireLogin, controller.indexUser);
router.get('/actor/:characterId', auth.requireLogin, controller.indexCharacter);
router.put('/actor/:actorId', auth.requireLogin, controller.update);
router.put('/actor/add/:gameId', auth.requireLogin, controller.add);
router.delete('/actor/:actorId', auth.requireLogin, controller.remove);
router.delete('/actor/all/:userId', auth.requireLogin, controller.reset);

export default router;