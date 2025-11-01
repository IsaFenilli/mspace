 app.post('/chat/psicologo', async (req, res) => {
    const { usuarioId, psicologoId, mensagem } = req.body || {};
    if (!usuarioId || !psicologoId || !mensagem) {
      return res.status(400).json({ erro: 'Informe usuarioId, psicologoId e mensagem' });
    }
  
    try {
      const chatRegistro = await ChatPsicologo.create({
        usuarioId,
        psicologoId,
        mensagem,
        data: new Date().toISOString(),
      });
      res.status(201).json(chatRegistro);
    } catch (e) {
      res.status(500).json({ erro: 'Erro ao iniciar chat com psicólogo', detalhe: e.message });
    }
  });

  //Rota para visualizar o histórico de chat com o psicólogo:
  app.get('/chat/psicologo/:usuarioId/:psicologoId', async (req, res) => {
    const { usuarioId, psicologoId } = req.params;
    
    try {
      const historico = await ChatPsicologo.findAll({
        where: { usuarioId, psicologoId },
        order: [['data', 'ASC']], 
      });
      res.json(historico);
    } catch (e) {
      res.status(500).json({ erro: 'Erro ao buscar histórico de chat com psicólogo', detalhe: e.message });
    }
  });


