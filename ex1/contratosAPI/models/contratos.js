const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({
  _id: Number,
  tipoprocedimento: String,
  objetoContrato: String,
  dataPublicacao: Date,
  dataCelebracaoContrato: Date,
  precoContratual: Number,
  prazoExecucao: Number,
  NIPC_entidade_comunicante: Number,
  entidade_comunicante: String,
  fundamentacao: String,
}, { versionKey: false });

module.exports = mongoose.model('contratos', contratoSchema);