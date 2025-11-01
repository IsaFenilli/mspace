  app.get('/musicoterapia', (req, res) => {
    const musicoterapia = [
      { id: 1, nome: 'Sessão 1', descricao: 'Músicas relaxantes para meditação', link: 'link_para_playlist_1' },
      { id: 2, nome: 'Sessão 2', descricao: 'Músicas para alívio de estresse', link: 'link_para_playlist_2' },
    ];
  
    res.json(musicoterapia);
  });
  
  
  
  