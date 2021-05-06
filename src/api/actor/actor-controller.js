import User from '../../model/user-model';
import Actor from '../../model/actor-model';
import Character from '../../model/character-model';

export function create(req, res) {
    const actor = new Actor(req.body);
    actor.save((error, actor) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `created actor`,
            actor: actor
        });
    })
}

export function indexDefault(req, res) {
    Actor.find({isDefault: true}, (error, actors) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ actors: actors });
    })
}

export function indexUser(req, res) {
    User.findOne({_id:  req.params.userId}, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        
        const idList = user.actorIds;
        Actor.find({_id: { $in: idList}}, (error, actors) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ actors: actors });
        });
    });
}

export function indexCharacter(req, res) {
    Character.findOne({_id: req.params.characterId}, (error, character) => {
        if (error)  {
            return res.status(500).json();
        }
        if (!character) {
            return res.status(404).json();
        }

        const idList = character.actors.map(actorWrapper => {
            return actorWrapper.actorId
        });
        Actor.find({_id: { $in: idList}}, (error, actors) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ actors: actors });
        });
    });
}

export function update(req, res) {
    const newActor = req.body;
    Actor.findByIdAndUpdate({_id: req.params.actorId}, newActor,(error, actor) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ actor: actor });
    });
}

export function remove(req, res) {
    Actor.deleteOne({_id: req.params.actorId}, (error) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `delete actor of user ${req.params.actorId}`
        });
    });
}

export function add(req, res) {
    
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

        Actor.deleteMany({}, error => {
            if (error) {
                return res.status(500).json();
            }
        });
        return res.status(200).json({
            message: `database cleared by ${req.params.userId}`
        });
    })
}