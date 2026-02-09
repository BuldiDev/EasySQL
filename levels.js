// Gestione selezione livelli

// Stato del gioco (in futuro sarà salvato in localStorage)
const gameState = {
    unlockedLevels: [1],
    completedLevels: [],
    levelProgress: {
        1: { completed: 0, total: 5 },
        2: { completed: 0, total: 5 },
        3: { completed: 0, total: 5 },
        4: { completed: 0, total: 5 },
        5: { completed: 0, total: 5 },
        6: { completed: 0, total: 5 }
    },
    xp: 0,
    rank: 'PRINCIPIANTE'
};

// Funzione per selezionare un livello
function selectLevel(levelNumber) {
    if (!gameState.unlockedLevels.includes(levelNumber)) {
        showLockedMessage();
        return;
    }

    // Effetto visivo
    const card = event.currentTarget;
    card.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        card.style.transform = '';
        // Naviga alla pagina del livello
        window.location.href = `level${levelNumber}.html`;
    }, 150);
}

// Messaggio per livello bloccato
function showLockedMessage() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        font-family: 'Share Tech Mono', monospace;
    `;
    
    overlay.innerHTML = `
        <div style="
            border: 3px solid #ff5555;
            padding: 40px;
            background: #0a0a0a;
            box-shadow: 0 0 20px rgba(255, 85, 85, 0.5);
            max-width: 600px;
            text-align: center;
        ">
            <div style="color: #ff5555; font-size: 24px; margin-bottom: 20px; letter-spacing: 2px;">
                ACCESSO NEGATO
            </div>
            <div style="color: #e0e0e0; font-size: 14px; line-height: 1.8; margin-bottom: 30px;">
                Questo livello è bloccato.<br>
                Completa i livelli precedenti per sbloccarlo!
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: transparent;
                border: 2px solid #ff5555;
                color: #ff5555;
                padding: 15px 40px;
                font-family: 'Share Tech Mono', monospace;
                font-size: 16px;
                cursor: pointer;
                letter-spacing: 2px;
                transition: all 0.3s;
            " onmouseover="this.style.background='#ff5555'; this.style.color='#0a0a0a'" 
               onmouseout="this.style.background='transparent'; this.style.color='#ff5555'">
                [ OK ]
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

// Torna al menu principale
function goBack() {
    window.location.href = 'landing/index.html';
}

// Easter egg: pressione ESC per tornare indietro
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        goBack();
    }
});

// Caricamento
window.addEventListener('load', () => {
    console.log('%c ═══ LEVEL SELECTION LOADED ═══ ', 'background: #ffffff; color: #0a0a0a; font-size: 14px; font-weight: bold; padding: 8px;');
    
    // Carica stato da localStorage (se esiste)
    const saved = localStorage.getItem('easysql_progress');
    if (saved) {
        const savedState = JSON.parse(saved);
        
        // Merge dello stato salvato con quello di default
        if (savedState.unlockedLevels) gameState.unlockedLevels = savedState.unlockedLevels;
        if (savedState.completedLevels) gameState.completedLevels = savedState.completedLevels;
        if (savedState.levelProgress) gameState.levelProgress = { ...gameState.levelProgress, ...savedState.levelProgress };
        if (savedState.xp !== undefined) gameState.xp = savedState.xp;
        if (savedState.rank) gameState.rank = savedState.rank;
    }
    
    updateUI();
});

// Aggiorna l'interfaccia in base allo stato
function updateUI() {
    // Aggiorna le statistiche nell'header
    const totalXPElement = document.getElementById('totalXP');
    const levelProgressElement = document.getElementById('levelProgress');
    
    if (totalXPElement) totalXPElement.textContent = gameState.xp || 0;
    if (levelProgressElement) levelProgressElement.textContent = `${gameState.completedLevels.length}/6`;
    
    // Aggiorna le statistiche nella status bar
    const completedCount = gameState.completedLevels.length;
    const statusValues = document.querySelectorAll('.status-bar .status-value');
    
    if (statusValues[0]) statusValues[0].textContent = `${completedCount}/6`;
    if (statusValues[1]) statusValues[1].textContent = `${gameState.xp || 0} XP`;
    if (statusValues[2]) statusValues[2].textContent = gameState.rank || 'PRINCIPIANTE';
    
    // Aggiorna le card dei livelli
    for (let levelNum = 1; levelNum <= 6; levelNum++) {
        const card = document.querySelector(`[data-level="${levelNum}"]`);
        if (!card) continue;
        
        const badge = card.querySelector('.status-badge');
        const isUnlocked = gameState.unlockedLevels.includes(levelNum);
        const isCompleted = gameState.completedLevels.includes(levelNum);
        
        // Rimuovi tutte le classi di stato
        card.classList.remove('locked', 'unlocked', 'completed');
        badge.classList.remove('locked', 'unlocked', 'completed');
        
        if (isCompleted) {
            card.classList.add('completed');
            badge.classList.add('completed');
            badge.textContent = 'COMPLETATO';
        } else if (isUnlocked) {
            card.classList.add('unlocked');
            badge.classList.add('unlocked');
            badge.textContent = 'DISPONIBILE';
        } else {
            card.classList.add('locked');
            badge.classList.add('locked');
            badge.textContent = 'BLOCCATO';
        }
        
        // Aggiorna barra progresso se disponibile
        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.progress-text');
        
        if (progressFill && progressText && gameState.levelProgress[levelNum]) {
            const progress = gameState.levelProgress[levelNum];
            const percentage = (progress.completed / progress.total) * 100;
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${progress.completed}/${progress.total} COMPLETATI`;
        }
    }
}

// Reset dei progressi
function resetProgress() {
    if (confirm('Sei sicuro di voler resettare tutti i progressi? Questa azione non può essere annullata.')) {
        localStorage.removeItem('easysql_progress');
        localStorage.removeItem('easysql_level1');
        localStorage.removeItem('easysql_level2');
        localStorage.removeItem('easysql_level3');
        localStorage.removeItem('easysql_level4');
        localStorage.removeItem('easysql_level5');
        localStorage.removeItem('easysql_level6');
        
        // Reset stato locale
        gameState.unlockedLevels = [1];
        gameState.completedLevels = [];
        gameState.levelProgress = {
            1: { completed: 0, total: 5 },
            2: { completed: 0, total: 5 },
            3: { completed: 0, total: 5 },
            4: { completed: 0, total: 5 },
            5: { completed: 0, total: 5 },
            6: { completed: 0, total: 5 }
        };
        gameState.xp = 0;
        gameState.rank = 'PRINCIPIANTE';
        
        updateUI();
        alert('Progressi resettati con successo!');
    }
}

// Salva progressi
function saveProgress() {
    localStorage.setItem('easysql_progress', JSON.stringify(gameState));
}
