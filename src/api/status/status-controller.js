import User from '../../model/user-model';
import Status from '../../model/status-model';
import Character from '../../model/character-model';

export function create(req, res) {
    const status = new Status(req.body);
    status.save((error, status) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `create status`,
            status: status
        });
    })
}

export function indexDefault(req, res) {
    Status.find({isDefault: true}, (error, status) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ status: status });
    })
}

export function indexUser(req, res) {
    User.findOne({_id:  req.params.userId}, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        const idList = user.statusIds;
        Status.find({_id: { $in: idList}}, (error, status) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ status: status });
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
        
        const idList = character.status.map(statusWrapper => {
            return statusWrapper.statusId
        });;
        Status.find({_id: { $in: idList}}, (error, status) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ status: status });
        });
    });
}

export function update(req, res) {
    const newStatus = req.body;
    Status.findByIdAndUpdate({_id: req.params.statusId}, newStatus, (error, status) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ status: status });
    });
}

export function remove(req, res) {
    Status.deleteOne({_id: req.params.statusId}, (error) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `delete status of user ${req.params.statusId}`
        });
    });
}

export function add() {
    
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

        Status.deleteMany({}, error => {
            if (error) {
                return res.status(500).json();
            }
        });

        return res.status(200).json({
            message: `database cleared by ${req.params.userId}`
        });
    })
}