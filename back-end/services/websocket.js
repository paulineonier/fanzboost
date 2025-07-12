function setupWebSocket(wss) {
    wss.on('connection', (ws) => {
      console.log('Client WebSocket connecté.');
  
      // Exemple : Envoi d’un événement fictif
      setTimeout(() => {
        ws.send(JSON.stringify({
          type: 'MATCH_EVENT',
          message: 'BUT marqué à la 73e minute',
          timestamp: Date.now()
        }));
      }, 5000);
    });
  }
  
  module.exports = setupWebSocket;
  