import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: String,
    isDefault: Boolean,
    description: String,
    goldValue: String,
    weight: String,
    actionType: String,
    isConsumed: Boolean,
    uses: String
});
itemSchema.set('timestamps', true);

export default mongoose.model('item', itemSchema);