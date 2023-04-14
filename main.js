import { Platform, TrapPlatform } from "./platform.js";
import { Bug } from "./bug.js";
import { Camera } from "./camera.js";
import { Hero } from "./hero.js";

document.addEventListener("DOMContentLoaded", function() {
  const consentBanner = document.getElementById("cookie-consent-banner");
  const acceptButton = document.getElementById("cookie-consent-accept");

  // Проверяем, принял ли пользователь куки ранее
  const consentGiven = localStorage.getItem("cookie-consent-given");

  if (!consentGiven) {
    consentBanner.classList.remove("hidden");
  }

  acceptButton.addEventListener("click", function() {
    // Сохраняем согласие пользователя на использование куки
    localStorage.setItem("cookie-consent-given", "true");
    consentBanner.classList.add("hidden");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Получение элемента canvas и контекста
  const canvas = document.getElementById("gameCanvas");
  canvas.width = window.innerWidth * 5; // Увеличиваем ширину canvas в 5 раз
  canvas.height = window.innerHeight;
  canvas.style.width = `${window.innerWidth * 5}px`; // Устанавливаем стиль ширины, чтобы canvas отображался корректно
  const ctx = canvas.getContext("2d");
  
  console.log("Ширина игрового окна:", window.innerWidth);
  console.log("Высота игрового окна:", window.innerHeight);
  console.log("Ширина игрового поля:", window.innerWidth * 5);

  
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  let frameCount = 0;
  let lastSecond = 0;
  let fps = 0;
  let deathCounter = 0;
  const dieSound = new Audio("die.wav");
  
  // Переключение звука
  const soundToggle = document.getElementById("sound-toggle");
  let soundEnabled = true;
  const soundOnImage = document.getElementById("sound-on");
  const soundOffImage = document.getElementById("sound-off");
  soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    hero.soundEnabled = soundEnabled;

    if (soundEnabled) {
      soundOnImage.style.display = "inline";
      soundOffImage.style.display = "none";
    } else {
      soundOnImage.style.display = "none";
      soundOffImage.style.display = "inline";
    }

    soundToggle.blur(); // Отключаем фокусировку на кнопке после клика
  });
  
  const backgroundImage = new Image();
  backgroundImage.src = "фон5.png"; // Замените на путь к вашему фоновому изображению

  backgroundImage.addEventListener('error', (e) => {
    console.error('Ошибка при загрузке фонового изображения:', e);
  });


  // Обработка событий клавиатуры
  const keys = {};

  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "KeyA":
        keys["a"] = true;
        break;
      case "KeyD":
        keys["d"] = true;
        break;
      case "Space":
        keys[" "] = true;
        break;
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "KeyA":
        keys["a"] = false;
        break;
      case "KeyD":
        keys["d"] = false;
        break;
      case "Space":
        keys[" "] = false;
        break;
    }
  });

  const camera = new Camera(0, 0);

  const hero = new Hero(50, screenHeight * 0.8, soundEnabled);
  
  const saveInterval = 5000; // 5 секунд

  setInterval(() => {
    saveDataToCookies(hero);
  }, saveInterval);


  const platforms = [
	new Platform(100/1495*window.innerWidth, screenHeight * 0.861, screenWidth * 0.067, 10),
    new Platform(300/1495*window.innerWidth, screenHeight - 200, 150, 10),
    new Platform(500/1495*window.innerWidth, screenHeight - 300, 200/1495*window.innerWidth, 10),
    new Platform(750/1495*window.innerWidth, screenHeight - 250, 100/1495*window.innerWidth, 10),
    new Platform(1000/1495*window.innerWidth, screenHeight - 350, 150/1495*window.innerWidth, 10),
    new Platform(1250/1495*window.innerWidth, canvas.height - 200, 100/1495*window.innerWidth, 10),
    new Platform(1500/1495*window.innerWidth, canvas.height - 100, 250/1495*window.innerWidth, 10),
    new Platform(1800/1495*window.innerWidth, canvas.height - 150, 150/1495*window.innerWidth, 10),
    new Platform(2100/1495*window.innerWidth, canvas.height - 250, 200/1495*window.innerWidth, 10),
    new Platform(2400/1495*window.innerWidth, canvas.height - 300, 100/1495*window.innerWidth, 10),
    new Platform(2700/1495*window.innerWidth, canvas.height - 200, 200/1495*window.innerWidth, 10),
    new Platform(3000/1495*window.innerWidth, canvas.height - 100, 150/1495*window.innerWidth, 10),
	new Platform(3150/1495*window.innerWidth, canvas.height - 150, 150/1495*window.innerWidth, 10),
    new Platform(3300/1495*window.innerWidth, canvas.height - 280, 100/1495*window.innerWidth, 10),
    new Platform(3600/1495*window.innerWidth, canvas.height - 250, 200/1495*window.innerWidth, 10),
    new Platform(3900/1495*window.innerWidth, canvas.height - 150, 100/1495*window.innerWidth, 10),
	new Platform(4050/1495*window.innerWidth, canvas.height - 220, 100/1495*window.innerWidth, 10),
    new Platform(4200/1495*window.innerWidth, canvas.height - 300, 150/1495*window.innerWidth, 10),
    new Platform(4500/1495*window.innerWidth, canvas.height - 200, 100/1495*window.innerWidth, 10),
    new Platform(4800/1495*window.innerWidth, canvas.height - 100, 250/1495*window.innerWidth, 10),
	new Platform(4900/1495*window.innerWidth, canvas.height - 200, 270/1495*window.innerWidth, 10),
	new Platform(5200/1495*window.innerWidth, canvas.height - 250, 300/1495*window.innerWidth, 10),
	new Platform(5550/1495*window.innerWidth, canvas.height - 375, 100/1495*window.innerWidth, 10),
	new Platform(5700/1495*window.innerWidth, canvas.height - 100, 150/1495*window.innerWidth, 10),
	new Platform(5900/1495*window.innerWidth, canvas.height - 170, 80/1495*window.innerWidth, 10),
    new Platform(6150/1495*window.innerWidth, canvas.height - 150, 180/1495*window.innerWidth, 10),
	new Platform(6150/1495*window.innerWidth, canvas.height - 270, 180/1495*window.innerWidth, 10),
	new Platform(6450/1495*window.innerWidth, canvas.height - 350, 120/1495*window.innerWidth, 10),
	new Platform(6700/1495*window.innerWidth, canvas.height - 250, 160/1495*window.innerWidth, 10),
	new Platform(6900/1495*window.innerWidth, canvas.height - 100, 100/1495*window.innerWidth, 10),
	new Platform(6900/1495*window.innerWidth, canvas.height - 350, 100/1495*window.innerWidth, 10),
	new Platform(7100/1495*window.innerWidth, canvas.height - 300, 200/1495*window.innerWidth, 10),

    new TrapPlatform(1200/1495*window.innerWidth, canvas.height - 250, 120/1495*window.innerWidth, 10),
    new TrapPlatform(4610/1495*window.innerWidth, canvas.height - 150, 150/1495*window.innerWidth, 10),

    new Platform(0, canvas.height - 18, canvas.width, 19), //canvas.width
  ];

  const bugs = [
    new Bug(platforms[1], 3),
    new Bug(platforms[3], 4),
    new Bug(platforms[5], 2),
	new Bug(platforms[7], 3),
	new Bug(platforms[9], 2),
	new Bug(platforms[11], 2),
	new Bug(platforms[13], 3),
	new Bug(platforms[15], 4),
	new Bug(platforms[17], 2),
	new Bug(platforms[19], 3),
	new Bug(platforms[21], 4),
	new Bug(platforms[23], 2),
	new Bug(platforms[25], 3),
	new Bug(platforms[27], 4),
	new Bug(platforms[30], 2)
  ];

  
  const backgroundWidth = Math.ceil(screenWidth / backgroundImage.width) * backgroundImage.width;
  const backgroundHeight = Math.ceil(screenHeight / backgroundImage.height) * backgroundImage.height;

  function drawBackground(context) {
    // Вычисление коэффициента масштабирования
    const scaleY = canvas.height / backgroundImage.height;
    const newHeight = canvas.height;
    const newWidth = backgroundImage.width * scaleY;

    // Отрисовка адаптированного фонового изображения с тайлингом по горизонтали
    for (let x = 0; x < canvas.width; x += newWidth) {
      context.drawImage(backgroundImage, x, 0, newWidth, newHeight);
    }
  }

  
  function drawDeathCounter(context) {
    context.font = "16px Arial";
    context.fillStyle = "white";
    context.fillText(`Смерти: ${deathCounter}`, screenWidth - 100, 20);
  }


  function drawFpsCounter(context) {
    const now = performance.now();
    frameCount++;
    const delta = now - lastSecond;

    if (delta > 1000) {
      fps = Math.round((frameCount * 1000) / delta);
      lastSecond = now;
      frameCount = 0;
    }

    context.font = "16px Arial";
    context.fillStyle = "white";
    context.fillText(`FPS: ${fps}`, 10, 20);
  }


  function drawFinishLine(context) {
    context.fillStyle = "black";
    context.fillRect(canvas.width - 100, 0, 5, screenHeight);
  }

  function resetHeroAndCamera() {
    hero.x = 50;
    hero.y = screenHeight * 0.8;
    camera.x = 0;
    camera.y = 0;
  }


  
  function checkOutOfBounds() {
    if (hero.y > screenHeight) {
      // Сбросить позицию героя и камеры
	  if (soundEnabled) {
          dieSound.play();
      }
      resetHeroAndCamera();
	  deathCounter++;
	  saveDataToCookies()
    }
  }



  function checkFinish() {
    const finishLine = canvas.width - 100;

    if (hero.x + hero.width >= finishLine) {
      alert("Поздравляем! Вы завершили уровень.");
      for (const key in keys) {
        keys[key] = false;
      }
      hero.x = 50; // Сбрасываем позицию героя
	  deathCounter = 0;
    }
  }

  function checkBugCollision() {
    bugs.forEach((bug) => {
      if (hero.collidesWithBug(bug)) {
		if (soundEnabled) {
          dieSound.play();
        }
        hero.die(() => {
          // Сбросить позицию героя и камеры
          resetHeroAndCamera();
          hero.dead = false;
		  deathCounter++;
		  saveDataToCookies()
        });
      }
    });
  }

  const targetFPS = 60;
  const targetFrameTime = 1000 / targetFPS;

  function saveDataToCookies() {
    document.cookie = `deathCounter=${deathCounter}`;
    document.cookie = `heroX=${hero.x}`;
    document.cookie = `heroY=${hero.y}`;
  }

  function loadDataFromCookies() {
    const cookies = document.cookie.split('; ');

    cookies.forEach((cookie) => {
      const [key, value] = cookie.split('=');

      switch (key) {
        case 'deathCounter':
          deathCounter = parseInt(value, 10);
          break;
        case 'heroX':
          hero.x = parseFloat(value);
          break;
        case 'heroY':
          hero.y = parseFloat(value);
          break;
      }
    });
  }


  function gameLoop(currentTime) {

	
	platforms.forEach((platform) => {
      if (hero.collidesWithTopOfPlatform(platform)) {
        if (platform instanceof TrapPlatform) {
          platform.activateTrap();
        }
      }
      if (platform instanceof TrapPlatform && platform.checkCollisionWithHero(hero)) {
		if (soundEnabled) {
          dieSound.play();
        }
        hero.die(() => {
          // Сбросить позицию героя и камеры
          resetHeroAndCamera();
          hero.dead = false;
		  deathCounter++;
		  saveDataToCookies();
        });
      }
    });

    ctx.clearRect(camera.x, camera.y, canvas.width, canvas.height);

    camera.update(hero, canvas);

    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    drawBackground(ctx); // Вызовите функцию drawBackground здесь

    hero.update(keys, canvas, platforms);
    hero.draw(ctx);

    bugs.forEach((bug) => {
      bug.update(canvas);
      bug.draw(ctx);
    });

    platforms.forEach((platform) => {
      platform.draw(ctx);
    });

    drawFinishLine(ctx);
    checkBugCollision();
    checkOutOfBounds();
    checkFinish();
    ctx.restore();
	setTimeout(gameLoop, targetFrameTime);
	drawDeathCounter(ctx);
    drawFpsCounter(ctx);

  }
  loadDataFromCookies();
  backgroundImage.addEventListener('load', () => {
    requestAnimationFrame(gameLoop);
  });
});
