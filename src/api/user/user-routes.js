import express from 'express';
const router = express.Router();
import * as controller from './user-controller';
import * as auth from '../../services/auth-service';

router.get('/user/', auth.requireLogin, controller.get);
router.get('/user/check/:username', controller.getName);
router.put('/user/', auth.requireLogin, controller.update);
router.delete('/user/', auth.requireLogin, controller.remove);
router.delete('/user/all/:userId', auth.requireLogin, controller.reset);

export default router;