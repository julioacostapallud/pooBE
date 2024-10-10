
const express = require('express');
const WebSocket = require('ws');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

// Crear el servidor WebSocket
const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
const wss = new WebSocket.Server({ server });

// Almacenar el estado del presentador
let overrideEnabled = false;

wss.on('connection', (ws) => {
    // Función para enviar los datos iniciales al cliente
    const sendInitialData = () => {
        // Enviamos los datos iniciales (overrideEnabled) al cliente
        ws.send(JSON.stringify({ overrideEnabled }));
    };

    sendInitialData();  // Llamamos a la función para enviar los datos

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'toggleOverride') {
            overrideEnabled = data.overrideEnabled;

            // Enviar el estado completo a todos los clientes conectados
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ overrideEnabled }));
                }
            });
        }
    });
});
