import User from '../../model/user-model';
import Character from '../../model/character-model';
import * as auth from '../../services/auth-service';

export function create(req, res) {
    const character = new Character(req.body);
    character.save((error, character) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `create character`,
            character: character
        });
    })
}

export function index(req, res) {
    User.findOne({_id:  req.params.userId}, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        
        const idList = user.characterIds;
        Character.find({_id: { $in: idList}}, (error, characters) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ characters: characters });
        });
    });
}

export function game(req, res) {
    Game.findOne({_id:  req.params.userId}, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        
        const idList = user.characterIds;
        Character.find({_id: { $in: idList}}, (error, characters) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ characters: characters });
        });
    });
}

export function update(req, res) {
    const newCharacter = req.body;
    Character.findByIdAndUpdate({_id: req.params.characterId}, newCharacter, (error, character) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ character: character });
    });
}

export function remove(req, res) {
    Character.deleteOne({_id: req.params.characterId}, (error) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `delete character of user ${req.params.characterId}`
        });
    });
}

export function reset(req, res) {
    User.findOne({_id: req.params.userId}, (error, user) => {
        if (error)  {
            return res.status(500).json();
        }
        if (!user || user.username !== 'admin') {
            return res.status(403).json({
                message: 'User Not Allowed To Call This Function'
            });
        }

        Character.deleteMany({}, error => {
            if (error) {
                return res.status(500).json();
            }
        });

        return res.status(200).json({
            message: `character database cleared by ${req.params.userId}`
        });
    });
}