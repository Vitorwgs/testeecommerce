document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;

            try {
                const response = await fetch('/api/auth/login', { // Sua rota de login na API
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, senha }),
                });

                const data = await response.json();

                if (response.ok && data.token) {
                    // Salvar o token (ex: localStorage, sessionStorage, cookies)
                    localStorage.setItem('authToken', data.token);
                    window.location.href = '/ecommerce/frontend/index.html'; // Redirecionar para a página inicial
                } else {
                    alert(`Erro ao fazer login: ${data.message || 'Credenciais inválidas.'}`);
                }

            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Erro ao fazer login. Tente novamente mais tarde.');
            }
        });
    }
});