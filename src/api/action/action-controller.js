import User from '../../model/user-model';
import Action from '../../model/action-model';
import Character from '../../model/character-model';

export function create(req, res) {
    const action = new Action(req.body);
    action.save((error, action) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `create action`,
            action: action
        });
    })
}

export function indexDefault(req, res) {
    Action.find({isDefault: true}, (error, actions) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ actions: actions });
    })
}

export function indexUser(req, res) {
    User.findOne({_id:  req.params.userId}, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        
        const idList = user.actionIds;
        Action.find({_id: { $in: idList}}, (error, actions) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ actions: actions });
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
        
        const idList = character.actions.map(actionWrapper => {
            return actionWrapper.actionId
        });;
        Action.find({_id: { $in: idList}}, (error, actions) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ actions: actions });
        });
    });
}

export function update(req, res) {
    const newAction = req.body;
    Action.findByIdAndUpdate({_id: req.params.actionId}, newAction ,(error, action) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({action: action});
    });
}

export function remove(req, res) {
    Action.deleteOne({_id: req.params.actionId}, (error) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `delete action of user ${req.params.actionId}`
        });
    });
}

export function reset(req, res) {
    User.findOne({_id: req.params.userId}, (error, user) => {
        if (error)  {
            return res.status(500).json();
        }
        if (!user) {
            return res.status(403).json({
                message: 'User Not Allowed To Call This Function'
            });
        }
        Action.deleteMany({}, error => {
            if (error || user.username !== 'admin') {
                return res.status(500).json();
            }
        });
        return res.status(200).json({
            message: `database cleared by ${req.params.userId}`
        });
    });
}