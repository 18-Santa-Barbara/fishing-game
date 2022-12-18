import { useRef, useEffect, useState } from 'react';
import './components/game/styles/game.css';

import { FullScreenButton } from './components/FullScreenApiButton';
import { LEADERBOARD_URL } from '../utils/constants';
import { Player } from './Leaderboard';

import { getGameData } from './components/game/gameData';
import { Timer } from './components/game/timer';
import { useNavigate } from 'react-router-dom';

import { Leader } from './Leaderboard';
import { useSetLeaderMutation } from '../services/leaderApi';
import { useGetUserQuery } from '../services/userApi';

let context: any;
let offset = 0;
let keyPressed = false;

// условия финиша
let finish = false;
let finishRun = false;
let gameIsOver = false;
let skeletonIsDead = false;
let enemiesAreDead = false;

// дата для лидерборда
const leader: Player = {
  name: '',
  date: '',
  score: 0,
};

const GamePage = () => {
  const [addNewLeader, response] = useSetLeaderMutation();
  const { data: user } = useGetUserQuery();

  const postLeader = (leader: Leader) => {
    addNewLeader(JSON.stringify({ ...leader }))
      .then(res => {
        console.log(res);
      })
      .then(error => {
        console.log(error);
      });
  };

  const canvasRef: any = useRef();

  const [start, setStart] = useState(false);
  const [gameData, setGameData] = useState(() => {
    return getGameData();
  });
  const navigateTo = useNavigate();

  // начало игры
  const startGame = () => {
    gameData.sound.volume = 0.2;
    gameData.sound.play().then(() => console.log('background sound starts'));

    setTimeout(() => {
      setStart(true);
    }, 10);
  };

  // рестарт игры
  const restartGame = () => {
    window.location.reload();
  };

  // конец игры
  const gameOver = () => {
    gameIsOver = true;
    (gameData.final.score = 0),
      (gameData.final.diamonds = 0),
      (gameData.final.time = 0),
      setStopTimer(true);
  };

  // навигация в лидерборд
  const navigate = () => {
    navigateTo(LEADERBOARD_URL);
  };

  // статистика
  const [diamonds, setDiamonds] = useState(0);
  const [enemies, setEnemies] = useState(0);
  const [deadEnemies, setDeadEnemies] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);

  function resizeCanvas() {
    canvasRef.width = 1024;
    canvasRef.height = 900;

    animate();
  }

  useEffect(() => {
    context = canvasRef.current.getContext('2d');
    setEnemies(gameData.skeletons.length);
  // навигация в лидерборд
  const navigate = () => {
    navigateTo(LEADERBOARD_URL);
  };

  // статистика
  const [diamonds, setDiamonds] = useState(0);
  const [deadEnemies, setDeadEnemies] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);

  function resizeCanvas() {
    canvasRef.width = 1024;
    canvasRef.height = 900;

    animate();
  }

  useEffect(() => {
    context = canvasRef.current.getContext('2d');
    setEnemies(gameData.skeletons.length);

    resizeCanvas();
  }, []);
    resizeCanvas();
  }, []);

  function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasRef.width, canvasRef.height);
  function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasRef.width, canvasRef.height);

    // отрисовка окружения и игрока
    gameData.backgroundPlatform.forEach(object => {
      object.draw(context);
    });
    gameData.backgroundCastle.forEach(object => {
      object.draw(context);
    });
    gameData.platforms.forEach(platform => {
      platform.draw(context);
      platform.update(context);
    });
    gameData.coins.forEach(coin => {
      coin.draw(context);
      coin.update(context);
    });
    gameData.skeletons.forEach(skeleton => {
      skeleton.draw(context);
      skeleton.update(context);
    });
    gameData.finalChest[0].draw(context);
    gameData.player.update(context, canvasRef, gameData.gravity);

    // ограничение экрана для игрока
    if (gameData.keys.right && gameData.player.position.x < 400) {
      gameData.player.position.x += 5;
      offset++;
    } else if (gameData.keys.left && gameData.player.position.x > 10) {
      gameData.player.position.x -= 5;
      offset--;
    } else if (gameData.keys.left && gameData.player.position.x <= 10) {
      gameData.player.current = gameData.player.sprites.stand.left;
    } else {
      // победа
      if (gameData.keys.right && finish) {
        gameData.player.position.x += 5;
        offset++;

        if (offset >= 550 && enemiesAreDead) {
          gameData.finalChest[0].update(context);

          gameData.sound.pause();
          gameData.winSound.volume = 0.1;
          gameData.winSound.play().then(() => console.log('Win'));

          if (!finishRun) {
            gameData.player.stop(+1, gameData.keys);
          if (!finishRun) {
            gameData.player.stop(+1, gameData.keys);

            // останавливаем таймер
            setStopTimer(true);
            // останавливаем таймер
            setStopTimer(true);

            // получаем сегодняшнюю дату лидера
            const ldrDate = new Date();
            const frmDate = ldrDate.toLocaleDateString('en-US');
            leader.date = frmDate.toString();

            // считаем кол-во очков лидера
            gameData.final.score =
              gameData.final.time + gameData.final.diamonds / 2;
            leader.score = gameData.final.score;

            // отправляем лидера в лидерборд
            postLeader({
              data: {
                name: user.login,
                date: leader.date,
                score: leader.score,
              },
              ratingFieldName: 'score',
              teamName: 'Santa-Barbara',
            });

            alert(`Победа!`);
          }
            alert(`Победа!`);
          }

          setTimeout(() => {
            finishRun = true;
            if (gameData.player.position.x > canvasRef.width) {
              gameData.player.stop(1, gameData.keys);
            } else {
              gameData.player.position.x += 5;
              gameData.player.move(+1, gameData.keys);
            }
          }, 1000);
        }
      }

      gameData.player.velocity.x = 0;

      // при движении игрока окружающие объекты сдвигаются, а offset, пройденный игроком, меняется.
      if (gameData.keys.right) {
        offset++;
        if (!finish) {
          gameData.backgroundPlatform.forEach(platform => {
            platform.position.x -= 1;
          });
          gameData.backgroundCastle.forEach(castle => {
            castle.position.x -= 2;
          });
          gameData.platforms.forEach(platform => {
            platform.position.x -= 5;
          });
          gameData.coins.forEach(castle => {
            castle.position.x -= 5;
          });
          gameData.skeletons.forEach(castle => {
            castle.position.x -= 5;
          });
          gameData.finalChest[0].position.x -= 5;
        }
      } else if (gameData.keys.left) {
        offset--;
      }
    }
      // при движении игрока окружающие объекты сдвигаются, а offset, пройденный игроком, меняется.
      if (gameData.keys.right) {
        offset++;
        if (!finish) {
          gameData.backgroundPlatform.forEach(platform => {
            platform.position.x -= 1;
          });
          gameData.backgroundCastle.forEach(castle => {
            castle.position.x -= 2;
          });
          gameData.platforms.forEach(platform => {
            platform.position.x -= 5;
          });
          gameData.coins.forEach(castle => {
            castle.position.x -= 5;
          });
          gameData.skeletons.forEach(castle => {
            castle.position.x -= 5;
          });
          gameData.finalChest[0].position.x -= 5;
        }
      } else if (gameData.keys.left) {
        offset--;
      }
    }

    // одно из условий финиша при достижении определенной точки
    if (offset > 980) {
      // console.log('FINISh')
      finish = true;
    }

    // поражение при падении
    if (gameData.player.position.y > canvasRef.height) {
      gameOver();
    }

    // коллизии платформ
    gameData.platforms.forEach(platform => {
      if (
        gameData.player.position.y + gameData.player.height <=
          platform.position.y + 5 &&
        gameData.player.position.y +
          gameData.player.height +
          gameData.player.velocity.y >=
          platform.position.y + 5 &&
        gameData.player.position.x + gameData.player.width - 60 >=
          platform.position.x &&
        gameData.player.position.x + gameData.player.width - 60 <=
          platform.position.x + platform.width
      ) {
        gameData.player.velocity.y = 0;
      }
    });

    // сбор монет
    gameData.coins.forEach(coin => {
      if (
        Math.round(gameData.player.position.y + 15) ==
          Math.round(coin.position.y) &&
        Math.round(
          gameData.player.position.y + 15 + gameData.player.velocity.y
        ) == Math.round(coin.position.y) &&
        Math.round(gameData.player.position.x) ==
          Math.round(coin.position.x - 60)
      ) {
        coin.position.x = -100;
        coin.position.y = -100;
        setDiamonds(diamonds => diamonds + 1);
        gameData.final.diamonds++;

        gameData.coinsEffect.volume = 0.1;
        gameData.coinsEffect.play().then(() => console.log('Coin'));
      }
    });

    // скелеты
    gameData.skeletons.forEach(skeleton => {
      // поворот скелета в зависимости от положения игрока
      if (gameData.player.position.x > skeleton.position.x) {
        skeleton.current = skeleton.sprites.stand.right;
      } else {
        skeleton.current = skeleton.sprites.stand.left;
      }

      // убийство скелета
      if (
        gameData.player.current == gameData.player.sprites.fight.right ||
        gameData.player.current == gameData.player.sprites.stand.right
      ) {
        if (
          gameData.player.attack.position.x +
            gameData.player.attack.width +
            40 >=
            skeleton.position.x &&
          gameData.player.attack.position.x + 40 <=
            skeleton.position.x + skeleton.width &&
          gameData.player.attack.position.y + gameData.player.attack.height >=
            skeleton.position.y &&
          gameData.player.attack.position.y <=
            skeleton.position.y + skeleton.height &&
          gameData.player.doAttack
        ) {
          gameData.monsterSound.volume = 0.1;
          gameData.monsterSound.play().then(() => console.log('Monster Dies'));
          skeleton.fall();
          if (skeleton.frames >= 0) {
            skeleton.frames = 0;
          }
          if (skeletonIsDead == false) {
            skeletonIsDead = true;
            setDeadEnemies(deadEnemies => deadEnemies + 1);
            gameData.final.deadSkeletons++;
            if (gameData.skeletons.length === gameData.final.deadSkeletons) {
              enemiesAreDead = true;
            }
          }
          setTimeout(() => {
            skeleton.position.x = -100;
            skeleton.position.y = -100;
            skeletonIsDead = false;
          }, 200);
        }
      } else if (
        gameData.player.current == gameData.player.sprites.fight.left ||
        gameData.player.current == gameData.player.sprites.stand.left
      ) {
        if (
          gameData.player.attack.position.x + gameData.player.attack.width >=
            skeleton.position.x &&
          gameData.player.attack.position.x <=
            skeleton.position.x + skeleton.width &&
          gameData.player.attack.position.y + gameData.player.attack.height >=
            skeleton.position.y &&
          gameData.player.attack.position.y <=
            skeleton.position.y + skeleton.height &&
          gameData.player.doAttack
        ) {
          gameData.monsterSound.volume = 0.1;
          gameData.monsterSound.play().then(() => console.log('Monster Dies'));
          skeleton.fall();
          if (skeleton.frames >= 0) {
            skeleton.frames = 0;
          }
          if (skeletonIsDead == false) {
            skeletonIsDead = true;
            setDeadEnemies(deadEnemies => deadEnemies + 1);
            gameData.final.deadSkeletons++;
            if (gameData.skeletons.length === gameData.final.deadSkeletons) {
              enemiesAreDead = true;
            }
          }
          setTimeout(() => {
            skeleton.position.x = -100;
            skeleton.position.y = -100;
            skeletonIsDead = false;
          }, 200);
        }
      }
    });
  }

  // движение игрока
  const movePlayer = ({ keyCode }: any) => {
    if (start && !gameIsOver) {
      // движение влево и вправо
      if (keyPressed === false && !finishRun) {
        if (keyCode === 37) {
          gameData.player.move(-1, gameData.keys);
          keyPressed = true;
        } else if (keyCode === 39) {
          gameData.player.move(1, gameData.keys);
          keyPressed = true;
        }
      }

      // прыжок
      if (keyCode === 38 && gameData.player.velocity.y === 0) {
        gameData.player.jump();
      }

      // атака
      if (keyCode === 17) {
        gameData.hitSound.volume = 0.3;
        gameData.hitSound.play().then(() => console.log('Hit'));
        gameData.player.doAttack = true;

        if (
          gameData.player.current == gameData.player.sprites.stand.right ||
          gameData.player.current == gameData.player.sprites.run.right
        ) {
          gameData.player.memoryCurrent = gameData.player.current;
          gameData.player.startAttack(+1);
        } else if (
          gameData.player.current == gameData.player.sprites.stand.left ||
          gameData.player.current == gameData.player.sprites.run.left
        ) {
          gameData.player.memoryCurrent = gameData.player.current;
          gameData.player.startAttack(-1);
        }

        setTimeout(() => {
          gameData.player.doAttack = false;
          if (
            gameData.player.memoryCurrent ==
              gameData.player.sprites.stand.right ||
            gameData.player.memoryCurrent == gameData.player.sprites.run.right
          ) {
            gameData.player.current = gameData.player.sprites.stand.right;
            gameData.player.stop(1, gameData.keys);
          } else if (
            gameData.player.memoryCurrent ==
              gameData.player.sprites.stand.left ||
            gameData.player.memoryCurrent == gameData.player.sprites.run.left
          ) {
            gameData.player.current = gameData.player.sprites.stand.left;
            gameData.player.stop(-1, gameData.keys);
          }
        }, 300);
      }
    }
  };

  // остановка игрока
  const stopPlayer = ({ keyCode }: any) => {
    if (keyCode === 37) {
      keyPressed = false;
      gameData.player.stop(-1, gameData.keys);
    } else if (keyCode === 39) {
      keyPressed = false;
      gameData.player.stop(1, gameData.keys);
  // остановка игрока
  const stopPlayer = ({ keyCode }: any) => {
    if (keyCode === 37) {
      keyPressed = false;
      gameData.player.stop(-1, gameData.keys);
    } else if (keyCode === 39) {
      keyPressed = false;
      gameData.player.stop(1, gameData.keys);
    }
  };
  };

  return (
    <div
      className="game-field"
      role="button"
      tabIndex={0}
      onKeyDown={e => movePlayer(e)}
      onKeyUp={e => stopPlayer(e)}>
      <canvas width="1024px" height="576px" ref={canvasRef} />
      <div className="game-interface">
        <div className="game-interface_statistics">
          {start ? (
            <Timer seconds={60} stopTimer={stopTimer}></Timer>
          ) : (
            <h1>60</h1>
          )}
          <p>DIAMONDS: {diamonds}</p>
          <p>
            SKELETONS: {deadEnemies}/{enemies}
          </p>
          <p>SCORE: {gameData.final.score}</p>
          <FullScreenButton></FullScreenButton>
          <button className="game-btn" onClick={navigate}>
            <p>Leaderboard</p>
          </button>
        </div>
        <div className="game-inteface_start">
          <button
            className="game-btn"
            onClick={!start ? startGame : restartGame}>
            {start ? <p>Reset</p> : <p>Start Game</p>}
          </button>
        </div>
      </div>
    </div>
  );
};
  return (
    <div
      className="game-field"
      role="button"
      tabIndex={0}
      onKeyDown={e => movePlayer(e)}
      onKeyUp={e => stopPlayer(e)}>
      <canvas width="1024px" height="576px" ref={canvasRef} />
      <div className="game-interface">
        <div className="game-interface_statistics">
          {start ? (
            <Timer seconds={60} stopTimer={stopTimer}></Timer>
          ) : (
            <h1>60</h1>
          )}
          <p>DIAMONDS: {diamonds}</p>
          <p>
            SKELETONS: {deadEnemies}/{enemies}
          </p>
          <p>SCORE: {gameData.final.score}</p>
          <FullScreenButton></FullScreenButton>
          <button className="game-btn" onClick={navigate}>
            <p>Leaderboard</p>
          </button>
        </div>
        <div className="game-inteface_start">
          <button
            className="game-btn"
            onClick={!start ? startGame : restartGame}>
            {start ? <p>Reset</p> : <p>Start Game</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
