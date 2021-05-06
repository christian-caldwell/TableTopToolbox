import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
    name: String,
    isDefault: Boolean,
    description: String,
    class: String,
    actionType: String,
    rollType: String,
    needsSight: Boolean,
    needsSound: Boolean,
    needsMovement: Boolean
});
actionSchema.set('timestamps', true);

export default mongoose.model('action', actionSchema);