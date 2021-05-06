import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema({
    title: String,
    isDefault: Boolean,
    description: String,
    initMod: String,
    initRaw: String,
    actorType: String,
});
actorSchema.set('timestamps', true);

export default mongoose.model('actor', actorSchema);