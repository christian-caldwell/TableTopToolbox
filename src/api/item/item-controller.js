import User from '../../model/user-model';
import Item from '../../model/item-model';
import Character from '../../model/character-model';

export function create(req, res) {
    const item = new Item(req.body);
    item.save((error, item) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            item: item
        });
    })
}

export function indexDefault(req, res) {
    Item.find({isDefault: true}, (error, items) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({items: items });
    })
}

export function indexUser(req, res) {
    User.findOne({_id:  req.params.userId}, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        
        const idList = user.itemIds;
        Item.find({_id: { $in: idList}}, (error, items) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ items: items });
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
        
        const idList = character.items.map(itemWrapper => {
            return itemWrapper.itemId
        });
        Item.find({_id: { $in: idList}}, (error, items) => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ items: items });
        });
    });
}

export function update(req, res) {
    const newItem = req.body;
    Item.findByIdAndUpdate({_id: req.params.itemId}, newItem, (error, item) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ item: item });
    });
}

export function remove(req, res) {
    Item.deleteOne({_id: req.params.itemId}, (error) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({
            message: `delete item of user ${req.params.itemId}`
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
        if (!user) {
            return res.status(403).json({
                message: 'User Not Allowed To Call This Function'
            });
        }

        Item.deleteMany({}, error => {
            if (error || user.username !== 'admin') {
                return res.status(500).json();
            }
        });

        return res.status(200).json({
            message: `database cleared by ${req.params.userId}`
        })
    });
}