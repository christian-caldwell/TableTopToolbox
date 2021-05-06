import mongoose from 'mongoose';
import { StringUtil } from '../utilities/string-util';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    email: String,
    gameIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'game'}],
    characterIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'character'}],
    itemIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'item'}],
    statusIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'status'}],
    actorIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'actor'}],
    actionIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'action'}],
});
userSchema.set('timestamps', true);

userSchema.statics.passwordMatches = function(password, hash) {
    return bcrypt.compareSync(password, hash);
}

userSchema.pre('save', function(next) {
    this.username = this.username.toLowerCase();
    const unsafePassword = this.password;
    this.password = bcrypt.hashSync(unsafePassword);
    next();
});

export default mongoose.model('user', userSchema);