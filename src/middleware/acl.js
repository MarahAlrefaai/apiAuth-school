'use strict';

function acl(action) {
    return (req, res, next) => {
        try {
            if (req.User.actions.includes(action)) {
                next();
            } else {
                next('access denied')
            }
        } catch (e) {
        res.status(403).send('ACL middleware error');
        }
    }
}

module.exports = acl;