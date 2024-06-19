const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const apiKey = 'DJIIMD7V585ZULJ9'; // Substitua pela sua chave de API do Alpha Vantage
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Verifique se a resposta contém os dados esperados
        if (data['Time Series (Daily)']) {
            res.json(data['Time Series (Daily)']);
        } else {
            res.status(404).json({ error: 'Dados não encontrados para o símbolo fornecido' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados da API' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
