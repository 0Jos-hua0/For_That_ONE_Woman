const flowersBase = `
  <div class="flower flower--1">
    <div class="flower__leafs flower__leafs--1">
      <div class="flower__leaf flower__leaf--1"></div>
      <div class="flower__leaf flower__leaf--2"></div>
      <div class="flower__leaf flower__leaf--3"></div>
      <div class="flower__leaf flower__leaf--4"></div>
      <div class="flower__white-circle"></div>
      <div class="flower__light flower__light--1"></div>
      <div class="flower__light flower__light--2"></div>
      <div class="flower__light flower__light--3"></div>
      <div class="flower__light flower__light--4"></div>
      <div class="flower__light flower__light--5"></div>
      <div class="flower__light flower__light--6"></div>
      <div class="flower__light flower__light--7"></div>
      <div class="flower__light flower__light--8"></div>
    </div>
    <div class="flower__line">
      <div class="flower__line__leaf flower__line__leaf--1"></div>
      <div class="flower__line__leaf flower__line__leaf--2"></div>
      <div class="flower__line__leaf flower__line__leaf--3"></div>
      <div class="flower__line__leaf flower__line__leaf--4"></div>
      <div class="flower__line__leaf flower__line__leaf--5"></div>
      <div class="flower__line__leaf flower__line__leaf--6"></div>
    </div>
  </div>
`;

const grasses = [
  `<div class="grow-ans" style="--d:1.2s"><div class="flower__g-long"><div class="flower__g-long__top"></div><div class="flower__g-long__bottom"></div></div></div>`,
  `<div class="growing-grass"><div class="flower__grass flower__grass--1"><div class="flower__grass--top"></div><div class="flower__grass--bottom"></div><div class="flower__grass__leaf flower__grass__leaf--1"></div><div class="flower__grass__leaf flower__grass__leaf--2"></div><div class="flower__grass__leaf flower__grass__leaf--3"></div><div class="flower__grass__leaf flower__grass__leaf--4"></div><div class="flower__grass__leaf flower__grass__leaf--5"></div><div class="flower__grass__leaf flower__grass__leaf--6"></div><div class="flower__grass__leaf flower__grass__leaf--7"></div><div class="flower__grass__leaf flower__grass__leaf--8"></div><div class="flower__grass__overlay"></div></div></div>`,
  `<div class="growing-grass"><div class="flower__grass flower__grass--2"><div class="flower__grass--top"></div><div class="flower__grass--bottom"></div><div class="flower__grass__leaf flower__grass__leaf--1"></div><div class="flower__grass__leaf flower__grass__leaf--2"></div><div class="flower__grass__leaf flower__grass__leaf--3"></div><div class="flower__grass__leaf flower__grass__leaf--4"></div><div class="flower__grass__leaf flower__grass__leaf--5"></div><div class="flower__grass__leaf flower__grass__leaf--6"></div><div class="flower__grass__leaf flower__grass__leaf--7"></div><div class="flower__grass__leaf flower__grass__leaf--8"></div><div class="flower__grass__overlay"></div></div></div>`,
  `<div class="grow-ans" style="--d:2.4s"><div class="flower__g-right flower__g-right--1"><div class="leaf"></div></div></div>`,
  `<div class="grow-ans" style="--d:2.8s"><div class="flower__g-right flower__g-right--2"><div class="leaf"></div></div></div>`,
  `<div class="grow-ans" style="--d:2.8s"><div class="flower__g-front"><div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1"><div class="flower__g-front__leaf"></div></div><div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2"><div class="flower__g-front__leaf"></div></div><div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3"><div class="flower__g-front__leaf"></div></div><div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4"><div class="flower__g-front__leaf"></div></div><div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5"><div class="flower__g-front__leaf"></div></div><div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6"><div class="flower__g-front__leaf"></div></div><div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7"><div class="flower__g-front__leaf"></div></div><div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8"><div class="flower__g-front__leaf"></div></div><div class="flower__g-front__line"></div></div></div>`,
  `<div class="grow-ans" style="--d:3.2s"><div class="flower__g-fr"><div class="leaf"></div><div class="flower__g-fr__leaf flower__g-fr__leaf--1"></div><div class="flower__g-fr__leaf flower__g-fr__leaf--2"></div><div class="flower__g-fr__leaf flower__g-fr__leaf--3"></div><div class="flower__g-fr__leaf flower__g-fr__leaf--4"></div><div class="flower__g-fr__leaf flower__g-fr__leaf--5"></div><div class="flower__g-fr__leaf flower__g-fr__leaf--6"></div><div class="flower__g-fr__leaf flower__g-fr__leaf--7"></div><div class="flower__g-fr__leaf flower__g-fr__leaf--8"></div></div></div>`,
  `<div class="long-g long-g--0"><div class="grow-ans" style="--d:3s"><div class="leaf leaf--0"></div></div><div class="grow-ans" style="--d:2.2s"><div class="leaf leaf--1"></div></div><div class="grow-ans" style="--d:3.4s"><div class="leaf leaf--2"></div></div><div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--3"></div></div></div>`,
  `<div class="long-g long-g--1"><div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--0"></div></div><div class="grow-ans" style="--d:3.8s"><div class="leaf leaf--1"></div></div><div class="grow-ans" style="--d:4s"><div class="leaf leaf--2"></div></div><div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--3"></div></div></div>`,
  `<div class="long-g long-g--2"><div class="grow-ans" style="--d:4s"><div class="leaf leaf--0"></div></div><div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--1"></div></div><div class="grow-ans" style="--d:4.4s"><div class="leaf leaf--2"></div></div><div class="grow-ans" style="--d:4.6s"><div class="leaf leaf--3"></div></div></div>`,
  `<div class="long-g long-g--3"><div class="grow-ans" style="--d:4s"><div class="leaf leaf--0"></div></div><div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--1"></div></div><div class="grow-ans" style="--d:3s"><div class="leaf leaf--2"></div></div><div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--3"></div></div></div>`,
  `<div class="long-g long-g--4"><div class="grow-ans" style="--d:4s"><div class="leaf leaf--0"></div></div><div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--1"></div></div><div class="grow-ans" style="--d:3s"><div class="leaf leaf--2"></div></div><div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--3"></div></div></div>`,
  `<div class="long-g long-g--5"><div class="grow-ans" style="--d:4s"><div class="leaf leaf--0"></div></div><div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--1"></div></div><div class="grow-ans" style="--d:3s"><div class="leaf leaf--2"></div></div><div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--3"></div></div></div>`,
  `<div class="long-g long-g--6"><div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--0"></div></div><div class="grow-ans" style="--d:4.4s"><div class="leaf leaf--1"></div></div><div class="grow-ans" style="--d:4.6s"><div class="leaf leaf--2"></div></div><div class="grow-ans" style="--d:4.8s"><div class="leaf leaf--3"></div></div></div>`,
  `<div class="long-g long-g--7"><div class="grow-ans" style="--d:3s"><div class="leaf leaf--0"></div></div><div class="grow-ans" style="--d:3.2s"><div class="leaf leaf--1"></div></div><div class="grow-ans" style="--d:3.5s"><div class="leaf leaf--2"></div></div><div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--3"></div></div></div>`
];

onload = () => {

  // 7 Fixed flowers, spread out covering the bottom area
  const fixedLocations = [5, 20, 35, 50, 65, 80, 95];
  /* 
     Staggered spawning: 
     - First 3 flowers (index 0-2) appear immediately.
     - Next 3 flowers (index 3-5) appear after 2.5 seconds.
     - Remaining flower (index 6) appears after 5 seconds.
  */
  fixedLocations.forEach((left, index) => {
    let delay = 0;
    if (index >= 3 && index < 6) {
      delay = 2500;
    } else if (index >= 6) {
      delay = 5000;
    }

    setTimeout(() => {
      createFlowerSet({ left: left, isFixed: true });
    }, delay);
  });
};

function createFlowerSet(options = {}) {
  const container = document.createElement("div");
  container.classList.add("flowers");

  // BUILD HTML: Base + Random subset of grasses
  let innerHTML = flowersBase;

  // Add 10 random grass/decor elements per set (increased from 4) to increase density
  // Using a Set to ensure unique selection if we wanted, but duplicates are fine for randomness
  for (let i = 0; i < 10; i++) {
    const randomGrass = grasses[Math.floor(Math.random() * grasses.length)];
    innerHTML += randomGrass;
  }

  container.innerHTML = innerHTML;

  // Position logic
  let left, bottom;

  if (options.isFixed) {
    left = options.left;
    bottom = 2 + Math.random() * 5;
  } else {
    left = Math.random() * 100;
    bottom = Math.random() * 20;
  }

  const scale = (Math.random() * 0.35) + 0.25;

  const elementsWithDelay = container.querySelectorAll('[style*="--d"]');
  elementsWithDelay.forEach(el => {
    const originalDelay = parseFloat(el.style.getPropertyValue('--d'));
    const randomOffset = (Math.random() * 4);
    el.style.setProperty('--d', (originalDelay + randomOffset) + 's');
  });

  container.style.setProperty('--fl-speed', (Math.random() * 0.5 + 0.1) + 's');

  container.style.left = left + "%";
  container.style.bottom = (bottom - 20) + "%";
  container.style.transform = `scale(${scale})`;
  container.style.zIndex = Math.floor(100 - bottom);

  // Randomize flower color
  // Colors: Pink (default), Blue, Yellow, Red, Purple
  const colors = ['#f672b0', '#4facfe', '#f093fb', '#ff0844', '#a18cd1', '#ff9a9e'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  container.style.setProperty('--flower-color', randomColor);

  document.body.appendChild(container);
}

// Love Letter Logic
document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const btn_open = document.getElementById('open');
  const btn_reset = document.getElementById('reset');

  if (envelope && btn_open && btn_reset) {
    envelope.addEventListener('click', () => open());
    btn_open.addEventListener('click', () => open());
    btn_reset.addEventListener('click', () => close());
  }

  function open() {
    envelope.classList.add('open');
    envelope.classList.remove('close');

    // Allow user to click the letter to proceed after reading
    const letter = document.querySelector('.letter');
    if (letter) {
      letter.style.cursor = 'pointer';
      letter.title = "Click to continue";
      letter.onclick = () => {
        window.location.href = 'start.html';
      };
    }
  }

  function close() {
    envelope.classList.add('close');
    envelope.classList.remove('open');
  }
});

// Auto Play Background Music (Song 2) with Fade In
window.addEventListener('load', () => {
  const audio = new Audio('assets/song2.mp3');
  audio.loop = true;
  audio.volume = 0;

  // Attempt play
  audio.play().then(() => {
    // Fade in
    let vol = 0;
    const fadeId = setInterval(() => {
      if (vol < 1) {
        vol += 0.05;
        audio.volume = Math.min(vol, 1);
      } else {
        clearInterval(fadeId);
      }
    }, 200);
  }).catch(e => {
    console.log("Auto-play blocked, waiting for interaction");
    document.body.addEventListener('click', () => {
      audio.volume = 0;
      audio.play();
      // Fade in on click too
      let vol = 0;
      const fadeId = setInterval(() => {
        if (vol < 1) {
          vol += 0.05;
          audio.volume = Math.min(vol, 1);
        } else {
          clearInterval(fadeId);
        }
      }, 200);
    }, { once: true });
  });
});