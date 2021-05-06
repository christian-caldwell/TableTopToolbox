import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    username: String,
    items: [{
        active: Boolean,
        usesLeft: String,
        recoveryDate: String,
        itemId: {type: mongoose.Schema.Types.ObjectId, ref: 'item'}
    }],
    actions: [{
        actionId: {type: mongoose.Schema.Types.ObjectId, ref: 'action'}
    }],
    status: [{
        endDate: String,
        statusId: {type: mongoose.Schema.Types.ObjectId, ref: 'status'}
    }],
    actors: [{
        userId: String,
        name: String,
        initActual: String,
        isHidden: Boolean,
        actorId: {type: mongoose.Schema.Types.ObjectId, ref: 'actor'}
    }],
    characterClass: String,
    gold: String,
    age: String,
    name: String,
    description: String
});
characterSchema.set('timestamps', true);

export default mongoose.model('character', characterSchema);