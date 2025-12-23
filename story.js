document.addEventListener('DOMContentLoaded', () => {
    /* --- State Management --- */
    let currentScene = 1;

    // Game 1 State (Mining)
    let isPickaxeEquipped = false;
    let brokenCount = 0;
    const TOTAL_TO_BREAK = 6;
    let isHeartRevealed = false;

    // Game 2 State (Combat)
    let isSwordEquipped = false;
    let enemiesKilled = 0;
    const TOTAL_ENEMIES = 4;
    let isHeart2Revealed = false;

    // Heart Collection
    let collectedHearts = 0;


    function goToScene(sceneNumber) {
        // Hide current
        document.querySelector(`#scene-${currentScene}`).classList.remove('active');

        // Show next
        const nextScene = document.querySelector(`#scene-${sceneNumber}`);
        if (nextScene) {
            nextScene.classList.add('active');
            currentScene = sceneNumber;
        }
    }

    /* --- Scene 1: Intro --- */
    const scene1 = document.getElementById('scene-1');
    const bgAudio = document.getElementById('bg-audio');

    // Helper to play music with fade in
    function playBackgroundMusic() {
        if (!bgAudio.paused) return; // Already playing or started

        bgAudio.volume = 0;
        bgAudio.play().then(() => {
            const bgInfo = document.getElementById('bgMusic');
            if (bgInfo) {
                bgInfo.style.color = '#00ff00';
                bgInfo.textContent = '🎵 Music Playing...';
            }
            // Fade In
            let vol = 0;
            const fadeId = setInterval(() => {
                if (vol < 1) {
                    vol += 0.05;
                    bgAudio.volume = Math.min(vol, 1);
                } else {
                    clearInterval(fadeId);
                }
            }, 200);
        }).catch(e => console.log("Audio autoplay prevented, waiting for interaction"));
    }

    // Attempt Auto-Play immediately
    playBackgroundMusic();

    scene1.addEventListener('click', () => {
        // Ensure music starts if autoplay failed
        playBackgroundMusic();

        // nice visual feedback
        const p = scene1.querySelector('p');
        if (p) p.textContent = "Beginning our journey...";

        // Delay transition so music is heard during "Special Journey" phase
        setTimeout(() => {
            goToScene(2);
        }, 3000);
    });

    /* --- Scene 2: Mini-Games --- */
    const pickaxeTool = document.querySelector('.tools-container'); // First one is pickaxe
    const swordTool = document.getElementById('tool-slot-sword');

    const miningGrid = document.getElementById('mining-grid');
    const gameInstruction = document.getElementById('game-instruction');
    const gameSubtext = document.getElementById('game-subtext');

    // Prevent default context menu on Scene 2
    const scene2 = document.getElementById('scene-2');
    scene2.addEventListener('contextmenu', (e) => e.preventDefault());

    // Tool Cursors
    const toolCursor = document.createElement('div');
    toolCursor.id = 'tool-cursor';
    document.body.appendChild(toolCursor);

    const swordCursor = document.createElement('div');
    swordCursor.id = 'sword-cursor';
    document.body.appendChild(swordCursor);

    // Track Cursor
    document.addEventListener('mousemove', (e) => {
        if (isPickaxeEquipped) {
            toolCursor.style.left = e.clientX + 'px';
            toolCursor.style.top = e.clientY + 'px';
        }
        if (isSwordEquipped) {
            swordCursor.style.left = e.clientX + 'px';
            swordCursor.style.top = e.clientY + 'px';
        }
    });

    // 1. Initialize Grid
    const textures = ['assets/stone.jpg', 'assets/cobblestone.jpeg'];
    function initGrid() {
        miningGrid.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const block = document.createElement('div');
            block.classList.add('stone-block');
            const texture = textures[Math.floor(Math.random() * textures.length)];
            block.style.backgroundImage = `url('${texture}')`;

            block.addEventListener('click', (e) => {
                mineBlock(block);
            });
            // Prevent context menu on blocks so it feels smoother if user misclicks
            block.addEventListener('contextmenu', (e) => e.preventDefault());
            miningGrid.appendChild(block);
        }
    }
    initGrid();

    // 2. Equip Logic (Right Click to Equip/Unequip)
    function handleToolRightClick(e, toolType) {
        e.preventDefault();

        if (toolType === 'pickaxe') {
            if (isPickaxeEquipped) {
                unequipPickaxe();
                gameSubtext.textContent = "Equip a tool!";
            } else {
                unequipSword(); // Only one tool at a time
                equipPickaxe();
            }
        } else if (toolType === 'sword') {
            if (isSwordEquipped) {
                unequipSword();
                gameSubtext.textContent = "Equip a tool!";
            } else {
                unequipPickaxe();
                equipSword();
            }
        }
    }

    pickaxeTool.addEventListener('contextmenu', (e) => handleToolRightClick(e, 'pickaxe'));
    swordTool.addEventListener('contextmenu', (e) => handleToolRightClick(e, 'sword'));

    // Disable default left click on tools to avoid confusion or use it for hint
    // pickaxeTool.addEventListener('click', () => gameSubtext.textContent = "Right-click to equip!");
    // swordTool.addEventListener('click', () => gameSubtext.textContent = "Right-click to equip!");

    function equipPickaxe() {
        isPickaxeEquipped = true;
        pickaxeTool.classList.add('equipped');
        pickaxeTool.style.opacity = '0.5';
        toolCursor.style.display = 'block';
        gameSubtext.textContent = "Left-click on the wall to mine!";
    }

    function equipSword() {
        isSwordEquipped = true;
        swordTool.classList.add('equipped');
        swordTool.style.opacity = '0.5';
        swordCursor.style.display = 'block';
        gameSubtext.textContent = "Left-click enemies to attack!";
    }

    function unequipPickaxe() {
        isPickaxeEquipped = false;
        pickaxeTool.classList.remove('equipped');
        pickaxeTool.style.opacity = '1';
        toolCursor.style.display = 'none';
    }

    function unequipSword() {
        isSwordEquipped = false;
        swordTool.classList.remove('equipped');
        swordTool.style.opacity = '1';
        swordCursor.style.display = 'none';
    }


    // 3. Mine Logic (Left Click to Use)
    function mineBlock(block) {
        if (!isPickaxeEquipped) return;
        if (block.classList.contains('broken')) return;

        toolCursor.classList.remove('mining-action');
        void toolCursor.offsetWidth;
        toolCursor.classList.add('mining-action');

        block.classList.add('broken');
        brokenCount++;

        if (brokenCount >= TOTAL_TO_BREAK && !isHeartRevealed) {
            revealHeart1();
        }
    }

    function revealHeart1() {
        isHeartRevealed = true;
        const heart = document.getElementById('draggable-heart');
        heart.classList.remove('buried');
        heart.classList.add('revealed');
        heart.setAttribute('draggable', 'true');
        checkCompletionText();
    }

    // 4. Combat Logic
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy => {
        enemy.addEventListener('click', () => {
            if (!isSwordEquipped) return;
            if (enemy.classList.contains('dead')) return;

            // Animate Sword
            swordCursor.classList.remove('slash');
            void swordCursor.offsetWidth;
            swordCursor.classList.add('slash');

            // Kill Enemy
            enemy.classList.add('dead');
            enemiesKilled++;

            if (enemiesKilled >= TOTAL_ENEMIES && !isHeart2Revealed) {
                revealHeart2();
            }
        });
    });

    function revealHeart2() {
        isHeart2Revealed = true;
        const heart2 = document.getElementById('draggable-heart-2');
        heart2.classList.remove('buried');
        heart2.classList.add('revealed');
        heart2.setAttribute('draggable', 'true');
        checkCompletionText();
    }

    function checkCompletionText() {
        if (isHeartRevealed || isHeart2Revealed) {
            gameInstruction.textContent = "Great job!";
            gameSubtext.textContent = "Drag the heart(s) to the letter!";
        }
    }


    // 5. Drag Logic (Generic for both hearts)
    const envelope = document.getElementById('target-envelope');

    // Bind Start to both hearts
    const hearts = [document.getElementById('draggable-heart'), document.getElementById('draggable-heart-2')];

    hearts.forEach(heart => {
        heart.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', 'heart');
            e.dataTransfer.setData('sourceId', heart.id);
            setTimeout(() => heart.style.opacity = '0.5', 0);
        });

        heart.addEventListener('dragend', () => {
            heart.style.opacity = '1';
        });
    });

    envelope.addEventListener('dragover', (e) => {
        e.preventDefault();
        envelope.classList.add('highlight'); // Always highlight if hovering
    });

    envelope.addEventListener('dragleave', () => {
        envelope.classList.remove('highlight');
    });

    envelope.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        const sourceId = e.dataTransfer.getData('sourceId');

        if (data === 'heart') {
            envelope.classList.remove('highlight');

            // Hide dropped heart
            const droppedHeart = document.getElementById(sourceId);
            if (droppedHeart) droppedHeart.style.display = 'none';

            collectedHearts++;

            if (collectedHearts === 1) {
                envelope.innerHTML = '<img src="assets/heart.png" style="width:40px; height:40px;">';
                gameSubtext.textContent = "One more heart needed to unlock the letter!";
            } else if (collectedHearts >= 2) {
                envelope.innerHTML = '<div style="display:flex; gap:5px;"><img src="assets/heart.png" style="width:40px; height:40px;"><img src="assets/heart.png" style="width:40px; height:40px;"></div>';
                envelope.style.borderColor = '#ff6f61';

                // Hide tools
                unequipPickaxe();
                unequipSword();

                setTimeout(() => {
                    goToScene(3);
                    spawnFloatingMessages();
                }, 1000);
            }
        }
    });

    // Floating Messages Logic
    const messages = [
        "Waiting for all this time for someone like you to pass me by",
        "We dance for hours in my mind, I don't wanna leave this place",
        "You know you're on my mind all day",
        "I'll be right by your side, won't ever leave",
        "Know you're my favorite girl",
        "Shine Baby shine ya my arms are always open Lemme be the one to mend your heart",
        "Remember me."
    ];

    function spawnFloatingMessages() {
        const positions = [
            { top: '15%', left: '10%' },
            { top: '10%', right: '10%' },
            { top: '45%', left: '5%' },
            { top: '50%', right: '5%' },
            { top: '80%', left: '15%' },
            { top: '75%', right: '10%' },
            { top: '85%', left: '45%' }
        ];

        let delay = 0;
        messages.forEach((msg, index) => {
            if (index >= positions.length) return;

            setTimeout(() => {
                const msgEl = document.createElement('div');
                msgEl.classList.add('floating-message');
                msgEl.textContent = msg;

                // Position
                msgEl.style.top = positions[index].top;

                if (positions[index].left) {
                    msgEl.style.left = positions[index].left;
                } else if (positions[index].right) {
                    msgEl.style.right = positions[index].right;
                    msgEl.classList.add('right-aligned');
                }

                // Variate bobbing speed
                const duration = 3 + Math.random() * 2;
                msgEl.style.animationDuration = duration + 's';

                document.body.appendChild(msgEl);

                // Make them appear
                setTimeout(() => msgEl.style.opacity = '1', 100);

            }, delay);
            delay += 500;
        });
    }


    /* --- Scene 3: Gallery --- */
    const galleryContainer = document.querySelector('.gallery-container');
    const slides = document.querySelectorAll('.gallery-slide');
    let currentSlide = 0;

    galleryContainer.addEventListener('click', () => {
        slides[currentSlide].classList.remove('active-slide');
        currentSlide++;

        if (currentSlide < slides.length) {
            slides[currentSlide].classList.add('active-slide');
        } else {
            // No fade to black here as per request
            goToScene(4);
            // Start Countdown
            startFinalCountdown();
        }
    });

    function startFinalCountdown() {
        let count = 5;
        const countdownEl = document.getElementById('countdown');

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                countdownEl.textContent = count;
            } else {
                clearInterval(timer);
                countdownEl.textContent = "0";

                // Fade out Music
                const bgAudio = document.getElementById('bg-audio');
                if (bgAudio) {
                    let vol = bgAudio.volume;
                    const fadeOut = setInterval(() => {
                        if (vol > 0) {
                            vol -= 0.1;
                            bgAudio.volume = Math.max(vol, 0);
                        } else {
                            clearInterval(fadeOut);
                            bgAudio.pause();
                        }
                    }, 200);
                }

                // Fade out and Redirect
                const overlay = document.createElement('div');
                overlay.classList.add('fade-out-overlay');
                document.body.appendChild(overlay);
                setTimeout(() => overlay.classList.add('active'), 100);

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        }, 1000);
    }



    /* --- Music Toggle --- */
    const toggleBtn = document.getElementById('toggleMusic');
    const bgInfo = document.getElementById('bgMusic');
    // const bgAudio = document.getElementById('bg-audio'); // Already declared top-level in this scope

    // Auto-try play (often blocked by browser policy until interaction)
    // bgAudio.play().catch(() => { /* User interaction needed */ });

    toggleBtn.addEventListener('click', () => {
        if (bgAudio.paused) {
            bgAudio.play().then(() => {
                bgInfo.style.color = '#00ff00';
                bgInfo.textContent = '🎵 Music Playing...';
            }).catch(e => {
                console.error("Audio play failed", e);
                bgInfo.textContent = 'Use interaction first';
            });
        } else {
            bgAudio.pause();
            bgInfo.style.color = '#ffd700';
            bgInfo.textContent = '🎵 Music Paused';
        }
    });
});
