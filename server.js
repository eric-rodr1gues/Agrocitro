const mysql2 = require('mysql2')
const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());

const { obterPlantios } = require('./repositorio/BancoDados')
const { incluirPlantios } = require('./repositorio/BancoDados')
const { obterTotalMudas } = require('./repositorio/BancoDados') 
const { obterIrrigacoes } = require('./repositorio/BancoDados')
const { incluirIrrigacao } = require('./repositorio/BancoDados')
const { obterColheitas } = require('./repositorio/BancoDados') 
const { incluirColheita } = require('./repositorio/BancoDados') 


server.get('/plantios', async (req, res) => {
    try {
        const plantios = await obterPlantios();
        res.json(plantios);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao obter lista de plantios" });
    }
});

server.post('/registrarPlantio', async (req, res) => {
    console.log(req.body);
    const { Variedade, Data_Plantio, Quantidade_Plantada, Localizacao} = req.body;
    
    try {
        const resposta = await incluirPlantios(Variedade, Data_Plantio, Quantidade_Plantada, Localizacao);

        if(resposta.affectedRows > 0) {
            res.status(201).json({msg: 'Plantio registrado com sucesso!'})
        } else {
            res.status(400).json({msg: 'Não foi possível registrar o plantio.'})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro interno do servidor ao registrar plantio.' });
    }
});



server.get('/mudas', async (req, res) => {
    try {
        const { total_mudas, data_atualizacao } = await obterTotalMudas();
        res.json({
            total_mudas: total_mudas || 0,
            data_atualizacao: data_atualizacao || null 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao obter total de mudas" });
    }
});


server.get('/irrigacoes', async (req, res) => {
    try {
        const irrigacoes = await obterIrrigacoes();
        res.json(irrigacoes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao obter agendamentos de irrigação" });
    }
});

server.post('/agendarIrrigacao', async (req, res) => {
    console.log(req.body);
    const { Horario_Inicial, Horario_Final, Plantio_ID_Plantio } = req.body;

    try {
        const resposta = await incluirIrrigacao(Horario_Inicial, Horario_Final, Plantio_ID_Plantio);

        if (resposta.affectedRows > 0) {
            res.status(201).json({ msg: 'Agendamento de Irrigação realizado com sucesso!', id: resposta.insertId });
        } else {
            res.status(400).json({ msg: 'Não foi possível agendar a irrigação.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro interno do servidor ao agendar irrigação.' });
    }
});


server.get('/colheitas', async (req, res) => {
    try {
        const colheitas = await obterColheitas();
        res.json(colheitas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao obter registros de colheita" });
    }
});

server.post('/registrarColheita', async (req, res) => {
    console.log(req.body);
    const { ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade } = req.body;

    try {
        const resposta = await incluirColheita(ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade);

        if (resposta.affectedRows > 0) {
            res.status(201).json({ msg: 'Colheita registrada com sucesso!', id: resposta.insertId });
        } else {
            res.status(400).json({ msg: 'Não foi possível registrar a colheita.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro interno do servidor ao registrar colheita.' });
    }
});


const PORT = 3000; 
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});