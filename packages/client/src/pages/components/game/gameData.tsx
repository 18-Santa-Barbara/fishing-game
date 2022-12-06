import { apiRequestGet } from '../../../utils/api';

import defPlatform from '../../../assets/game/platform.png'
import backPlatform from '../../../assets/game/Background.png'
import backCastle from '../../../assets/game/Background-2.png'
import coinImg from '../../../assets/game/coin.png'
import enemyLeftImg from '../../../assets/game/enemy-left.png'
import chestImg from '../../../assets/game/chest.png'

import music from '../../../assets/game/background.mp3'
import hit from '../../../assets/game/hit.wav'
import coinSound from '../../../assets/game/coin.wav'
import jump from '../../../assets/game/jump.wav'
import win from '../../../assets/game/win.wav'
import monster from '../../../assets/game/monster.wav'

import { MainPlayer } from './player';
import { Platform } from './platform';
import { PlatformBackground } from './platformBackground';
import { Coin } from './coin';
import { Enemy } from './enemy'
import { Chest } from './chest';
import { API } from '../../../utils/constants';
import { Player } from '../../Leaderboard';
import { useEffect, useState } from 'react';

// основные переменные
export const gravity = 0.3;
export const keyPressed = false;

export const sound = new Audio(music)
export const hitSound = new Audio(hit)
export const jumpSound = new Audio(jump)
export const coinsEffect = new Audio(coinSound)
export const winSound = new Audio(win)
export const monsterSound = new Audio(monster)

// игрок и управление им
export const player = new MainPlayer()
export const keys = {
    right: false,
    left: false,
}

// очки финала
export const final = {
    score: 0,
    time: 0,
    diamonds: 0,
    deadSkeletons: 0
}

// функция для отрисовки спрайтов
export function createImg(imgSrc: string) {    
    const image = new Image()
    image.src = imgSrc;
    return image;
}

// дата для лидерборда
export const leader: Player = {
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
})()

// отрисовка спрайтов
export const defaultPlatform = createImg(defPlatform)
export const platformBack = createImg(backPlatform)
export const castleBack = createImg(backCastle)
export const coin = createImg(coinImg)
export const enemy = createImg(enemyLeftImg)
export const chest = createImg(chestImg)

// платформы
export const platforms = [new Platform(-1, 550, defaultPlatform), 
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
                   new Platform(224 * 25, 550, defaultPlatform),]

// алмазы
export const coins = [new Coin(350, 470, coin),
               new Coin(550, 470, coin),
               new Coin(770, 370, coin),
               new Coin(990, 270, coin),
               new Coin(1210, 370, coin),

               new Coin(2670, 370, coin),
               new Coin(3120, 370, coin),
            
               new Coin(3970, 170, coin),
               new Coin(4020, 170, coin),
               new Coin(4070, 170, coin)]

// фон
export const backgroundPlatform = [new PlatformBackground(-1, -1, platformBack), 
                            new PlatformBackground(1024 - 1, -1, platformBack)]
export const backgroundCastle = [new PlatformBackground(-1, 160, castleBack), 
                          new PlatformBackground(1024 - 1, 160, castleBack), 
                          new PlatformBackground(1024 * 2 - 1, 160, castleBack), 
                          new PlatformBackground(1024 * 3 - 1, 160, castleBack)]

// враг
export const skeletons = [new Enemy(2185, 470, enemy),
                          new Enemy(3585, 270, enemy),
                          new Enemy(4475, 270, enemy),
                          new Enemy(5300, 470, enemy),]

// сундук
export const finalChest = [new Chest(5500, 511, chest)]

