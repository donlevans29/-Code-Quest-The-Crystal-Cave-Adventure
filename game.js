let gameState = {
    level: 1,
    crystals: 0,
    concepts: 0,
    progress: 0
};

const levels = [
    {
        title: "The Village Elder's Request",
        story: "🏘️ You are a young apprentice in the village of Codehaven. The village elder approaches you with urgent news: 'The magical crystals that power our village are hidden in the Crystal Cave, but they're protected by ancient coding puzzles! We need someone brave and clever to retrieve them.'",
        concept: "Variables",
        challenge: "To begin your quest, you must learn about VARIABLES - magical containers that store information. Create a variable called 'heroName' and store your character's name in it.",
        codeTemplate: "// Create a variable to store your hero's name\n// Use: let variableName = 'value';\n\n",
        solution: "let heroName = 'Alex';",
        hint: "Variables are like labeled boxes that store values. Use 'let' followed by a name, then '=' and the value in quotes.",
        explanation: "🎉 Excellent! You've learned about VARIABLES! Variables are containers that store data values. In programming, we use them to remember information we'll need later."
    },
    {
        title: "The Cave Entrance",
        story: "🌑 You arrive at the mysterious Crystal Cave. Ancient runes glow on the entrance, showing a riddle: 'Only those who can make decisions may enter.' You realize this is about conditional thinking!",
        concept: "Conditionals (If Statements)",
        challenge: "The cave door will only open if you have the courage to enter. Write an IF statement that checks if your 'courage' level is greater than 5. If it is, set 'doorOpen' to true.",
        codeTemplate: "let courage = 8;\nlet doorOpen = false;\n\n// Write an if statement here\n// if (condition) {\n//     doorOpen = true;\n// }\n\n",
        solution: "if (courage > 5) {\n    doorOpen = true;\n}",
        hint: "Use 'if (courage > 5)' to check the condition, then set doorOpen = true inside the curly braces.",
        explanation: "🚪 The door creaks open! You've mastered CONDITIONALS! If statements let your program make decisions based on conditions, just like how you make choices in real life."
    },
    {
        title: "The Crystal Chamber",
        story: "✨ Inside the cave, you find a chamber with 5 glowing crystals! But they're scattered and need to be collected one by one. This seems like a job for repetition...",
        concept: "Loops",
        challenge: "You need to collect all 5 crystals. Write a FOR LOOP that runs 5 times and adds 1 crystal to your collection each time.",
        codeTemplate: "let crystalsCollected = 0;\n\n// Write a for loop that runs 5 times\n// for (let i = 0; i < 5; i++) {\n//     crystalsCollected++;\n// }\n\n",
        solution: "for (let i = 0; i < 5; i++) {\n    crystalsCollected++;\n}",
        hint: "A for loop has three parts: initialization (let i = 0), condition (i < 5), and increment (i++). Use crystalsCollected++ to add one each time.",
        explanation: "💎 Amazing! You've collected all the crystals using a LOOP! Loops let you repeat actions efficiently instead of writing the same code over and over."
    },
    {
        title: "The Guardian's Challenge",
        story: "🐉 Suddenly, a friendly dragon appears! 'Well done, young coder! But to prove you're worthy of these crystals, show me you can organize information. Create a function that calculates the total power of crystals!'",
        concept: "Functions",
        challenge: "Create a function called 'calculatePower' that takes a number of crystals as input and returns their total power (each crystal has 10 power units).",
        codeTemplate: "// Create a function that calculates crystal power\n// function functionName(parameter) {\n//     return parameter * 10;\n// }\n\n",
        solution: "function calculatePower(crystals) {\n    return crystals * 10;\n}",
        hint: "Functions are like recipes. Define it with 'function calculatePower(crystals)' and return crystals * 10 inside the curly braces.",
        explanation: "🔮 Magnificent! You've created a FUNCTION! Functions are reusable blocks of code that perform specific tasks. They're like having a magical spell you can cast whenever needed!"
    },
    {
        title: "Return to the Village",
        story: "🎊 You return to Codehaven as a hero! The village elder is amazed: 'You've not only brought back the crystals but also learned the four fundamental concepts of programming: Variables, Conditionals, Loops, and Functions! You are now a true Code Warrior!'",
        concept: "Completion",
        challenge: "Congratulations! You've completed your coding adventure! You've learned the building blocks that power all programming languages.",
        codeTemplate: "// You are now a Code Warrior!\n// Your journey in programming has just begun!",
        solution: "complete",
        hint: "Click 'Complete Quest' to finish your adventure!",
        explanation: "🏆 QUEST COMPLETE! You've mastered the fundamental concepts of programming through your epic adventure. These concepts are the foundation of all coding - use them wisely on your continued journey!"
    }
];

function updateStats() {
    document.getElementById('level').textContent = gameState.level;
    document.getElementById('crystals').textContent = gameState.crystals;
    document.getElementById('concepts').textContent = gameState.concepts;
    document.getElementById('progressFill').style.width = gameState.progress + '%';
}

function loadLevel(levelIndex) {
    const level = levels[levelIndex];
    const content = document.getElementById('gameContent');
    
    content.innerHTML = `
        <div class="story-section">
            <h2>📖 ${level.title}</h2>
            <p class="story-text">${level.story}</p>
        </div>
        
        <div class="challenge-section">
            <h3>🎯 Challenge: ${level.concept}</h3>
            <p>${level.challenge}</p>
            
            <div class="code-editor">
                <div style="color: #4a5568; margin-bottom: 10px;">💻 Code Editor:</div>
                <textarea class="code-input" id="codeInput" rows="6">${level.codeTemplate}</textarea>
            </div>
            
            <div class="hint-box hidden" id="hintBox">
                <strong>💡 Hint:</strong> ${level.hint}
            </div>
            
            <div id="feedback"></div>
            
            <button class="btn btn-primary" onclick="checkCode()">✨ Cast Spell (Run Code)</button>
            <button class="btn btn-secondary" onclick="showHint()">🔍 Show Hint</button>
            ${levelIndex < levels.length - 1 ? '<button class="btn btn-primary" id="nextBtn" onclick="nextLevel()" style="display: none;">➡️ Continue Adventure</button>' : '<button class="btn btn-primary" id="nextBtn" onclick="completeQuest()" style="display: none;">🏆 Complete Quest</button>'}
        </div>
    `;
}

function showHint() {
    document.getElementById('hintBox').classList.remove('hidden');
}

function checkCode() {
    const userCode = document.getElementById('codeInput').value.trim();
    const currentLevel = levels[gameState.level - 1];
    const feedback = document.getElementById('feedback');
    
    // More flexible solution checking
    let isCorrect = false;
    
    if (currentLevel.solution === 'complete') {
        isCorrect = true;
    } else {
        // Clean up code for comparison - remove comments, extra whitespace, semicolons
        const cleanUserCode = userCode
            .replace(/\/\/.*$/gm, '')  // Remove comments
            .replace(/\s+/g, ' ')      // Normalize whitespace
            .replace(/;/g, '')         // Remove semicolons
            .toLowerCase()
            .trim();
        
        const cleanSolution = currentLevel.solution
            .replace(/\s+/g, ' ')
            .replace(/;/g, '')
            .toLowerCase()
            .trim();
        
        // Check if user code contains the essential parts
        isCorrect = cleanUserCode.includes(cleanSolution) || 
                   cleanSolution.split(' ').every(word => 
                       word.length < 2 || cleanUserCode.includes(word)
                   );
    }
    
    if (isCorrect) {
        feedback.innerHTML = `
            <div class="feedback success">
                ${currentLevel.explanation}
            </div>
            <div class="concept-learned sparkle">
                <h4>🎓 Concept Mastered: ${currentLevel.concept}</h4>
                <p>You've gained valuable programming knowledge!</p>
            </div>
        `;
        
        // Update game state
        gameState.crystals += 1;
        gameState.concepts += 1;
        gameState.progress = (gameState.level / levels.length) * 100;
        
        updateStats();
        document.getElementById('nextBtn').style.display = 'inline-block';
    } else {
        feedback.innerHTML = `
            <div class="feedback error">
                🤔 Not quite right! The magic didn't work. Check your code and try again! Make sure you're following the pattern shown in the hint.
            </div>
        `;
    }
}

function nextLevel() {
    if (gameState.level < levels.length) {
        gameState.level++;
        loadLevel(gameState.level - 1);
        updateStats();
    }
}

function completeQuest() {
    const content = document.getElementById('gameContent');
    content.innerHTML = `
        <div class="story-section">
            <h2>🎊 Quest Complete!</h2>
            <p class="story-text">Congratulations, Code Warrior! You've successfully completed your journey through the Crystal Cave and learned the fundamental concepts of programming!</p>
        </div>
        
        <div class="concept-learned">
            <h3>🎓 Your Programming Arsenal:</h3>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li><strong>Variables:</strong> Store and manage data</li>
                <li><strong>Conditionals:</strong> Make decisions in your code</li>
                <li><strong>Loops:</strong> Repeat actions efficiently</li>
                <li><strong>Functions:</strong> Create reusable code blocks</li>
            </ul>
            <p>These are the building blocks of all programming languages. With these tools, you can build amazing applications, games, websites, and more!</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" onclick="restartQuest()">🔄 Start New Adventure</button>
        </div>
    `;
}

function restartQuest() {
    gameState = { level: 1, crystals: 0, concepts: 0, progress: 0 };
    loadLevel(0);
    updateStats();
}

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    loadLevel(0);
    updateStats();
});
