const plane = document.getElementById('plane');
const river = document.getElementById('river');

let planePosition = 50; // Posição inicial do avião em porcentagem
const planeSpeed = 0.5; // Velocidade do movimento do avião
let isGameOver = false; // Variável para verificar se o jogo terminou
let canShoot = true; // Variável para controlar o intervalo entre os tiros
const shootInterval = 300; // Intervalo em milissegundos entre os tiros

// Função para criar o projetil
function createProjectile() {
    if (isGameOver || !canShoot) return; // Não atira se o jogo acabou ou se não pode atirar

    const projectile = document.createElement('div'); // Cria um novo elemento 'div'
    projectile.classList.add('projectile'); // Adiciona a classe do projetil

    // Define a posição inicial do projetil com base na posição do avião
    projectile.style.left = (plane.offsetLeft + plane.offsetWidth / 2) + 'px';
    projectile.style.top = plane.offsetTop + 'px';

    river.appendChild(projectile); // Adiciona o projetil no rio

    moveProjectile(projectile); // Move o projetil para cima

    canShoot = false; // Define que não pode atirar novamente
    setTimeout(() => {
        canShoot = true; // Após o intervalo, permite atirar novamente
    }, shootInterval); // Aguarda o intervalo de tempo
}

// Função para mover o projetil
function moveProjectile(projectile) {
    let projectileInterval = setInterval(() => {
        let projectileTop = parseInt(projectile.style.top); // Pega a posição atual do projetil

        if (projectileTop <= 0) { // Se o projetil sair da tela
            projectile.remove(); // Remove o projetil do DOM
            clearInterval(projectileInterval); // Para o intervalo
        } else {
            projectile.style.top = (projectileTop - 10) + 'px'; // Move o projetil para cima
        }
    }, 30); // Intervalo de movimento a cada 30ms
}

// Função para verificar colisões
function checkCollision() {
    const riverRect = river.getBoundingClientRect(); // Pega a posição e o tamanho do rio
    const planeRect = plane.getBoundingClientRect(); // Pega a posição e o tamanho do avião

    // Verifica se o avião está tocando as áreas verdes
    if (planeRect.left < riverRect.left || planeRect.right > riverRect.right) {
        plane.src = 'images/plane-crash.png'; // Troca a imagem do avião para a imagem de "explodido"
        alert("Game Over!");
        isGameOver = true; // Marca que o jogo terminou
        resetGame(); // Reinicia o jogo
    }
}

// Função para mover o avião
function movePlane(direction) {
    if (isGameOver) return; // Impede movimentação se o jogo acabou

    if (direction === 'left') {
        planePosition -= planeSpeed; // Move para a esquerda
    } else if (direction === 'right') {
        planePosition += planeSpeed; // Move para a direita
    }

    // Mantém o avião dentro dos limites visuais
    planePosition = Math.max(0, Math.min(100, planePosition)); // Limita entre 0% e 100%
    plane.style.left = planePosition + '%'; // Atualiza a posição do avião

    checkCollision(); // Verifica colisão após mover
}

// Função para reiniciar o jogo
function resetGame() {
    setTimeout(() => {
        planePosition = 50; // Reseta a posição do avião
        plane.style.left = planePosition + '%'; // Atualiza a posição do avião
        plane.src = 'images/plane.png'; // Retorna a imagem original do avião
        isGameOver = false; // Reseta o estado de game over
    }, 500); // Aguarda 0.5 segundos antes de resetar o jogo
}

// Adicionando eventos de teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        movePlane('left');
    } else if (event.key === 'ArrowRight') {
        movePlane('right');
    } else if (event.key === ' ') {
        createProjectile(); // Dispara um projetil ao pressionar a barra de espaço
    }
});
