document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'http://localhost:3000';
    const form = document.getElementById('colheita-form');
    const tbody = document.querySelector('#colheitas-tabela tbody');

    async function carregarColheitas() {
        try {
            const response = await fetch(`${API_URL}/colheitas`);
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            
            const colheitas = await response.json();

            tbody.innerHTML = ''; 
            
            colheitas.forEach(colheita => {
                const row = tbody.insertRow();
                
                const dataSimples = colheita.Data_Colheita ? colheita.Data_Colheita.split('T')[0] : 'N/A';

                row.insertCell().textContent = colheita.ID_Colheita; 
                row.insertCell().textContent = colheita.ID_Plantio;
                row.insertCell().textContent = dataSimples;
                row.insertCell().textContent = colheita.Quantidade_Colhida;
                row.insertCell().textContent = colheita.Qualidade;
            });
        } catch (error) {
            console.error('Erro ao carregar colheitas:', error);
            alert('Não foi possível carregar os dados de colheita. Verifique o servidor.');
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const colheitaData = Object.fromEntries(formData.entries());

        colheitaData.ID_Plantio = parseInt(colheitaData.ID_Plantio);
        colheitaData.Quantidade_Colhida = parseInt(colheitaData.Quantidade_Colhida);

        try {
            const response = await fetch(`${API_URL}/registrarColheita`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(colheitaData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.msg || 'Colheita registrada com sucesso!');
                form.reset(); 
                carregarColheitas(); 
            } else {
                alert(result.msg || 'Erro ao registrar colheita. Verifique o ID do plantio.');
            }
        } catch (error) {
            console.error('Erro de conexão ao registrar:', error);
            alert('Erro de conexão com o servidor. Tente novamente.');
        }
    });

    carregarColheitas(); 
});