import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    hostId: String,
    characterIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'character'}],
    status: String,
    gameTitle: String,
    initTitle: String,
    actors: [{
        userId: String,
        name: String,
        initActual: String,
        isHidden: Boolean,
        actorId: {type: mongoose.Schema.Types.ObjectId, ref: 'actor'},
    }],
    initIndex: Number,
    currentTime: String,
    roundCounter: String,
    currentInit: String,
    joinCode: String
});
gameSchema.set('timestamps', true);

export default mongoose.model('game', gameSchema);