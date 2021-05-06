import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
    name: String,
    isDefault: Boolean,
    description: String,
    duration: String,
    defaultConditions: [String],
    customConditions: [String],
});
statusSchema.set('timestamps', true);

export default mongoose.model('status', statusSchema);