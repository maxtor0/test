"use strict";

module.exports = {
    validateSave: async (item, Model) =>{
        const errors = [];
        await item.validate()
            .then((itm) => {
                item = itm.save()
                    .then(res => res)
                    .catch(errs => {
                        if(Array.isArray(errs.errors))
                            errs.errors.forEach(error => {
                                errors[error.path.substring(Model.tableName.length+1)] = error.message.substring(Model.tableName.length+1);
                            });
                    })
            })
            .catch(errs => {
                errs.errors.forEach(error => {
                    errors[error.path.substring(Model.tableName.length+1)] = error.message.substring(Model.tableName.length+1);
                });
            })
        item = await item;
        return {item: item, errors: errors};
    }
}
