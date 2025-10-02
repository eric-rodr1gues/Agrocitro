document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'http://localhost:3000';
    const form = document.getElementById('plantio-form');
    const tbody = document.querySelector('#plantios-tabela tbody');

    async function carregarPlantios() {
        try {
            const response = await fetch(`${API_URL}/plantios`);
            const plantios = await response.json();

            tbody.innerHTML = ''; 
            
            plantios.forEach(plantio => {
                const row = tbody.insertRow();
                
                const dataSimples = plantio.Data_Plantio ? plantio.Data_Plantio.split('T')[0] : 'N/A';

                row.insertCell().textContent = plantio.ID_Plantio; 
                row.insertCell().textContent = plantio.Variedade;
                row.insertCell().textContent = plantio.Quantidade_Plantada;
                row.insertCell().textContent = dataSimples;
                row.insertCell().textContent = plantio.Localizacao;
            });
        } catch (error) {
            console.error('Erro ao carregar plantios:', error);
            alert('Não foi possível carregar os dados. Verifique se o servidor está rodando na porta 3000.');
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const plantioData = Object.fromEntries(formData.entries());

        plantioData.Quantidade_Plantada = parseInt(plantioData.Quantidade_Plantada);

        try {
            const response = await fetch(`${API_URL}/registrarPlantio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(plantioData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.msg || 'Plantio registrado com sucesso!');
                form.reset(); 
                carregarPlantios(); 
            } else {
                alert(result.erro || result.msg || 'Erro ao registrar plantio.');
            }
        } catch (error) {
            console.error('Erro de conexão ao registrar:', error);
            alert('Erro de conexão com o servidor. Tente novamente.');
        }
    });

    carregarPlantios(); 
});