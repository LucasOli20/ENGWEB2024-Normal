var mongoose = require("mongoose")

var contrato = require("../models/contratos")

module.exports.list = () => {
    return contrato
        .find()
        .sort({_id : 1})
        .exec()
}

module.exports.findById = id => {
    return contrato
        .findOne({_id : id})
        .exec()
}

module.exports.findByEntidade = (entidade) => {
    return contrato
        .find({NIPC_entidade_comunicante: entidade})
        .sort({_id:1})
        .exec()
}

module.exports.findByTipoProcedimento = (tipo) => {
    return contrato
        .find({tipoprocedimento: tipo})
        .sort({_id:1})
        .exec()
}

module.exports.listEntidades = () => {
    return contrato.aggregate([
        {$group: {_id: "$entidade_comunicante"}},
        {$sort: {_id: 1}},
        {$project: {_id:0, entidade: "$_id"}},
        {$group: {_id:null, entidades: {$push: "$entidade"}}}
    ])
    .exec()
    .then(result => {
        return result.length > 0 ? result[0].entidades : [];
    });
};

module.exports.listTipos = () => {
    return contrato.aggregate([
        {$group: {_id: "$tipoprocedimento"}},
        {$sort: {_id: 1}},
        {$project: {_id:0, tipo: "$_id"}},
        {$group: {_id:null, tipos: {$push: "$tipo"}}}
    ])
    .exec()
    .then(result => {
        return result.length > 0 ? result[0].tipos : [];
    });
};

module.exports.insert = (novoContrato) => {
    if((novoContrato.find({_id : novoContrato._id}).exec()).length != 1){
        var newContrato = new contrato(novoContrato) // new modelName começa com maiuscula
        return newContrato.save()
    }
}

module.exports.remove = (id) => {
    return contrato
        .find({_id : id})
        .deleteOne()
        .exec()
}

module.exports.update = (id, contratoUpdated) => {
    return contrato
    .findByIdAndUpdate(id,contratoUpdated, {new:true})
    .exec()
}