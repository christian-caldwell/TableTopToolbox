import { StringUtil } from '../../utilities/string-util';
import User from "../../model/user-model";

export function index(req, res) {
    const validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        games: [],
        characters: [],
        items: [],
        actors: [],
        characters: []
    });    
    user.save((error, user) => {
        if (error) {
            if (error.code === 11000) {
                return res.status(403).json({ message: 'Usernames is already taken'});
            }
            return res.status(500).json({error: error})
        }
        return res.status(201).json({
            message: 'create new user',
            user: user
        })
    });
}

function validateIndex(body) {
    let errors = '';
    if (StringUtil.isEmpty(body.username)){
        errors += 'Username is required.';
    }
    if (StringUtil.isEmpty(body.password)){
        errors += 'Password is required.';
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}