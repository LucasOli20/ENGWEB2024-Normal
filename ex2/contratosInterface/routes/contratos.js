var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get('/', function(req,res,next){
    axios.get("http://localhost:16000/contratos")
    .then(resp => {
        contratos = resp.data
        console.log(contratos)
        res.status(200).render("listaContratos", {'lcontratos' : contratos})
    })
    .catch(erro => {
        res.status(500).render("infoPage", {"title": "Erro", "message": erro})
    })
});

router.get('/entidades/:nipc', function(req, res, next) {
    
    axios.get("http://localhost:16000/contratos/entidade/" + req.params.nipc)
    .then(resp => {
      listaEntidade = resp.data
      console.log(listaEntidade)
      res.status(200).render("infoEntidade", {"entidade" : listaEntidade})
    })
    .catch(erro => {
      res.status(502).render("infoPage", {"title": "Erro", "message": erro})
    })
  });

router.get('/:id', function(req, res, next) {
    
    axios.get("http://localhost:16000/contratos/" + req.params.id)
    .then(resp => {
      var contrato = resp.data
      res.status(200).render("infoContrato", {"contrato" : contrato})
    })
    .catch(erro => {
      res.status(503).render("infoPage", {"title": "Erro", "message": erro})
    })
  });



module.exports = router;