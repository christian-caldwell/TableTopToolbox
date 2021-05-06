import actorRoutes from './api/actor/actor-routes';
import itemRoutes from './api/item/item-routes';
import statusRoutes from './api/status/status-routes';
import characterRoutes from './api/character/character-routes';
import gameRoutes from './api/game/game-routes';
import regRoutes from './api/register/register-routes';
import actionRoutes from './api/action/action-routes';
import userRoutes from './api/user/user-routes';
import authRoutes from './api/auth/auth-routes';

export function registerRoutes(app) {
    app.use('/api', actorRoutes);
    app.use('/api', itemRoutes);
    app.use('/api', statusRoutes);
    app.use('/api', characterRoutes);
    app.use('/api', gameRoutes);
    app.use('/api', regRoutes);
    app.use('/api', authRoutes);
    app.use('/api', actionRoutes);
    app.use('/api', userRoutes);
}