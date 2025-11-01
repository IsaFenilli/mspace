//Marcar Consultas Presenciais
  //Rota para Marcar uma Consulta Presencial:
  app.post('/consulta/marcar', async (req, res) => {
    const { usuarioId, psicologoId, dataConsulta } = req.body || {};
    if (!usuarioId || !psicologoId || !dataConsulta) {
      return res.status(400).json({ erro: 'Informe usuarioId, psicologoId e dataConsulta' });
    }
  
    try {
      const consulta = await Consulta.create({
        usuarioId,
        psicologoId,
        dataConsulta,
        status: 'pendente', // Status inicial
        dataMarcacao: new Date().toISOString(),
      });
      res.status(201).json(consulta);
    } catch (e) {
      res.status(500).json({ erro: 'Erro ao marcar consulta', detalhe: e.message });
    }
  });
  
  //Rota para Verificar Consultas Marcadas:
  app.get('/consultas/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
    
    try {
      const consultas = await Consulta.findAll({
        where: { usuarioId },
        order: [['dataConsulta', 'ASC']], // Ordena pela data da consulta
      });
      res.json({ consultas });
    } catch (e) {
      res.status(500).json({ erro: 'Erro ao listar consultas', detalhe: e.message });
    }
  });
