document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000';
    const form = document.getElementById('irrigacao-form');
    const tbody = document.querySelector('#irrigacoes-tabela tbody');

    async function carregarIrrigacoes() {
        try {
            const response = await fetch(`${API_URL}/irrigacoes`);
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            
            const irrigacoes = await response.json();

            tbody.innerHTML = ''; 
            
            irrigacoes.forEach(irrigacao => {
                const row = tbody.insertRow();
                
                row.insertCell().textContent = irrigacao.ID_Irrigacao;
                row.insertCell().textContent = irrigacao.Plantio_ID_Plantio;
                
                row.insertCell().textContent = irrigacao.Horario_Inicial.substring(0, 5);
                row.insertCell().textContent = irrigacao.Horario_Final.substring(0, 5);
            });
        } catch (error) {
            console.error('Erro ao carregar irrigações:', error);
            alert('Não foi possível carregar a lista de irrigações. Verifique a conexão com o servidor.');
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const irrigacaoData = Object.fromEntries(formData.entries());
        
        irrigacaoData.Plantio_ID_Plantio = parseInt(irrigacaoData.Plantio_ID_Plantio);

        try {
            const response = await fetch(`${API_URL}/agendarIrrigacao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(irrigacaoData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.msg || 'Agendamento de Irrigação realizado com sucesso!');
                form.reset(); 
                carregarIrrigacoes(); 
            } else {
                alert(result.msg || 'Erro ao agendar irrigação. Verifique se o ID do plantio existe ou se os horários são válidos.');
            }
        } catch (error) {
            console.error('Erro de conexão ao agendar:', error);
            alert('Erro de conexão com o servidor. Tente novamente.');
        }
    });

    carregarIrrigacoes();
});