document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('cadastro-form');
    const nomeCompletoInput = document.getElementById('nome-completo');
    const dataNascimentoInput = document.getElementById('data-nascimento');
    const generoSelect = document.getElementById('genero');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const cpfInput = document.getElementById('cpf');
    const cpfError = document.getElementById('cpf-error');
    const cepFaturamentoInput = document.getElementById('cep-faturamento');
    const logradouroFaturamentoInput = document.getElementById('logradouro-faturamento');
    const numeroFaturamentoInput = document.getElementById('numero-faturamento');
    const complementoFaturamentoInput = document.getElementById('complemento-faturamento');
    const bairroFaturamentoInput = document.getElementById('bairro-faturamento');
    const cidadeFaturamentoInput = document.getElementById('cidade-faturamento');
    const ufFaturamentoSelect = document.getElementById('uf-faturamento');
    const adicionarEnderecoEntregaBotao = document.getElementById('adicionar-endereco-entrega');
    const enderecosEntregaContainer = document.getElementById('enderecos-entrega-container');

    let enderecoEntregaCounter = 1;

    // Função para validar o formato do CEP
    const validarCEP = (cep) => /^[0-9]{5}-[0-9]{3}$/.test(cep);

    // Função para buscar o endereço pelo CEP (ViaCEP API)
    const buscarEnderecoPorCEP = async (cep, logradouroInput, bairroInput, cidadeInput, ufSelect, erroElement) => {
        if (!validarCEP(cep)) {
            if (erroElement) erroElement.textContent = 'CEP inválido.';
            return null;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
            const data = await response.json();

            if (!data.erro) {
                if (erroElement) erroElement.textContent = '';
                if (logradouroInput) logradouroInput.value = data.logradouro;
                if (bairroInput) bairroInput.value = data.bairro;
                if (cidadeInput) cidadeInput.value = data.localidade;
                if (ufSelect) ufSelect.value = data.uf;
                return data;
            } else {
                if (erroElement) erroElement.textContent = 'CEP não encontrado.';
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            if (erroElement) erroElement.textContent = 'Erro ao buscar CEP.';
            return null;
        }
    };

    // Evento para buscar endereço de faturamento ao mudar o CEP
    if (cepFaturamentoInput) {
        cepFaturamentoInput.addEventListener('blur', () => {
            buscarEnderecoPorCEP(
                cepFaturamentoInput.value,
                logradouroFaturamentoInput,
                bairroFaturamentoInput,
                cidadeFaturamentoInput,
                ufFaturamentoSelect,
                document.getElementById('cep-faturamento-error')
            );
        });
    }

    // Função para criar um novo endereço de entrega
    const criarEnderecoEntrega = () => {
        enderecoEntregaCounter++;
        const novoEndereco = document.createElement('div');
        novoEndereco.classList.add('endereco-entrega-item');
        novoEndereco.innerHTML = `
            <label>Endereço de Entrega <span class="math-inline">\{enderecoEntregaCounter\}\:</label\>
<button type\="button" class\="copiar\-faturamento"\>Copiar do Faturamento</button\>
<div class\="form\-group"\>
<label for\="cep\-entrega\-</span>{enderecoEntregaCounter}">CEP:</label>
                <input type="text" class="cep-entrega" id="cep-entrega-<span class="math-inline">\{enderecoEntregaCounter\}" name\="cep\-entrega\[\]" required pattern\="\[0\-9\]\{5\}\-\[0\-9\]\{3\}"\>
<small class\="cep\-entrega\-error error\-message"\></small\>
</div\>
<div class\="form\-group"\>
<label for\="logradouro\-entrega\-</span>{enderecoEntregaCounter}">Logradouro:</label>
                <input type="text" class="logradouro-entrega" id="logradouro-entrega-<span class="math-inline">\{enderecoEntregaCounter\}" name\="logradouro\-entrega\[\]" required\>
</div\>
<div class\="form\-group"\>
<label for\="numero\-entrega\-</span>{enderecoEntregaCounter}">Número:</label>
                <input type="text" class="numero-entrega" id="numero-entrega-<span class="math-inline">\{enderecoEntregaCounter\}" name\="numero\-entrega\[\]" required\>
</div\>
<div class\="form\-group"\>
<label for\="complemento\-entrega\-</span>{enderecoEntregaCounter}">Complemento:</label>
                <input type="text" class="complemento-entrega" id="complemento-entrega-<span class="math-inline">\{enderecoEntregaCounter\}" name\="complemento\-entrega\[\]"\>
</div\>
<div class\="form\-group"\>
<label for\="bairro\-entrega\-</span>{enderecoEntregaCounter}">Bairro:</label>
                <input type="text" class="bairro-entrega" id="bairro-entrega-<span class="math-inline">\{enderecoEntregaCounter\}" name\="bairro\-entrega\[\]" required\>
</div\>
<div class\="form\-group"\>
<label for\="cidade\-entrega\-</span>{enderecoEntregaCounter}">Cidade:</label>
                <input type="text" class="cidade-entrega" id="cidade-entrega-<span class="math-inline">\{enderecoEntregaCounter\}" name\="cidade\-entrega\[\]" required\>
</div\>
<div class\="form\-group"\>
<label for\="uf\-entrega\-</span>{enderecoEntregaCounter}">UF:</label>
                <select class="uf-entrega" id="uf-entrega-${enderecoEntregaCounter}" name="uf-entrega[]" required>
                    <option value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                </select>
            </div>
        `;
        enderecosEntregaContainer.appendChild(novoEndereco);

        // Adicionar evento para buscar endereço ao mudar o CEP do novo endereço
        const novoCepInput = novoEndereco.querySelector('.cep-entrega');
        const novoLogradouroInput = novoEndereco.querySelector('.logradouro-entrega');
        const novoBairroInput = novoEndereco.querySelector('.bairro-entrega');
        const novaCidadeInput = novoEndereco.querySelector('.cidade-entrega');
        const novaUfSelect = novoEndereco.querySelector('.uf-entrega');
        const novoErroElement = novoEndereco.querySelector('.cep-entrega-error');

        novoCepInput.addEventListener('blur', () => {
            buscarEnderecoPorCEP(
                novoCepInput.value,
                novoLogradouroInput,
                novoBairroInput,
                novaCidadeInput,
                novaUfSelect,
                novoErroElement
            );
        });

        // Adicionar evento para copiar endereço de faturamento ao novo endereço
        const copiarBotao = novoEndereco.querySelector('.copiar-faturamento');
        copiarBotao.addEventListener('click', () => {
            novoCepInput.value = cepFaturamentoInput.value;
            buscarEnderecoPorCEP(
                novoCepInput.value,
                novoLogradouroInput,
                novoBairroInput,
                novaCidadeInput,
                novaUfSelect,
                novoErroElement
            );
        });
    };

    // Evento para adicionar novo endereço de entrega
    if (adicionarEnderecoEntregaBotao) {
        adicionarEnderecoEntregaBotao.addEventListener('click', criarEnderecoEntrega);
    }

    // Adicionar um ouvinte de evento para cada CEP de entrega existente inicialmente
    enderecosEntregaContainer.querySelectorAll('.endereco-entrega-item').forEach((item, index) => {
        const cepEntregaInput = item.querySelector('.cep-entrega');
        const logradouroEntregaInput = item.querySelector('.logradouro-entrega');
        const bairroEntregaInput = item.querySelector('.bairro-entrega');
        const cidadeEntregaInput = item.querySelector('.cidade-entrega');
        const ufEntregaSelect = item.querySelector('.uf-entrega');
        const cepEntregaError = item.querySelector('.cep-entrega-error');
        const copiarBotao = item.querySelector('.copiar-faturamento');

        if (cepEntregaInput) {
            cepEntregaInput.addEventListener('blur', () => {
                buscarEnderecoPorCEP(
                    cepEntregaInput.value,
                    logradouroEntregaInput,
                    bairroEntregaInput,
                    cidadeEntregaInput,
                    ufEntregaSelect,
                    cepEntregaError
                );
            });
        }

        if (copiarBotao) {
            copiarBotao.addEventListener('click', () => {
                cepEntregaInput.value = cepFaturamentoInput.value;
                buscarEnderecoPorCEP(
                    cepEntregaInput.value,
                    logradouroEntregaInput,
                    bairroEntregaInput,
                    cidadeEntregaInput,
                    ufEntregaSelect,
                    cepEntregaError
                );
            });
        }
    });

    // Função para validar o nome completo
    const validarNomeCompleto = (nome) => {
        const palavras = nome.trim().split(/\s+/);
        return palavras.length >= 2 && palavras.every(palavra => palavra.length >= 3);
    };

    // Função para validar o CPF (algoritmo básico)
    const validarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf.charAt(10));
    };

    // Evento de envio do formulário de cadastro
    if (formCadastro) {
        formCadastro.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Validações básicas no frontend
            if (!validarNomeCompleto(nomeCompletoInput.value)) {
                alert('Por favor, informe seu nome completo corretamente (mínimo 2 palavras com 3 letras cada).');
                return;
            }

            if (!validarCPF(cpfInput.value)) {
                cpfError.textContent = 'CPF inválido.';
                return;
            } else {
                cpfError.textContent = '';
            }

            if (!validarCEP(cepFaturamentoInput.value)) {
                document.getElementById('cep-faturamento-error').textContent = 'CEP de faturamento inválido.';
                return;
            } else {
                document.getElementById('cep-faturamento-error').textContent = '';
            }

            const cepEntregaInputs = document.querySelectorAll('.cep-entrega');
            for (const cepInput of cepEntregaInputs) {
                if (!validarCEP(cepInput.value)) {
                    const erroElement = cepInput.nextElementSibling;
                    if (erroElement && erroElement.classList.contains('cep-entrega-error')) {
                        erroElement.textContent = 'CEP de entrega inválido.';
                    }
                    return;
                } else {
                    const erroElement = cepInput.nextElementSibling;
                    if (erroElement && erroElement.classList.contains('cep-entrega-error')) {
                        erroElement.textContent = '';
                    }
                }
            }

            const enderecosEntrega = [];
            enderecosEntregaContainer.querySelectorAll('.endereco-entrega-item').forEach(item => {
                enderecosEntrega.push({
                    cep: item.querySelector('[name="cep-entrega[]"]').value,
                    logradouro: item.querySelector('[name="logradouro-entrega[]"]').value,
                    numero: item.querySelector('[name="numero-entrega[]"]').value,
                    complemento: item.querySelector('[name="complemento-entrega[]"]').value,
                    bairro: item.querySelector('[name="bairro-entrega[]"]').value,
                    cidade: item.querySelector('[name="cidade-entrega[]"]').value,
                    uf: item.querySelector('[name="uf-entrega[]"]').value,
                });
            });

            const dadosCadastro = {
                nomeCompleto: nomeCompletoInput.value,
                dataNascimento: dataNascimentoInput.value,
                genero: generoSelect.value,
                email: emailInput.value,
                cpf: cpfInput.value,
                enderecoFaturamento: {
                    cep: cepFaturamentoInput.value,
                    logradouro: logradouroFaturamentoInput.value,
                    numero: numeroFaturamentoInput.value,
                    complemento: complementoFaturamentoInput.value,
                    bairro: bairroFaturamentoInput.value,
                    cidade: cidadeFaturamentoInput.value,
                    uf: ufFaturamentoSelect.value,
                },
                enderecosEntrega: enderecosEntrega,
                // Senha será tratada no backend por segurança
                senha: 'placeholder_frontend', // Enviar um placeholder, a senha real virá do input de senha (que você precisará adicionar)
            };

            try {
                const response = await fetch('http://localhost:8080/api/clientes/cadastrar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dadosCadastro),
                });

                const resposta = await response.json();

                if (response.ok) {
                    alert('Cadastro realizado com sucesso! Você será redirecionado para a tela de login.');
                    window.location.href = '/ecommerce/frontend/login.html';
                } else {
                    console.error('Erro no cadastro:', resposta);
                    // Exibir mensagens de erro específicas vindas do backend
                    if (resposta.message && resposta.message.includes('email já existe')) {
                        emailError.textContent = 'Este email já está cadastrado.';
                    }
                    if (resposta.message && resposta.message.includes('CPF já existe')) {
                        cpfError.textContent = 'Este CPF já está cadastrado.';
                    }
                    // Outras mensagens de erro genéricas ou específicas podem ser tratadas aqui
                    alert(`Erro no cadastro: ${resposta.message || 'Erro desconhecido. Tente novamente.'}`);
                }

            } catch (error) {
                console.error('Erro ao enviar dados de cadastro:', error);
                alert('Erro ao enviar os dados de cadastro. Tente novamente mais tarde.');
            }
        });
    }

    // Adicionar funcionalidade de "Copiar do Faturamento" para o primeiro endereço de entrega inicial
    const primeiroEnderecoEntrega = enderecosEntregaContainer.querySelector('.endereco-entrega-item');
    if (primeiroEnderecoEntrega) {
        const copiarBotaoPrimeiro = primeiroEnderecoEntrega.querySelector('.copiar-faturamento');
        const cepEntregaInputPrimeiro = primeiroEnderecoEntrega.querySelector('.cep-entrega');
        const logradouroEntregaInputPrimeiro = primeiroEnderecoEntrega.querySelector('.logradouro-entrega');
        const bairroEntregaInputPrimeiro = primeiroEnderecoEntrega.querySelector('.bairro-entre