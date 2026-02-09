// Logica per il livello SQL - Sistema Modulare

// Rileva il numero del livello dal nome del file
function getLevelNumber() {
  const match = window.location.pathname.match(/level(\d+)\.html/);
  return match ? parseInt(match[1]) : 1;
}

// Configurazioni per tutti i livelli
const levelConfigs = {
  1: {
  "levelId": 1,
  "title": "SELECT BASICS",
  "objective": "Impara a selezionare dati da una tabella",
  "xpTotal": 100,
  "theory": {
    "title": "IL COMANDO SELECT",
    "introduction": "Il comando SELECT è il più importante in SQL. Serve per recuperare (selezionare) dati da una o più tabelle del database. È il fondamento di qualsiasi interrogazione al database.",
    "sections": [
      {
        "subtitle": "Sintassi Base",
        "code": "SELECT colonne FROM nome_tabella;",
        "explanation": "Questa è la struttura fondamentale di una query SELECT. Dobbiamo sempre specificare COSA vogliamo (le colonne) e DA DOVE lo vogliamo prendere (la tabella)."
      },
      {
        "subtitle": "Selezionare Tutte le Colonne",
        "code": "SELECT * FROM tabella;",
        "explanation": "L'asterisco (*) è un carattere speciale che significa \"tutte le colonne\". È utile quando vogliamo vedere tutti i dati di una tabella senza dover elencare ogni singola colonna."
      },
      {
        "subtitle": "Selezionare Colonne Specifiche",
        "code": "SELECT colonna1, colonna2, colonna3 FROM tabella;",
        "explanation": "Possiamo scegliere esattamente quali colonne vogliamo vedere, elencandole separate da virgole. L'ordine in cui le elenchiamo sarà l'ordine in cui appariranno nei risultati."
      },
      {
        "subtitle": "Eliminare Duplicati con DISTINCT",
        "code": "SELECT DISTINCT colonna FROM tabella;",
        "explanation": "Quando una colonna contiene valori ripetuti, DISTINCT ci permette di vedere solo i valori unici, eliminando i duplicati. È molto utile per capire quali valori diversi esistono in una colonna."
      }
    ],
    "keyPoints": [
      "Ogni comando SQL termina con punto e virgola (;)",
      "SELECT è case-insensitive: SELECT, select o SeLeCt funzionano tutti",
      "I nomi delle colonne devono corrispondere esattamente a quelli della tabella",
      "L'ordine delle colonne nel SELECT determina l'ordine nel risultato"
    ],
    "examples": [
      {
        "description": "Vedere tutti i dati degli studenti",
        "code": "SELECT * FROM studenti;"
      },
      {
        "description": "Vedere solo nomi e città",
        "code": "SELECT nome, città FROM studenti;"
      },
      {
        "description": "Quali città ci sono (senza ripetizioni)",
        "code": "SELECT DISTINCT città FROM studenti;"
      }
    ]
  },
  "database": {
    "tableName": "studenti",
    "columns": ["id", "nome", "cognome", "età", "città"],
    "data": [
      { "id": 1, "nome": "Marco", "cognome": "Rossi", "età": 20, "città": "Roma" },
      { "id": 2, "nome": "Laura", "cognome": "Bianchi", "età": 22, "città": "Milano" },
      { "id": 3, "nome": "Giovanni", "cognome": "Verdi", "età": 19, "città": "Napoli" },
      { "id": 4, "nome": "Sara", "cognome": "Neri", "età": 21, "città": "Torino" },
      { "id": 5, "nome": "Luca", "cognome": "Gialli", "età": 23, "città": "Roma" }
    ]
  },
  "exercises": [
    {
      "id": 1,
      "title": "Seleziona Tutto",
      "description": "Scrivi una query che restituisca <strong>tutte le colonne</strong> e <strong>tutte le righe</strong> dalla tabella <code>studenti</code>.",
      "expectedResult": "5 righe, 5 colonne",
      "hint": "Per selezionare tutte le colonne senza elencarle, puoi usare un carattere speciale al posto del nome delle colonne.",
      "solution": "SELECT * FROM studenti;",
      "validation": {
        "regex": "SELECT\\s+\\*\\s+FROM\\s+studenti",
        "expectedColumns": ["id", "nome", "cognome", "età", "città"],
        "expectedRows": 5
      },
      "xp": 20
    },
    {
      "id": 2,
      "title": "Colonne Specifiche",
      "description": "Scrivi una query che restituisca <strong>solo le colonne</strong> <code>nome</code> e <code>cognome</code> di tutti gli studenti.",
      "expectedResult": "5 righe, 2 colonne (nome, cognome)",
      "hint": "Dopo SELECT, scrivi i nomi delle colonne che vuoi vedere, separandole con una virgola.",
      "solution": "SELECT nome, cognome FROM studenti;",
      "validation": {
        "regex": "SELECT\\s+nome\\s*,\\s*cognome\\s+FROM\\s+studenti",
        "expectedColumns": ["nome", "cognome"],
        "expectedRows": 5
      },
      "xp": 20
    },
    {
      "id": 3,
      "title": "Una Colonna",
      "description": "Scrivi una query che restituisca <strong>solo la colonna</strong> <code>città</code> di tutti gli studenti (includi anche le città duplicate).",
      "expectedResult": "5 righe, 1 colonna (città)",
      "hint": "Puoi specificare una singola colonna dopo SELECT, senza usare virgole.",
      "solution": "SELECT città FROM studenti;",
      "validation": {
        "regex": "SELECT\\s+città\\s+FROM\\s+studenti(?!\\s+WHERE)",
        "expectedColumns": ["città"],
        "expectedRows": 5
      },
      "xp": 20
    },
    {
      "id": 4,
      "title": "Valori Unici",
      "description": "Scrivi una query che restituisca la colonna <code>città</code>, ma <strong>senza valori duplicati</strong>. Ogni città deve apparire una sola volta.",
      "expectedResult": "4 righe, 1 colonna (città univoche)",
      "hint": "Esiste una parola chiave che va inserita tra SELECT e il nome della colonna per eliminare i duplicati.",
      "solution": "SELECT DISTINCT città FROM studenti;",
      "validation": {
        "regex": "SELECT\\s+DISTINCT\\s+città\\s+FROM\\s+studenti",
        "expectedColumns": ["città"],
        "distinct": true
      },
      "xp": 20
    },
    {
      "id": 5,
      "title": "Tre Colonne",
      "description": "Scrivi una query che restituisca <strong>tre colonne specifiche</strong>: <code>nome</code>, <code>età</code> e <code>città</code> di tutti gli studenti.",
      "expectedResult": "5 righe, 3 colonne (nome, età, città)",
      "hint": "Elenca le tre colonne separandole con virgole, rispettando l'ordine richiesto.",
      "solution": "SELECT nome, età, città FROM studenti;",
      "validation": {
        "regex": "SELECT\\s+nome\\s*,\\s*età\\s*,\\s*città\\s+FROM\\s+studenti",
        "expectedColumns": ["nome", "età", "città"],
        "expectedRows": 5
      },
      "xp": 20
    }
  ]
  },

  2: {
  "levelId": 2,
  "title": "WHERE CLAUSE",
  "objective": "Impara a filtrare i dati con condizioni WHERE",
  "xpTotal": 100,
  "theory": {
    "title": "LA CLAUSOLA WHERE",
    "introduction": "La clausola WHERE permette di filtrare i risultati di una query SELECT in base a condizioni specifiche. È fondamentale per lavorare con sottoinsiemi di dati.",
    "sections": [
      {
        "subtitle": "Sintassi Base",
        "code": "SELECT colonne FROM tabella WHERE condizione;",
        "explanation": "WHERE viene sempre dopo FROM e prima di altre clausole come ORDER BY o LIMIT."
      },
      {
        "subtitle": "Operatori di Confronto",
        "code": "=  (uguale)\n!=  (diverso)\n<  (minore)\n>  (maggiore)\n<= (minore o uguale)\n>= (maggiore o uguale)",
        "explanation": "Gli operatori di confronto permettono di comparare valori. Usa le virgolette per i valori testuali."
      },
      {
        "subtitle": "Operatori Logici",
        "code": "SELECT * FROM studenti WHERE età > 20 AND città = 'Roma';\nSELECT * FROM studenti WHERE città = 'Roma' OR città = 'Milano';",
        "explanation": "AND richiede che entrambe le condizioni siano vere. OR richiede che almeno una sia vera."
      },
      {
        "subtitle": "Pattern Matching con LIKE",
        "code": "SELECT * FROM studenti WHERE nome LIKE 'M%';\nSELECT * FROM studenti WHERE email LIKE '%@gmail.com';",
        "explanation": "LIKE permette ricerche con pattern. % rappresenta zero o più caratteri."
      }
    ],
    "keyPoints": [
      "WHERE filtra le righe prima di restituire i risultati",
      "Gli operatori logici AND/OR combinano più condizioni",
      "Usa virgolette singole per i valori testuali",
      "LIKE permette ricerche parziali con il carattere %",
      "Puoi combinare molteplici condizioni con parentesi"
    ],
    "examples": [
      {
        "description": "Studenti maggiorenni",
        "code": "SELECT * FROM studenti WHERE età >= 18;"
      },
      {
        "description": "Studenti di Roma under 25",
        "code": "SELECT nome, età FROM studenti WHERE città = 'Roma' AND età < 25;"
      },
      {
        "description": "Nomi che iniziano con A o M",
        "code": "SELECT nome FROM studenti WHERE nome LIKE 'A%' OR nome LIKE 'M%';"
      }
    ]
  },
  "database": {
    "tableName": "studenti",
    "columns": ["id", "nome", "cognome", "età", "città"],
    "data": [
      { "id": 1, "nome": "Marco", "cognome": "Rossi", "età": 20, "città": "Roma" },
      { "id": 2, "nome": "Laura", "cognome": "Bianchi", "età": 22, "città": "Milano" },
      { "id": 3, "nome": "Andrea", "cognome": "Verdi", "età": 19, "città": "Roma" },
      { "id": 4, "nome": "Sofia", "cognome": "Neri", "età": 23, "città": "Napoli" },
      { "id": 5, "nome": "Matteo", "cognome": "Gialli", "età": 21, "città": "Milano" },
      { "id": 6, "nome": "Giulia", "cognome": "Blu", "età": 20, "città": "Roma" },
      { "id": 7, "nome": "Alessandro", "cognome": "Viola", "età": 24, "città": "Torino" }
    ]
  },
  "exercises": [
    {
      "id": 1,
      "title": "Filtro Semplice",
      "description": "Seleziona tutti gli studenti che hanno 20 anni. Usa l'operatore di uguaglianza.",
      "expectedResult": "2 righe (Marco e Giulia)",
      "hint": "Usa WHERE con l'operatore = per confrontare la colonna età con il valore 20",
      "solution": "SELECT * FROM studenti WHERE età = 20;",
      "validation": {
        "regex": "SELECT\\s+.*\\s+FROM\\s+studenti\\s+WHERE\\s+età\\s*=\\s*20",
        "expectedRows": 2
      },
      "xp": 20
    },
    {
      "id": 2,
      "title": "Operatore Maggiore",
      "description": "Trova tutti gli studenti con età maggiore di 21 anni.",
      "expectedResult": "3 righe (Laura, Sofia, Alessandro)",
      "hint": "L'operatore > (maggiore) permette di confrontare valori numerici",
      "solution": "SELECT * FROM studenti WHERE età > 21;",
      "validation": {
        "regex": "SELECT\\s+.*\\s+FROM\\s+studenti\\s+WHERE\\s+età\\s*>\\s*21",
        "expectedRows": 3
      },
      "xp": 20
    },
    {
      "id": 3,
      "title": "Filtro su Testo",
      "description": "Seleziona solo gli studenti che vivono a Roma. Ricorda di usare le virgolette per i valori testuali.",
      "expectedResult": "3 righe (Marco, Andrea, Giulia)",
      "hint": "Per confrontare testo usa = con il valore tra virgolette singole, esempio: città = 'Roma'",
      "solution": "SELECT * FROM studenti WHERE città = 'Roma';",
      "validation": {
        "regex": "SELECT\\s+.*\\s+FROM\\s+studenti\\s+WHERE\\s+città\\s*=\\s*['\"]Roma['\"]",
        "expectedRows": 3
      },
      "xp": 20
    },
    {
      "id": 4,
      "title": "Combinare Condizioni con AND",
      "description": "Trova gli studenti di Milano che hanno più di 20 anni. Usa l'operatore AND per combinare due condizioni.",
      "expectedResult": "2 righe (Laura e Matteo)",
      "hint": "AND richiede che entrambe le condizioni siano vere: WHERE condizione1 AND condizione2",
      "solution": "SELECT * FROM studenti WHERE città = 'Milano' AND età > 20;",
      "validation": {
        "regex": "SELECT\\s+.*\\s+FROM\\s+studenti\\s+WHERE\\s+.*città.*Milano.*AND.*età.*>.*20|.*età.*>.*20.*AND.*città.*Milano",
        "expectedRows": 2
      },
      "xp": 20
    },
    {
      "id": 5,
      "title": "Pattern Matching con LIKE",
      "description": "Seleziona gli studenti il cui nome inizia con la lettera 'M'. Usa l'operatore LIKE con il pattern 'M%'.",
      "expectedResult": "2 righe (Marco e Matteo)",
      "hint": "LIKE 'M%' trova tutti i valori che iniziano con M. Il simbolo % rappresenta qualsiasi sequenza di caratteri",
      "solution": "SELECT * FROM studenti WHERE nome LIKE 'M%';",
      "validation": {
        "regex": "SELECT\\s+.*\\s+FROM\\s+studenti\\s+WHERE\\s+nome\\s+LIKE\\s+['\"]M%['\"]",
        "expectedRows": 2
      },
      "xp": 20
    }
  ]
  }
};

// Seleziona la configurazione del livello corrente
let levelConfig = levelConfigs[getLevelNumber()];

// Database di esempio
const database = {};

// Stato del livello
let levelState = {
    completedExercises: new Set(),
    currentExercise: null,
    xp: 0
};

// Carica la configurazione del livello
async function loadLevelConfig() {
    try {
        // Supporta sia struttura singola tabella (vecchio) che multiple tabelle (nuovo)
        if (levelConfig.database.tables) {
            // Nuova struttura: array di tabelle (per JOIN)
            levelConfig.database.tables.forEach(table => {
                database[table.name.toLowerCase()] = table.data;
            });
        } else if (levelConfig.database.tableName) {
            // Vecchia struttura: tabella singola (backward compatibility)
            database[levelConfig.database.tableName.toLowerCase()] = levelConfig.database.data;
        }
        
        // Aggiorna UI
        document.getElementById('levelTitle').textContent = `LIVELLO ${levelConfig.levelId}: ${levelConfig.title}`;
        document.getElementById('levelObjective').textContent = `Obiettivo: ${levelConfig.objective}`;
        
        // Carica esercizi
        loadExercises();
        
    } catch (error) {
        console.error('Errore nel caricamento del livello:', error);
        showError('Impossibile caricare la configurazione del livello');
    }
}

// Carica gli esercizi dinamicamente
function loadExercises() {
    const container = document.getElementById('exercisesList');
    container.innerHTML = '';
    
    levelConfig.exercises.forEach(exercise => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercise-item';
        exerciseDiv.setAttribute('data-exercise', exercise.id);
        
        exerciseDiv.innerHTML = `
            <div class="exercise-header">
                <span class="exercise-number">ESERCIZIO ${exercise.id}</span>
                <span class="exercise-status pending">DA FARE</span>
            </div>
            <p class="exercise-description">${exercise.description}</p>
            <div class="exercise-expected">Risultato atteso: ${exercise.expectedResult}</div>
            <button class="hint-button" onclick="toggleHint(${exercise.id})">Suggerimento</button>
            <div class="exercise-hint" id="hint-${exercise.id}" style="display: none;">${exercise.hint}</div>
        `;
        
        container.appendChild(exerciseDiv);
    });
}

// Apri popup teoria
function openTheoryPopup() {
    if (!levelConfig) return;
    
    const theory = levelConfig.theory;
    let content = `
        <div class="theory-intro">
            <h3>${theory.title}</h3>
            <p>${theory.introduction}</p>
        </div>
    `;
    
    // Sezioni teoria
    theory.sections.forEach(section => {
        content += `
            <div class="theory-block">
                <h4 class="theory-subtitle">${section.subtitle}</h4>
                <code class="code-example">${section.code}</code>
                <p class="theory-text">${section.explanation}</p>
            </div>
        `;
    });
    
    // Punti chiave
    if (theory.keyPoints && theory.keyPoints.length > 0) {
        content += `<div class="theory-keypoints"><h4>Punti Chiave:</h4><ul>`;
        theory.keyPoints.forEach(point => {
            content += `<li>${point}</li>`;
        });
        content += `</ul></div>`;
    }
    
    // Esempi
    if (theory.examples && theory.examples.length > 0) {
        content += `<div class="theory-examples"><h4>Esempi Pratici:</h4>`;
        theory.examples.forEach(example => {
            content += `
                <div class="example-item">
                    <p class="example-desc">${example.description}</p>
                    <code class="code-example">${example.code}</code>
                </div>
            `;
        });
        content += `</div>`;
    }
    
    document.getElementById('theoryContent').innerHTML = content;
    document.getElementById('theoryPopup').style.display = 'flex';
}

// Chiudi popup teoria
function closeTheoryPopup() {
    document.getElementById('theoryPopup').style.display = 'none';
}

// Esegue la query SQL
function executeQuery() {
    const queryInput = document.querySelector('.sql-input');
    const query = queryInput.value.trim();
    
    if (!query) {
        showError('Inserisci una query SQL prima di eseguire.');
        return;
    }

    try {
        const result = parseAndExecuteSQL(query);
        displayResult(result);
        checkSolution(query, result);
    } catch (error) {
        showError(error.message);
    }
}

// Parser SQL completo e funzionante
function parseAndExecuteSQL(query) {
    // Rimuovi punto e virgola finale e normalizza spazi
    query = query.replace(/;?\s*$/, '').trim().replace(/\s+/g, ' ');
    
    // Estrai le varie clausole della query
    const parsed = parseQuery(query);
    
    // Verifica che la tabella esista
    if (!database[parsed.table.toLowerCase()]) {
        throw new Error(`Tabella '${parsed.table}' non trovata nel database`);
    }
    
    let data = [...database[parsed.table.toLowerCase()]];
    
    if (data.length === 0) {
        throw new Error('La tabella è vuota');
    }
    
    // Applica JOIN se presente
    if (parsed.joins && parsed.joins.length > 0) {
        for (const join of parsed.joins) {
            const rightTableName = join.table.toLowerCase();
            
            // Verifica che la tabella joinata esista
            if (!database[rightTableName]) {
                throw new Error(`Tabella '${join.table}' non trovata nel database`);
            }
            
            const rightTable = database[rightTableName];
            data = executeJoin(data, rightTable, join.condition);
        }
    }
    
    // Applica WHERE
    if (parsed.where) {
        data = data.filter(row => evaluateWhere(row, parsed.where));
    }
    
    // Determina le colonne da selezionare
    let selectedColumns;
    let isAggregate = false;
    let aggregateFunctions = [];
    
    if (parsed.columns === '*') {
        selectedColumns = Object.keys(data[0]);
    } else {
        // Gestisci funzioni aggregate (COUNT, SUM, AVG, MAX, MIN)
        const columnExprs = parsed.columns.split(',').map(c => c.trim());
        selectedColumns = [];
        
        columnExprs.forEach(expr => {
            const aggMatch = expr.match(/^(COUNT|SUM|AVG|MAX|MIN)\s*\(\s*(\*|[a-zA-ZÀ-ÿ_][a-zA-ZÀ-ÿ0-9_]*)\s*\)(?:\s+AS\s+([a-zA-ZÀ-ÿ_][a-zA-ZÀ-ÿ0-9_]*))?$/i);
            if (aggMatch) {
                isAggregate = true;
                const [, func, col, alias] = aggMatch;
                aggregateFunctions.push({
                    function: func.toUpperCase(),
                    column: col,
                    alias: alias || `${func}(${col})`
                });
                selectedColumns.push(alias || `${func}(${col})`);
            } else {
                // Verifica che la colonna esista (supporta namespace tabella.colonna)
                const colName = expr.replace(/\s+AS\s+[a-zA-ZÀ-ÿ_][a-zA-ZÀ-ÿ0-9_]*$/i, '').trim();
                if (data[0] && !(colName in data[0])) {
                    throw new Error(`Colonna '${colName}' non trovata nella tabella`);
                }
                selectedColumns.push(colName);
            }
        });
    }
    
    // Applica GROUP BY
    if (parsed.groupBy) {
        data = applyGroupBy(data, parsed.groupBy, aggregateFunctions);
    } else if (isAggregate) {
        // Aggregazione senza GROUP BY (una sola riga risultato)
        data = [applyAggregates(data, aggregateFunctions)];
    }
    
    // Proietta le colonne (se non è aggregazione)
    if (!isAggregate || parsed.groupBy) {
        if (!isAggregate) {
            const finalColumns = selectedColumns;
            data = data.map(row => {
                const newRow = {};
                finalColumns.forEach(col => {
                    newRow[col] = row[col];
                });
                return newRow;
            });
        }
    }
    
    // Applica DISTINCT
    if (parsed.distinct && !isAggregate) {
        data = removeDuplicates(data);
    }
    
    // Applica ORDER BY
    if (parsed.orderBy) {
        data = applyOrderBy(data, parsed.orderBy);
    }
    
    // Applica LIMIT
    if (parsed.limit) {
        data = data.slice(0, parsed.limit);
    }
    
    return {
        columns: selectedColumns,
        rows: data,
        isDistinct: parsed.distinct
    };
}

// Parser della query SQL
function parseQuery(query) {
    const result = {
        distinct: false,
        columns: null,
        table: null,
        joins: [],  // Supporto JOIN
        where: null,
        groupBy: null,
        having: null,
        orderBy: null,
        limit: null
    };
    
    // SELECT con DISTINCT
    const selectMatch = query.match(/SELECT\s+(DISTINCT\s+)?(.*?)\s+FROM\s+(\w+)/i);
    if (!selectMatch) {
        throw new Error('Sintassi non valida. Usa: SELECT colonne FROM tabella');
    }
    
    result.distinct = !!selectMatch[1];
    result.columns = selectMatch[2].trim();
    result.table = selectMatch[3];
    
    // JOIN (supporta INNER JOIN e JOIN semplice)
    const joinPattern = /(?:INNER\s+)?JOIN\s+(\w+)\s+ON\s+(.+?)(?:\s+(?:INNER\s+)?JOIN|\s+WHERE|\s+GROUP\s+BY|\s+ORDER\s+BY|\s+LIMIT|$)/gi;
    let joinMatch;
    while ((joinMatch = joinPattern.exec(query)) !== null) {
        result.joins.push({
            table: joinMatch[1],
            condition: joinMatch[2].trim()
        });
    }
    
    // WHERE
    const whereMatch = query.match(/WHERE\s+(.+?)(?:\s+GROUP\s+BY|\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (whereMatch) {
        result.where = whereMatch[1].trim();
    }
    
    // GROUP BY
    const groupMatch = query.match(/GROUP\s+BY\s+(.+?)(?:\s+HAVING|\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (groupMatch) {
        result.groupBy = groupMatch[1].trim().split(',').map(c => c.trim());
    }
    
    // HAVING
    const havingMatch = query.match(/HAVING\s+(.+?)(?:\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (havingMatch) {
        result.having = havingMatch[1].trim();
    }
    
    // ORDER BY
    const orderMatch = query.match(/ORDER\s+BY\s+(.+?)(?:\s+LIMIT|$)/i);
    if (orderMatch) {
        result.orderBy = parseOrderBy(orderMatch[1].trim());
    }
    
    // LIMIT
    const limitMatch = query.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
        result.limit = parseInt(limitMatch[1]);
    }
    
    return result;
}

// Parse ORDER BY
function parseOrderBy(orderStr) {
    const orders = orderStr.split(',').map(o => o.trim());
    return orders.map(order => {
        const match = order.match(/^([a-zA-ZÀ-ÿ_][a-zA-ZÀ-ÿ0-9_]*)(?:\s+(ASC|DESC))?$/i);
        if (!match) {
            throw new Error(`ORDER BY non valido: ${order}`);
        }
        return {
            column: match[1],
            direction: match[2] ? match[2].toUpperCase() : 'ASC'
        };
    });
}

// Applica ORDER BY
function applyOrderBy(data, orderBy) {
    return data.sort((a, b) => {
        for (const order of orderBy) {
            const col = order.column;
            if (!(col in a) || !(col in b)) {
                throw new Error(`Colonna '${col}' non trovata per ORDER BY`);
            }
            
            let aVal = a[col];
            let bVal = b[col];
            
            // Confronto
            let comparison = 0;
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                comparison = aVal - bVal;
            } else {
                aVal = String(aVal).toLowerCase();
                bVal = String(bVal).toLowerCase();
                comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            }
            
            if (comparison !== 0) {
                return order.direction === 'DESC' ? -comparison : comparison;
            }
        }
        return 0;
    });
}

// Applica funzioni aggregate
function applyAggregates(data, aggregateFunctions) {
    const result = {};
    
    aggregateFunctions.forEach(agg => {
        const values = data.map(row => row[agg.column]).filter(v => v != null);
        
        switch (agg.function) {
            case 'COUNT':
                result[agg.alias] = agg.column === '*' ? data.length : values.length;
                break;
            case 'SUM':
                result[agg.alias] = values.reduce((sum, val) => sum + Number(val), 0);
                break;
            case 'AVG':
                result[agg.alias] = values.length > 0 
                    ? values.reduce((sum, val) => sum + Number(val), 0) / values.length 
                    : 0;
                break;
            case 'MAX':
                result[agg.alias] = Math.max(...values.map(Number));
                break;
            case 'MIN':
                result[agg.alias] = Math.min(...values.map(Number));
                break;
        }
    });
    
    return result;
}

// Applica GROUP BY
function applyGroupBy(data, groupColumns, aggregateFunctions) {
    const groups = new Map();
    
    // Raggruppa i dati
    data.forEach(row => {
        const key = groupColumns.map(col => row[col]).join('|');
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(row);
    });
    
    // Applica aggregazioni per ogni gruppo
    const result = [];
    groups.forEach((groupData, key) => {
        const row = {};
        
        // Aggiungi colonne di raggruppamento
        groupColumns.forEach((col, idx) => {
            row[col] = groupData[0][col];
        });
        
        // Applica funzioni aggregate
        const aggResult = applyAggregates(groupData, aggregateFunctions);
        Object.assign(row, aggResult);
        
        result.push(row);
    });
    
    return result;
}

// Rimuove duplicati per DISTINCT
function removeDuplicates(data) {
    const seen = new Set();
    return data.filter(row => {
        const key = JSON.stringify(row);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

// Esegue un JOIN tra due tabelle (nested loop join)
function executeJoin(leftTable, rightTable, joinCondition) {
    const result = [];
    
    // Pattern per supportare caratteri accentati nei nomi
    const colPattern = '[a-zA-ZÀ-ÿ_][a-zA-ZÀ-ÿ0-9_]*';
    
    // Parse della condizione JOIN (es: "studenti.corso_id = corsi.id")
    const conditionMatch = joinCondition.match(new RegExp(`(${colPattern})\\.(${colPattern})\\s*=\\s*(${colPattern})\\.(${colPattern})`));
    if (!conditionMatch) {
        throw new Error(`Condizione JOIN non valida: ${joinCondition}`);
    }
    
    const [, leftTableName, leftColumn, rightTableName, rightColumn] = conditionMatch;
    
    // Nested loop join
    leftTable.forEach(leftRow => {
        rightTable.forEach(rightRow => {
            if (leftRow[leftColumn] === rightRow[rightColumn]) {
                // Merge delle righe con namespace per evitare conflitti
                const mergedRow = {};
                
                // Aggiungi colonne dalla tabella sinistra
                Object.keys(leftRow).forEach(col => {
                    mergedRow[col] = leftRow[col];
                    mergedRow[`${leftTableName}.${col}`] = leftRow[col];
                });
                
                // Aggiungi colonne dalla tabella destra
                Object.keys(rightRow).forEach(col => {
                    // Se la colonna esiste già, usa il namespace
                    if (mergedRow[col] !== undefined && mergedRow[col] !== rightRow[col]) {
                        mergedRow[`${rightTableName}.${col}`] = rightRow[col];
                    } else {
                        mergedRow[col] = rightRow[col];
                        mergedRow[`${rightTableName}.${col}`] = rightRow[col];
                    }
                });
                
                result.push(mergedRow);
            }
        });
    });
    
    return result;
}

// Valuta una clausola WHERE completa
function evaluateWhere(row, whereClause) {
    // Gestisci operatori logici AND/OR
    if (/\sAND\s/i.test(whereClause)) {
        const conditions = whereClause.split(/\sAND\s/i);
        return conditions.every(cond => evaluateCondition(row, cond.trim()));
    }
    
    if (/\sOR\s/i.test(whereClause)) {
        const conditions = whereClause.split(/\sOR\s/i);
        return conditions.some(cond => evaluateCondition(row, cond.trim()));
    }
    
    return evaluateCondition(row, whereClause);
}

// Valuta una singola condizione
function evaluateCondition(row, condition) {
    // Pattern per nomi di colonna che supporta caratteri accentati
    const colPattern = '[a-zA-ZÀ-ÿ_][a-zA-ZÀ-ÿ0-9_]*';
    
    // BETWEEN
    const betweenMatch = condition.match(new RegExp(`(${colPattern})\\s+BETWEEN\\s+(.+?)\\s+AND\\s+(.+)`, 'i'));
    if (betweenMatch) {
        const [, col, val1, val2] = betweenMatch;
        const rowVal = row[col];
        const v1 = parseValue(val1);
        const v2 = parseValue(val2);
        return rowVal >= v1 && rowVal <= v2;
    }
    
    // IN
    const inMatch = condition.match(new RegExp(`(${colPattern})\\s+IN\\s+\\((.+?)\\)`, 'i'));
    if (inMatch) {
        const [, col, values] = inMatch;
        const rowVal = row[col];
        const valueList = values.split(',').map(v => parseValue(v.trim()));
        return valueList.includes(rowVal);
    }
    
    // LIKE
    const likeMatch = condition.match(new RegExp(`(${colPattern})\\s+LIKE\\s+(.+)`, 'i'));
    if (likeMatch) {
        const [, col, pattern] = likeMatch;
        const rowVal = String(row[col]).toLowerCase();
        const patternVal = parseValue(pattern).toLowerCase();
        const regex = new RegExp('^' + patternVal.replace(/%/g, '.*').replace(/_/g, '.') + '$');
        return regex.test(rowVal);
    }
    
    // IS NULL / IS NOT NULL
    if (/IS\s+NOT\s+NULL/i.test(condition)) {
        const col = condition.match(new RegExp(`(${colPattern})\\s+IS\\s+NOT\\s+NULL`, 'i'))[1];
        return row[col] != null;
    }
    if (/IS\s+NULL/i.test(condition)) {
        const col = condition.match(new RegExp(`(${colPattern})\\s+IS\\s+NULL`, 'i'))[1];
        return row[col] == null;
    }
    
    // Operatori di confronto: !=, <=, >=, <, >, =
    const operators = [
        { regex: new RegExp(`(${colPattern})\\s*!=\\s*(.+)`), op: (a, b) => a != b },
        { regex: new RegExp(`(${colPattern})\\s*<>\\s*(.+)`), op: (a, b) => a != b },
        { regex: new RegExp(`(${colPattern})\\s*<=\\s*(.+)`), op: (a, b) => a <= b },
        { regex: new RegExp(`(${colPattern})\\s*>=\\s*(.+)`), op: (a, b) => a >= b },
        { regex: new RegExp(`(${colPattern})\\s*<\\s*(.+)`), op: (a, b) => a < b },
        { regex: new RegExp(`(${colPattern})\\s*>\\s*(.+)`), op: (a, b) => a > b },
        { regex: new RegExp(`(${colPattern})\\s*=\\s*(.+)`), op: (a, b) => a == b }
    ];
    
    for (const { regex, op } of operators) {
        const match = condition.match(regex);
        if (match) {
            const [, col, value] = match;
            if (!(col in row)) {
                throw new Error(`Colonna '${col}' non trovata nella WHERE`);
            }
            const rowVal = row[col];
            const compareVal = parseValue(value.trim());
            return op(rowVal, compareVal);
        }
    }
    
    throw new Error(`Condizione WHERE non valida: ${condition}`);
}

// Parse dei valori nelle condizioni
function parseValue(value) {
    // Rimuovi spazi
    value = value.trim();
    
    // Stringa tra apici
    if ((value.startsWith("'") && value.endsWith("'")) || 
        (value.startsWith('"') && value.endsWith('"'))) {
        return value.slice(1, -1);
    }
    
    // Numero
    if (!isNaN(value)) {
        return Number(value);
    }
    
    // Boolean
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
    if (value.toLowerCase() === 'null') return null;
    
    // Altrimenti ritorna come stringa
    return value;
}

// Mostra il risultato
function displayResult(result) {
    const output = document.getElementById('queryOutput');
    
    if (result.rows.length === 0) {
        output.innerHTML = '<div class="output-placeholder">Nessun risultato trovato.</div>';
        return;
    }
    
    let html = '<table class="output-table"><thead><tr>';
    
    // Header
    result.columns.forEach(col => {
        html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    // Righe
    result.rows.forEach(row => {
        html += '<tr>';
        result.columns.forEach(col => {
            html += `<td>${row[col]}</td>`;
        });
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    output.innerHTML = html;
}

// Mostra errore
function showError(message) {
    const output = document.getElementById('queryOutput');
    output.innerHTML = `
        <div class="output-error">
            <strong>ERRORE:</strong><br>
            ${message}
        </div>
    `;
}

// Verifica se la soluzione è corretta
function checkSolution(query, result) {
    if (!levelConfig) return;
    
    for (const exercise of levelConfig.exercises) {
        if (levelState.completedExercises.has(exercise.id)) {
            continue; // Già completato
        }
        
        const validation = exercise.validation;
        const regex = new RegExp(validation.regex, 'i');
        
        if (regex.test(query)) {
            // Verifica colonne (se specificato)
            let columnsMatch = true;
            if (validation.expectedColumns) {
                columnsMatch = JSON.stringify(result.columns.sort()) === 
                               JSON.stringify(validation.expectedColumns.sort());
            }
            
            // Verifica numero righe (se specificato)
            const rowsMatch = !validation.expectedRows || 
                             result.rows.length === validation.expectedRows ||
                             (validation.distinct && result.rows.length > 0);
            
            if (columnsMatch && rowsMatch) {
                markExerciseComplete(exercise.id, exercise.xp);
                return;
            }
        }
    }
}

// Marca un esercizio come completato
function markExerciseComplete(exerciseNum, xpReward) {
    if (levelState.completedExercises.has(exerciseNum)) {
        return;
    }
    
    levelState.completedExercises.add(exerciseNum);
    levelState.xp += xpReward;
    
    // Aggiorna UI dell'esercizio
    const exerciseItem = document.querySelector(`[data-exercise="${exerciseNum}"]`);
    const statusBadge = exerciseItem.querySelector('.exercise-status');
    statusBadge.textContent = 'COMPLETATO';
    statusBadge.classList.remove('pending');
    statusBadge.classList.add('completed');
    
    // Mostra feedback
    showFeedback(`Esercizio ${exerciseNum} completato! +${xpReward} XP`);
    
    // Aggiorna contatori
    updateProgress();
    
    // Salva progresso
    saveProgress();
}

// Mostra feedback positivo
function showFeedback(message) {
    const feedback = document.getElementById('feedback');
    const feedbackText = feedback.querySelector('.feedback-text');
    feedbackText.textContent = message;
    
    feedback.style.display = 'block';
    
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
}

// Aggiorna il progresso
function updateProgress() {
    if (!levelConfig) return;
    
    const completed = levelState.completedExercises.size;
    const total = levelConfig.exercises.length;
    
    // Aggiorna header
    document.querySelector('.progress-number').textContent = `${completed}/${total}`;
    document.querySelector('.system-info').textContent = `LVL_0${levelConfig.levelId} | XP: ${levelState.xp}/${levelConfig.xpTotal}`;
    
    // Aggiorna footer
    document.getElementById('completedCount').textContent = `${completed}/${total}`;
    
    // Abilita pulsante prossimo livello se completato
    if (completed === total) {
        document.getElementById('nextButton').disabled = false;
        showLevelComplete();
    }
}

// Mostra messaggio di livello completato
function showLevelComplete() {
    setTimeout(() => {
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
                border: 3px solid #00ff00;
                padding: 50px;
                background: #0a0a0a;
                box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
                max-width: 600px;
                text-align: center;
            ">
                <div style="color: #00ff00; font-size: 32px; margin-bottom: 20px; letter-spacing: 3px; text-shadow: 0 0 20px #00ff00;">
                    LIVELLO COMPLETATO!
                </div>
                <div style="color: #e0e0e0; font-size${levelConfig ? levelConfig.xpTotal : 100}8px; line-height: 1.8; margin-bottom: 30px;">
                    Hai completato tutti gli esercizi!<br>
                    <strong style="color: #00ff00;">+100 XP</strong>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: transparent;
                    border: 2px solid #00ff00;
                    color: #00ff00;
                    padding: 15px 40px;
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 16px;
                    cursor: pointer;
                    letter-spacing: 2px;
                    transition: all 0.3s;
                    text-shadow: 0 0 10px #00ff00;
                " onmouseover="this.style.background='#00ff00'; this.style.color='#0a0a0a'" 
                   onmouseout="this.style.background='transparent'; this.style.color='#00ff00'">
                    [ CONTINUA ]
                </button>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }, 500);
}

// Pulisce la console
function clearConsole() {
    document.querySelector('.sql-input').value = '';
    document.getElementById('queryOutput').innerHTML = 
        '<div class="output-placeholder">Nessun risultato. Esegui una query per visualizzare i dati.</div>';
}

// Mostra/nascondi suggerimento
function toggleHint(exerciseNum) {
    const hint = document.getElementById(`hint-${exerciseNum}`);
    const button = event.target;
    
    if (hint.style.display === 'none') {
        hint.style.display = 'block';
        button.textContent = 'Nascondi Suggerimento';
        button.classList.add('active');
    } else {
        hint.style.display = 'none';
        button.textContent = 'Suggerimento';
        button.classList.remove('active');
    }
}

// Navigazione
function goBackToLevels() {
    window.location.href = 'levels.html';
}

function nextLevel() {
    const currentLevel = getLevelNumber();
    const nextLevelNum = currentLevel + 1;
    
    // Verifica se il livello successivo esiste
    if (levelConfigs[nextLevelNum]) {
        window.location.href = `level${nextLevelNum}.html`;
    } else {
        // Se non ci sono più livelli, torna alla selezione
        window.location.href = 'levels.html';
    }
}

// Salva progresso
function saveProgress() {
    if (!levelConfig) return;
    
    const progress = {
        level: levelConfig.levelId,
        completed: Array.from(levelState.completedExercises),
        xp: levelState.xp
    };
    localStorage.setItem(`easysql_level${levelConfig.levelId}`, JSON.stringify(progress));
    
    // Aggiorna progresso globale
    const globalProgress = JSON.parse(localStorage.getItem('easysql_progress') || '{}');
    if (!globalProgress.completedLevels) globalProgress.completedLevels = [];
    if (!globalProgress.unlockedLevels) globalProgress.unlockedLevels = [1];
    if (!globalProgress.levelProgress) globalProgress.levelProgress = {};
    
    // Aggiorna progresso esercizi per questo livello
    globalProgress.levelProgress[levelConfig.levelId] = {
        completed: levelState.completedExercises.size,
        total: levelConfig.exercises.length
    };
    
    // Calcola XP totale sommando l'XP di tutti i livelli salvati
    let totalXP = 0;
    for (let i = 1; i <= 6; i++) {
        const levelData = localStorage.getItem(`easysql_level${i}`);
        if (levelData) {
            const data = JSON.parse(levelData);
            totalXP += data.xp || 0;
        }
    }
    globalProgress.xp = totalXP;
    
    // Segna livello come completato se tutti gli esercizi sono fatti
    const isLevelComplete = levelState.completedExercises.size === levelConfig.exercises.length;
    if (isLevelComplete) {
        if (!globalProgress.completedLevels.includes(levelConfig.levelId)) {
            globalProgress.completedLevels.push(levelConfig.levelId);
        }
        if (!globalProgress.unlockedLevels.includes(levelConfig.levelId + 1)) {
            globalProgress.unlockedLevels.push(levelConfig.levelId + 1);
        }
    }
    
    localStorage.setItem('easysql_progress', JSON.stringify(globalProgress));
}

// Carica progresso
function loadProgress() {
    if (!levelConfig) return;
    
    const saved = localStorage.getItem(`easysql_level${levelConfig.levelId}`);
    if (saved) {
        const progress = JSON.parse(saved);
        levelState.completedExercises = new Set(progress.completed);
        levelState.xp = progress.xp;
        
        // Aggiorna UI
        progress.completed.forEach(num => {
            const exerciseItem = document.querySelector(`[data-exercise="${num}"]`);
            if (exerciseItem) {
                const statusBadge = exerciseItem.querySelector('.exercise-status');
                statusBadge.textContent = 'COMPLETATO';
                statusBadge.classList.remove('pending');
                statusBadge.classList.add('completed');
            }
        });
        
        updateProgress();
    }
}

// Shortcut: CTRL+Enter per eseguire
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        executeQuery();
    }
    if (e.key === 'Escape') {
        goBackToLevels();
    }
});

// Caricamento
window.addEventListener('load', async () => {
    console.log('%c ═══ LEVEL SYSTEM LOADING ═══ ', 'background: #ffffff; color: #0a0a0a; font-size: 14px; font-weight: bold; padding: 8px;');
    
    await loadLevelConfig();
    loadProgress();
});
