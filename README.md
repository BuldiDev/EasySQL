# EasySQL

Piattaforma web educativa per imparare SQL attraverso esercizi progressivi, feedback immediato e gamificazione con sistema XP.

## Caratteristiche Principali

- Sistema a 6 livelli progressivi (SELECT, WHERE, ORDER BY, Aggregazioni, GROUP BY, JOIN)
- SQL engine JavaScript custom con supporto completo per JOIN, aggregazioni e caratteri accentati
- Interfaccia split-view: database visualizzato a sinistra, console SQL a destra
- Persistenza progressi con LocalStorage
- UI in stile terminale retro con estetica cyberpunk

## Tecnologie

- HTML5, CSS3, JavaScript ES6+
- Google Fonts (Share Tech Mono)
- LocalStorage API
- Parser SQL custom (1195 righe)

## Struttura

```
EasySQL/
├── landing/           # Landing page
├── levels.html        # Selezione livelli
├── levels.js          # Progress tracking
├── level1.html        # Livello SELECT
├── level2.html        # Livello WHERE
├── level.js           # SQL engine
└── level.css          # Stili esercizi
```

## Livelli

| N | Argomento | XP | Status |
|---|-----------|-----|--------|
| 1 | SELECT & DISTINCT | 100 | Completo |
| 2 | WHERE & Filtri | 120 | Completo |
| 3 | ORDER BY & LIMIT | 140 | In sviluppo |
| 4 | Aggregazioni | 160 | In sviluppo |
| 5 | GROUP BY & HAVING | 180 | In sviluppo |
| 6 | JOIN Multi-tabella | 200 | In sviluppo |
