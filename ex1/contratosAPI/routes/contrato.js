var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contratos')

router.get('/', function(req, res, next) {
    Contrato.list()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.get('/entidades', function(req,res,next){
    Contrato.listEntidades()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.get('/tipos', function(req,res,next){
    Contrato.listTipos()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.get('/:id', function(req, res, next){
    Contrato.findById(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.get('/entidade/:numero', function(req,res,next){
    Contrato.findByEntidade(req.params.numero)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.get('/tipoprocedimento/:tipo', function(req,res,next){
    Contrato.findByTipoProcedimento(req.params.tipo)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.post('/', function(req,res,next){
    Contrato.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.put('/:id', function(req, res, next){
    Contrato.update(req.params._id, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  });

router.delete('/:id', function(req,res,next){
    Contrato.remove(req.params.id)
    .then(data => {
        res.jsonp(data)
        console.log("Deleted " + req.params.id)
    })
    .catch(erro => res.jsonp(erro))
});



module.exports = router;