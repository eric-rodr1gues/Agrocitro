const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: '127.0.0.1',
    user: 'root', 
    password: '', 
    database: 'agrocitro',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();


async function obterPlantios() {
    const [rows] = await pool.execute('SELECT * FROM plantio ORDER BY ID_Plantio DESC');
    return rows;
}

async function incluirPlantios(Variedade, Data_Plantio, Quantidade_Plantada, Localizacao) {
    const [result] = await pool.execute(
        'INSERT INTO plantio (Variedade, Data_Plantio, Quantidade_Plantada, Localizacao) VALUES (?, ?, ?, ?)',
        [Variedade, Data_Plantio, Quantidade_Plantada, Localizacao]
    );
    return result;
}

async function obterTotalMudas() {
    const [rows] = await pool.execute('SELECT SUM(Quantidade_Plantada) AS total_mudas, MAX(Data_Plantio) AS data_atualizacao FROM plantio');
    if (rows.length > 0) {
        return rows[0];
    }
    return { total_mudas: 0, data_atualizacao: null };
}

async function obterIrrigacoes() {
    const [rows] = await pool.execute('SELECT * FROM irrigacao ORDER BY ID_Irrigacao DESC');
    return rows;
}

async function incluirIrrigacao(Horario_Inicial, Horario_Final, Plantio_ID_Plantio) {
    const [result] = await pool.execute(
        'INSERT INTO irrigacao (ID_Plantio, Horario_Inicial, Horario_Final) VALUES (?, ?, ?)', 
        [Plantio_ID_Plantio, Horario_Inicial, Horario_Final] 
    );
    return result;
}

async function obterColheitas() {
    const [rows] = await pool.execute('SELECT * FROM colheita ORDER BY Data_Colheita DESC');
    return rows;
}

async function incluirColheita(ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade) {
    const [result] = await pool.execute(
        'INSERT INTO colheita (ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade) VALUES (?, ?, ?, ?)',
        [ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade]
    );
    return result;
}

module.exports = {
    obterPlantios,
    incluirPlantios,
    obterTotalMudas,
    obterIrrigacoes,
    incluirIrrigacao,
    obterColheitas,
    incluirColheita
};