'use strict';

module.exports = {
    validateExistance: (req, requiredArray = []) => {
        const response = {};
        const total = requiredArray.length;
        let valid = 0;
        requiredArray.forEach(required => {
            if(typeof req.body[required] != 'undefined'){
                response[required] = req.body[required];
                valid++;
            }
        })
        return {isValid: valid===total, data:response}
    }
}
