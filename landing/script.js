// Funzione per il pulsante "Scopri di più"
function discover() {
    // Effetto click con animazione
    const button = event.target.closest('.cta-button');
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        
        // Naviga alla pagina dei livelli
        window.location.href = '../levels.html';
    }, 100);
}

// Messaggio in stile terminale
function showTerminalMessage() {
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
            border: 3px solid #ffffff;
            padding: 40px;
            background: #0a0a0a;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            max-width: 600px;
            text-align: center;
        ">
            <div style="color: #ffffff; font-size: 18px; margin-bottom: 20px; letter-spacing: 2px;">
                > SISTEMA IN SVILUPPO <
            </div>
            <div style="color: #e0e0e0; font-size: 14px; line-height: 1.8; margin-bottom: 30px;">
                L'applicazione EasySQL è attualmente in fase di sviluppo.<br>
                Stay tuned per aggiornamenti!
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: transparent;
                border: 2px solid #ffffff;
                color: #ffffff;
                padding: 15px 40px;
                font-family: 'Share Tech Mono', monospace;
                font-size: 16px;
                cursor: pointer;
                letter-spacing: 2px;
                transition: all 0.3s;
            " onmouseover="this.style.background='#ffffff'; this.style.color='#0a0a0a'" 
               onmouseout="this.style.background='transparent'; this.style.color='#ffffff'">
                [ CHIUDI ]
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

// Easter egg: pressione tasti
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        discover();
    }
});

// Effetto audio al caricamento (opzionale)
window.addEventListener('load', () => {
    console.log('%c EasySQL System Initialized ', 'background: #ffffff; color: #0a0a0a; font-size: 16px; font-weight: bold; padding: 10px;');
    console.log('%c [ READY FOR LEARNING ] ', 'color: #ffffff; font-size: 14px;');
});
