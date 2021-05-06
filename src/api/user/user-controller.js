import User from '../../model/user-model';
import * as auth from '../../services/auth-service';

export function get(req, res) {
    const id = auth.getUserId(req);
    User.findOne({_id: id}, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ user: user });
    });
}

export function getName(req, res) {
    User.findOne({username: req.params.username}, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ user: user });
    });
}

export function update(req, res) {
    const newUser = req.body;
    User.findByIdAndUpdate({_id: newUser._id}, newUser, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `update user of user ${req.params.userId}`, 
            user: user
        });
    });
}

export function remove(req, res) {
    const id = auth.getUserId(req);
    User.deleteOne({_id: id}, (error) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `delete user of user ${req.params.userId}`
        });
    });
}

export function reset(req, res) {
    const username = auth.getUsername(req);
    User.findOne({_id: req.params.userId}, (error, user) => {
        if (error)  {
            return res.status(500).json();
        }
        if (username !== 'admin') {
            return res.status(403).json({
                message: 'User Not Allowed To Call This Function'
            });
        }

        User.deleteMany({}, error => {
            if (error) {
                return res.status(500).json();
            }
        });

        return res.status(200).json({
            message: `database cleared by ${req.params.userId}`
        });
    });
}