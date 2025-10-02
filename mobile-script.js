document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000';
    
    const totalMudasEl = document.getElementById('total-mudas');
    const dataAtualizacaoEl = document.getElementById('data');

    async function carregarTotalMudas() {
        try {
            const response = await fetch(`${API_URL}/mudas`);
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            
            const data = await response.json();
            
            const totalMudas = data.total_mudas ? data.total_mudas.toLocaleString('pt-BR') : '0';
            
            let dataAtualizacaoFormatada = 'N/A';
            if (data.data_atualizacao) {
                const dataObj = new Date(data.data_atualizacao);
                dataAtualizacaoFormatada = dataObj.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }

            totalMudasEl.textContent = totalMudas;
            dataAtualizacaoEl.textContent = dataAtualizacaoFormatada;

        } catch (error) {
            console.error('Erro ao carregar o total de mudas:', error);
            totalMudasEl.textContent = 'ERRO';
            dataAtualizacaoEl.textContent = 'Erro de conexão';
        }
    }

    carregarTotalMudas();
});