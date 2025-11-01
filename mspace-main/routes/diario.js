//DIÁRIO DE EMOÇÕES
app.post('/diario', async (req, res) => {
    const { usuarioId, emocao, descricao } = req.body || {};
    if (!usuarioId || !emocao || !descricao) {
      return res.status(400).json({ erro: 'Informe usuarioId, emocao e descricao' });
    }
  
    try {
      const novoDiario = await Diario.create({
        usuarioId,
        emocao,
        descricao,
        data: new Date().toISOString(),
      });
      res.status(201).json(novoDiario);
    } catch (e) {
      res.status(500).json({ erro: 'Falha ao criar diário', detalhe: e.message });
    }
  });
//Rota para Listar Diários de Emoções de um Paciente
  app.get('/diarios/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
    
    try {
      const diarios = await Diario.findAll({
        where: { usuarioId },
        order: [['data', 'DESC']], // Mais recente primeiro
      });
      res.json({ diarios });
    } catch (e) {
      res.status(500).json({ erro: 'Erro ao listar diários', detalhe: e.message });
    }
  });

  //Rota para Visualizar um Diário de Emoções Específico (Psicólogo ou Voluntário)
  app.get('/diario/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      const diario = await Diario.findByPk(id);
      if (!diario) return res.status(404).json({ erro: 'Diário não encontrado' });
      res.json(diario);
    } catch (e) {
      res.status(500).json({ erro: 'Erro ao visualizar diário', detalhe: e.message });
    }
  });
