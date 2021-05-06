import express from 'express';
const router = express.Router();
import * as controller from './status-controller';
import * as auth from '../../services/auth-service';

router.post('/status', auth.requireLogin, controller.create);
router.get('/status', auth.requireLogin, controller.indexDefault);
router.get('/status/custom/:userId', auth.requireLogin, controller.indexUser);
router.get('/status/:characterId', auth.requireLogin, controller.indexCharacter);
router.put('/status/:statusId', auth.requireLogin, controller.update);
router.put('/status/add/:characterId', auth.requireLogin, controller.add);
router.delete('/status/:statusId', auth.requireLogin, controller.remove);
router.delete('/status/all/:userId', auth.requireLogin, controller.reset);

export default router;