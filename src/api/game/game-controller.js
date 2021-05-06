import User from '../../model/user-model';
import Game from '../../model/game-model';
import moment from 'moment';
import * as auth from '../../services/auth-service';

export function create(req, res) {
    const game = new Game(req.body);
    game.save((error, game) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `create game`,
            game: game
        });
    })
}

export function index(req, res) {
    User.findOne({_id:  req.params.userId}, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        
        const idList = user.gameIds;
        Game.find({_id: { $in: idList}}, (error, games) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ games: games });
        });
    });
}

export function join(req, res) {
    Game.findOne({joinCode:  req.params.joinCode}, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ game: game });
    });
}


export function update(req, res) {
    const newGame = req.body;
    Game.findByIdAndUpdate({_id: req.params.gameId}, newGame, (error, game) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ game: game});
    });
}

export function remove(req, res) {
    Game.deleteOne({_id: req.params.gameId}, (error) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `delete game of user ${req.params.gameId}`
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

        Game.deleteMany({}, error => {
            if (error) {
                return res.status(500).json();
            }
        });

        return res.status(200).json({
            message: `game database cleared by ${req.params.userId}`
        });
    });
}