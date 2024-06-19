const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

let stockData = {};

// Endpoint para obter dados de um ativo
app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    const apiKey = 'YOUR_API_KEY'; // Substitua pela sua chave de API do Alpha Vantage
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Verifique se a resposta contém os dados esperados
        if (data['Time Series (Daily)']) {
            stockData[symbol] = data['Time Series (Daily)'];
            res.json(data['Time Series (Daily)']);
        } else {
            res.status(404).json({ error: 'Dados não encontrados para o símbolo fornecido' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados da API' });
    }
});

// Endpoint para criar dados de um ativo
app.post('/stock', (req, res) => {
    const { symbol, data } = req.body;
    if (symbol && data) {
        stockData[symbol] = data;
        res.status(201).json({ message: 'Dados do ativo criados com sucesso', data });
    } else {
        res.status(400).json({ error: 'Símbolo e dados são necessários' });
    }
});

// Endpoint para atualizar dados de um ativo
app.put('/stock/:symbol', (req, res) => {
    const symbol = req.params.symbol;
    const { data } = req.body;

    if (stockData[symbol]) {
        if (data) {
            stockData[symbol] = data;
            res.json({ message: 'Dados do ativo atualizados com sucesso', data });
        } else {
            res.status(400).json({ error: 'Dados são necessários' });
        }
    } else {
        res.status(404).json({ error: 'Ativo não encontrado' });
    }
});

// Endpoint para deletar dados de um ativo
app.delete('/stock/:symbol', (req, res) => {
    const symbol = req.params.symbol;

    if (stockData[symbol]) {
        delete stockData[symbol];
        res.json({ message: 'Dados do ativo deletados com sucesso' });
    } else {
        res.status(404).json({ error: 'Ativo não encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
