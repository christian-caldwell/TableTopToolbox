import express from 'express';
const router = express.Router();
import * as controller from './item-controller';
import * as auth from '../../services/auth-service';

router.post('/item', auth.requireLogin, controller.create);
router.get('/item', auth.requireLogin, controller.indexDefault);
router.get('/item/custom/:userId', auth.requireLogin, controller.indexUser);
router.get('/item/:characterId', auth.requireLogin, controller.indexCharacter);
router.put('/item/:itemId', auth.requireLogin, controller.update);
router.put('/item/add/:characterId', auth.requireLogin, controller.add);
router.delete('/item/:itemId', auth.requireLogin, controller.remove);
router.delete('/item/all/:userId', auth.requireLogin, controller.reset);

export default router;