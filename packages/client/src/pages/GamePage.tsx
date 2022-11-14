import React, { useRef, useEffect, useState } from 'react';
import './components/game/styles/game.css'

import { FullScreenButton } from './components/fullScreenApiButton'
import { apiRequestGet } from '../utils/api';
import { API } from '../utils/constants';
import { postLeader } from './Leaderboard';

import * as gameData from './components/game/gameData'
import { Timer } from './components/game/timer'

let context: any;
let offset = 0;
let keyPressed = false;

// условия финиша
let finish = false;
let finishRun = false;
let skeletonIsDead = false;

// самофункция для получения юзернейма лидера
(function getUser() {
    apiRequestGet(`${API}/auth/user`)
      .then(res => {
        gameData.leader.name = res.login;
      })
      .catch(err => {
        console.warn(111, err);
    });
})()

const GamePage = () => {
    const canvasRef: any = useRef();

    // начало игры
    const [start, setStart] = useState(false)
    const startGame = () => {
        setStart(true)
    }
    
    // статистика
    const [diamonds, setDiamonds] = useState(0);
    const [enemies, setEnemies] = useState(0);
    const [deadEnemies, setDeadEnemies] = useState(0);
    const [stopTimer, setStopTimer] = useState(false);
    
    function resizeCanvas() {
        canvasRef.width = 1024;
        canvasRef.height = 900;
        
        animate()
    }
    
    useEffect(() => {
        context = canvasRef.current.getContext('2d')
        setEnemies(gameData.skeletons.length)

        resizeCanvas()
    }, [])

    function animate() {
        requestAnimationFrame(animate)
        context.fillStyle = 'white'
        context.fillRect(0, 0, canvasRef.width, canvasRef.height)

        // отрисовка окружения и игрока
        gameData.backgroundPlatform.forEach((object) => {
            object.draw(context)
        })
        gameData.backgroundCastle.forEach((object) => {
            object.draw(context)
        })
        // startPress.forEach((object) => {
        //     object.draw(context)
        // })
        gameData.platforms.forEach(platform => {
            platform.draw(context);
            platform.update(context)
        })
        gameData.coins.forEach(coin => {
            coin.draw(context); 
            coin.update(context)
        })
        gameData.skeletons.forEach(skeleton => {
            skeleton.draw(context);
            skeleton.update(context);
        })
        gameData.finalChest[0].draw(context)
        gameData.player.update(context, canvasRef, gameData.gravity)
        
        // ограничение экрана для игрока
        if (gameData.keys.right && gameData.player.position.x < 400) {
            gameData.player.position.x += 5
            offset++
        } else if (gameData.keys.left && gameData.player.position.x > 10) {
            gameData.player.position.x -= 5
            offset--
        } else if (gameData.keys.left && gameData.player.position.x <= 10) {
            gameData.player.current = gameData.player.sprites.stand.left
        } else {

            // победа
            if (gameData.keys.right && finish) {
                gameData.player.position.x += 5
                offset++
    
                if (offset >= 550 && skeletonIsDead) {
                    gameData.finalChest[0].update(context)

                    if (!finishRun) {
                        gameData.player.stop(+1, gameData.keys)

                        // останавливаем таймер
                        setStopTimer(true)

                        // получаем сегодняшнюю дату лидера
                        const ldrDate = new Date()
                        const frmDate = ldrDate.toLocaleDateString("en-US")
                        gameData.leader.date = frmDate.toString();

                        // считаем кол-во очков лидера
                        gameData.final.score = gameData.final.time + ( gameData.final.diamonds / 2 );
                        gameData.leader.score = gameData.final.score;

                        // отправляем лидера в лидерборд
                        postLeader({
                            data: {
                                name: gameData.leader.name,
                                date: gameData.leader.date,
                                score: gameData.leader.score
                            },
                            ratingFieldName: 'score',
                            teamName: 'Santa-Barbara'
                        })

                        alert(`Победа!`)
                    }
                    setTimeout(() => {
                        finishRun = true;
                        gameData.player.position.x += 5
                        gameData.player.move(+1, gameData.keys)
                    }, 1000)
                }
            }
            gameData.player.velocity.x = 0;

            // при движении игрока окружающие объекты сдвигаются, а offset, пройденный игроком, меняется.
            if (gameData.keys.right) {
                offset++
                if (!finish) {
                    gameData.backgroundPlatform.forEach((platform) => {
                        platform.position.x -= 1
                    })
                    gameData.backgroundCastle.forEach((castle) => {
                        castle.position.x -= 2
                    })
                    gameData.platforms.forEach((platform) => {
                        platform.position.x -= 5
                    })
                    gameData.coins.forEach((castle) => {
                        castle.position.x -= 5
                    })
                    gameData.skeletons.forEach((castle) => {
                        castle.position.x -= 5
                    })
                    gameData.finalChest[0].position.x -= 5
                }
            } else if (gameData.keys.left) {
                offset--
            }
        }

        // одно из условий финиша при достижении определенной точки
        if (offset > 400) {
            finish = true;
        }
        
        // коллизии платформ
        gameData.platforms.forEach((platform) => {
            if (
                gameData.player.position.y + gameData.player.height <= platform.position.y + 5 &&
                gameData.player.position.y + gameData.player.height + gameData.player.velocity.y >= platform.position.y + 5 &&
                gameData.player.position.x + gameData.player.width - 60 >= platform.position.x &&
                gameData.player.position.x + gameData.player.width - 60 <= platform.position.x + platform.width
            ) {
                gameData.player.velocity.y = 0;
            }
        })
        
        // сбор монет
        gameData.coins.forEach((coin) => {
            if (
                Math.round(gameData.player.position.y + 15) == Math.round(coin.position.y) &&
                Math.round(gameData.player.position.y + 15 + gameData.player.velocity.y) == Math.round(coin.position.y) &&
                Math.round(gameData.player.position.x) == Math.round(coin.position.x - 60)
            ) {
                coin.position.x = -100
                coin.position.y = -100
                setDiamonds((diamonds) => diamonds + 1)
                gameData.final.diamonds++;
            }
        })

        // поворот скелета в зависимости от положения игрока
        if (gameData.player.position.x > gameData.skeletons[0].position.x) {
            gameData.skeletons[0].current = gameData.skeletons[0].sprites.stand.right;
        } else {
            gameData.skeletons[0].current = gameData.skeletons[0].sprites.stand.left;
        }

        // убийство скелета
        if (gameData.player.current == gameData.player.sprites.fight.right || gameData.player.current == gameData.player.sprites.stand.right) {
            if (gameData.player.attack.position.x + gameData.player.attack.width + 40 >= gameData.skeletons[0].position.x &&
                gameData.player.attack.position.x + 40 <= gameData.skeletons[0].position.x + gameData.skeletons[0].width &&
                gameData.player.attack.position.y + gameData.player.attack.height >= gameData.skeletons[0].position.y &&
                gameData.player.attack.position.y <= gameData.skeletons[0].position.y + gameData.skeletons[0].height &&
                gameData.player.doAttack
                ) {
                    gameData.skeletons[0].fall()
                    if (gameData.skeletons[0].frames >= 0) {
                        gameData.skeletons[0].frames = 0;
                    }
                    setTimeout(() => {
                        gameData.skeletons[0].position.x = -100
                        gameData.skeletons[0].position.y = -100
                    }, 200)
                    skeletonIsDead = true;
                    setDeadEnemies(deadEnemies + 1)
                }
        } else if (gameData.player.current == gameData.player.sprites.fight.left || gameData.player.current == gameData.player.sprites.stand.left) {
            if (gameData.player.attack.position.x + gameData.player.attack.width >= gameData.skeletons[0].position.x &&
                gameData.player.attack.position.x <= gameData.skeletons[0].position.x + gameData.skeletons[0].width &&
                gameData.player.attack.position.y + gameData.player.attack.height >= gameData.skeletons[0].position.y &&
                gameData.player.attack.position.y <= gameData.skeletons[0].position.y + gameData.skeletons[0].height &&
                gameData.player.doAttack
                ) {
                    gameData.skeletons[0].fall()
                    if (gameData.skeletons[0].frames >= 0) {
                        gameData.skeletons[0].frames = 2;
                    }
                    setTimeout(() => {
                        gameData.skeletons[0].position.x = -100
                        gameData.skeletons[0].position.y = -100
                    }, 200)
                    skeletonIsDead = true;
                    setDeadEnemies(deadEnemies + 1)
                }
        }
        
    }

    // движение игрока
    const movePlayer = ({ keyCode }: any) => {
        if (start) {
            // движение влево и вправо
            if (gameData.keyPressed === false && !finishRun) {
                if (keyCode === 37) {
                    gameData.player.move(-1, gameData.keys)
                    keyPressed = true
                } else if (keyCode === 39) {
                    gameData.player.move(1, gameData.keys)
                    keyPressed = true
                } 
            }
            
            // прыжок
            if (keyCode === 32 && gameData.player.velocity.y === 0) {
                gameData.player.jump();
            }
            
            // атака
            if (keyCode === 17) {
                gameData.player.doAttack = true;
            
                if (gameData.player.current == gameData.player.sprites.stand.right || gameData.player.current == gameData.player.sprites.run.right) {
                    gameData.player.memoryCurrent = gameData.player.current
                    gameData.player.startAttack(+1)
                } else if (gameData.player.current == gameData.player.sprites.stand.left || gameData.player.current == gameData.player.sprites.run.left) {
                    gameData.player.memoryCurrent = gameData.player.current
                    gameData.player.startAttack(-1)
                }
                
                setTimeout(() => {
                    gameData.player.doAttack = false;
                    if (gameData.player.memoryCurrent == gameData.player.sprites.stand.right || gameData.player.memoryCurrent == gameData.player.sprites.run.right) {    
                        gameData.player.current = gameData.player.sprites.stand.right
                        gameData.player.stop(1, gameData.keys)
                    } else if (gameData.player.memoryCurrent == gameData.player.sprites.stand.left || gameData.player.memoryCurrent == gameData.player.sprites.run.left) {
                        gameData.player.current = gameData.player.sprites.stand.left
                        gameData.player.stop(-1, gameData.keys)
                    }
                }, 300)
            }
        }

        
    }

    // остановка игрока
    const stopPlayer = ({ keyCode }: any) => {
            if (keyCode === 37) {
                keyPressed = false
                gameData.player.stop(-1, gameData.keys)
            } else if (keyCode === 39) {
                keyPressed = false
                gameData.player.stop(1, gameData.keys)
            }
    }

    return (
        <div className='game-field' role="button" tabIndex={0} onKeyDown={e => movePlayer(e)} onKeyUp={e => stopPlayer(e)}>
            <canvas width="1024px" height="576px" ref={canvasRef} />
            <div className='game-interface'>
                {start ? <Timer seconds={60} stopTimer={stopTimer}></Timer> : <h1>60</h1>}
                <p>DIAMONDS: {diamonds}</p>
                <p>SKELETONS: {deadEnemies}/{enemies}</p>
                <p>SCORE: {gameData.final.score}</p>
                <FullScreenButton></FullScreenButton>
                <button className='game-btn' onClick={startGame}><p>Start Game</p></button>
            </div>
        </div>
    );
}

export default GamePage;

