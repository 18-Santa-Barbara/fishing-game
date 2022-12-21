import { apiRequestGet } from '../../../utils/api';

import defPlatform from '../../../../public/game/platform.png';
import backPlatform from '../../../../public/game/Background.png';
import backCastle from '../../../../public/game/Background-2.png';
import coinImg from '../../../../public/game/coin.png';
import enemyLeftImg from '../../../../public/game/enemy-left.png';
import chestImg from '../../../../public/game/chest.png';

import music from '../../../../public/game/background.mp3';
import hit from '../../../../public/game/hit.wav';
import coinSound from '../../../../public/game/coin.wav';
import jump from '../../../../public/game/jump.wav';
import win from '../../../../public/game/win.wav';
import monster from '../../../../public/game/monster.wav';

import { MainPlayer } from './player';
import { Platform } from './platform';
import { PlatformBackground } from './platformBackground';
import { Coin } from './coin';
import { Enemy } from './enemy';
import { Chest } from './chest';
import { API } from '../../../utils/constants';
import { Player } from '../../Leaderboard';

export function getGameData() {
  // основные переменные
  const gravity = 0.3;
  const keyPressed = false;

  const sound = new Audio(music);
  const hitSound = new Audio(hit);
  const jumpSound = new Audio(jump);
  const coinsEffect = new Audio(coinSound);
  const winSound = new Audio(win);
  const monsterSound = new Audio(monster);

  // игрок и управление им
  const player = new MainPlayer();
  const keys = {
    right: false,
    left: false,
  };

  // очки финала
  const final = {
    score: 0,
    time: 0,
    diamonds: 0,
    deadSkeletons: 0,
  };

  // функция для отрисовки спрайтов
  function createImg(imgSrc: string) {
    const image = new Image();
    image.src = imgSrc;
    return image;
  }

  // дата для лидерборда
  const leader: Player = {
    name: '',
    date: '',
    score: 0,
  };

  // самофункция для получения юзернейма лидера
  (function getUser() {
    apiRequestGet(`${API}/auth/user`)
      .then(res => {
        leader.name = res.login;
      })
      .catch(err => {
        console.warn(111, err);
      });
  })();

  // отрисовка спрайтов
  const defaultPlatform = createImg(defPlatform);
  const platformBack = createImg(backPlatform);
  const castleBack = createImg(backCastle);
  const coin = createImg(coinImg);
  const enemy = createImg(enemyLeftImg);
  const chest = createImg(chestImg);

  // платформы
  const platforms = [
    new Platform(-1, 550, defaultPlatform),
    new Platform(224, 550, defaultPlatform),
    new Platform(224 * 2, 550, defaultPlatform),
    new Platform(224 * 3, 550, defaultPlatform),
    new Platform(224 * 4, 550, defaultPlatform),
    new Platform(224 * 5, 550, defaultPlatform),
    new Platform(224 * 6, 550, defaultPlatform),

    new Platform(224 * 3, 450, defaultPlatform),
    new Platform(224 * 4, 350, defaultPlatform),
    new Platform(224 * 5, 450, defaultPlatform),

    new Platform(224 * 7.5, 550, defaultPlatform),

    new Platform(224 * 9, 550, defaultPlatform),
    new Platform(224 * 10, 550, defaultPlatform),

    new Platform(224 * 11.5, 450, defaultPlatform),
    new Platform(224 * 13.5, 450, defaultPlatform),

    new Platform(224 * 15.5, 350, defaultPlatform),
    new Platform(224 * 17.5, 250, defaultPlatform),
    new Platform(224 * 19.5, 350, defaultPlatform),

    new Platform(224 * 21, 550, defaultPlatform),
    new Platform(224 * 22, 550, defaultPlatform),
    new Platform(224 * 23, 550, defaultPlatform),
    new Platform(224 * 24, 550, defaultPlatform),
    new Platform(224 * 25, 550, defaultPlatform),
  ];

  // алмазы
  const coins = [
    new Coin(350, 470, coin),
    new Coin(550, 470, coin),
    new Coin(770, 370, coin),
    new Coin(990, 270, coin),
    new Coin(1210, 370, coin),

    new Coin(2670, 370, coin),
    new Coin(3120, 370, coin),

    new Coin(3970, 170, coin),
    new Coin(4020, 170, coin),
    new Coin(4070, 170, coin),
  ];

  // фон
  const backgroundPlatform = [
    new PlatformBackground(-1, -1, platformBack),
    new PlatformBackground(1024 - 1, -1, platformBack),
  ];
  const backgroundCastle = [
    new PlatformBackground(-1, 160, castleBack),
    new PlatformBackground(1024 - 1, 160, castleBack),
    new PlatformBackground(1024 * 2 - 1, 160, castleBack),
    new PlatformBackground(1024 * 3 - 1, 160, castleBack),
  ];

  // враг
  const skeletons = [
    new Enemy(2185, 470, enemy),
    new Enemy(3585, 270, enemy),
    new Enemy(4475, 270, enemy),
    new Enemy(5300, 470, enemy),
  ];

  // сундук
  const finalChest = [new Chest(5500, 511, chest)];

  return {
    finalChest,
    skeletons,
    backgroundCastle,
    backgroundPlatform,
    coins,
    platforms,
    sound,
    hitSound,
    jumpSound,
    coinsEffect,
    winSound,
    monsterSound,
    final,
    keys,
    player,
    keyPressed,
    gravity,
    leader,
  };
}
