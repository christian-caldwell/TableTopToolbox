import express from 'express';
const router = express.Router();
import * as controller from './action-controller';
import * as auth from '../../services/auth-service';

router.post('/action', auth.requireLogin, controller.create);
router.get('/action', auth.requireLogin, controller.indexDefault);
router.get('/action/custom/:userId', auth.requireLogin, controller.indexUser);
router.get('/action/:characterId', auth.requireLogin, controller.indexCharacter);
router.put('/action/:actionId', auth.requireLogin, controller.update);
router.delete('/action/:actionId', auth.requireLogin, controller.remove);
router.delete('/action/all/:userId', auth.requireLogin, controller.reset);

export default router;