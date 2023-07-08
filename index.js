const express = require('express');
const fetch = require('isomorphic-fetch');
const cors = require('cors');

const app = express();

// Configuração do CORS
app.use(cors({
  origin: 'http://127.0.0.1:5173' // Substitua pela origem permitida
}));


const chaveApi = 'RGAPI-09b1ae5f-f086-4dd1-8785-ac44d12790bf'

app.get('/', async (req, res) => {
  try {
    ; // Substitua pela sua chave da API
    let searchText = req.query.search;

    const respostaApi = await fetch("https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + chaveApi);

    const dadosApi = await respostaApi.json();
    res.json(dadosApi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao encontrar nome do invocador' });
  }
});

app.get('/playerrank', async (req, res) => {
    try {
     
      let summonerID = req.query.search;
  
      const respostaApi = await fetch("https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerID  + "?api_key=" + chaveApi);
  
      const dadosApi = await respostaApi.json();
      res.json(dadosApi);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'erro ao encontrar summonerID' });
    }
  });

  app.get('/achivements', async (req, res) => {
    try {
     
      let summonerPuuid = req.query.search;
  
      const respostaApi = await fetch("https://br1.api.riotgames.com/lol/challenges/v1/player-data/" + summonerPuuid + "?api_key=" + chaveApi);
  
      const dadosApi = await respostaApi.json();
      res.json(dadosApi);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao encontrar summoner Puuid' });
    }
  });


  app.get('/matches', async (req, res) => {
    try {
     
        const summonerPuuid = req.query.summonerPuuid;
        const start = req.query.start;
        const count = req.query.count;
  
        const respostaApi = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=${start}&count=${count}&api_key=${chaveApi}`);
  
      const dadosApi = await respostaApi.json();
      res.json(dadosApi);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao encontrar summoner Puuid' });
    }
  });

  app.get('/matchesdata', async (req, res) => {
    try {
     
        const matchID = req.query.matchID;
        
  
        const respostaApi = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/` + matchID + "?api_key=" + chaveApi );
  
      const dadosApi = await respostaApi.json();
      res.json(dadosApi);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao encontrar summoner Puuid' });
    }
  });

   app.get('/matchestimeline', async (req, res) => {
    try {
     
        const matchID = req.query.matchID;
        
  
        const respostaApi = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/` + matchID + "/timeline?api_key=" + chaveApi );
  
      const dadosApi = await respostaApi.json();
      res.json(dadosApi);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao encontrar summoner Puuid' });
    }
  });

app.listen(3000, () => {
  console.log('Servidor intermediário iniciado na porta 3000');
});
