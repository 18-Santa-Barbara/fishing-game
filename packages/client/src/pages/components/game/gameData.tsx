import { apiRequestGet } from '../../../utils/api';

import defPlatform from '../../../assets/game/platform.png'
import backPlatform from '../../../assets/game/Background.png'
import backCastle from '../../../assets/game/Background-2.png'
import pressStartImg from '../../../assets/game/press-start.png'
import coinImg from '../../../assets/game/coin.png'
import enemyLeftImg from '../../../assets/game/enemy-left.png'
import chestImg from '../../../assets/game/chest.png'

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
export const pressStart = createImg(pressStartImg)

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
                   new Platform(224 * 11, 550, defaultPlatform),
                   new Platform(224 * 12, 550, defaultPlatform),
                   new Platform(224 * 13, 550, defaultPlatform),]

// алмазы
export const coins = [new Coin(350, 470, coin),
               new Coin(550, 470, coin),
               new Coin(770, 370, coin),
               new Coin(990, 270, coin),
               new Coin(1210, 370, coin),]

// фон
export const backgroundPlatform = [new PlatformBackground(-1, -1, platformBack), 
                            new PlatformBackground(1024 - 1, -1, platformBack)]
export const backgroundCastle = [new PlatformBackground(-1, 160, castleBack), 
                          new PlatformBackground(1024 - 1, 160, castleBack), 
                          new PlatformBackground(1024 * 2 - 1, 160, castleBack), 
                          new PlatformBackground(1024 * 3 - 1, 160, castleBack)]

// нажми старт
export const startPress = [new PlatformBackground(520, 0, pressStart)]

// враг
export const skeletons = [new Enemy(2350, 470, enemy)]

// сундук
export const finalChest = [new Chest(2600, 511, chest)]

