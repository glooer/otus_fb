<details>
  <summary>1. Развернуть бд</summary>
    
  ```sql
  CREATE DATABASE IF NOT EXISTS `test`
  USE `test`;

  CREATE TABLE IF NOT EXISTS `t_friends` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int unsigned NOT NULL,
    `friend_id` int unsigned NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

  CREATE TABLE IF NOT EXISTS `t_users` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `email` varchar(50) NOT NULL,
    `password` varchar(50) NOT NULL,
    `first_name` varchar(50) NOT NULL,
    `last_name` varchar(50) NOT NULL,
    `age` tinyint unsigned NOT NULL,
    `sex` varchar(50) NOT NULL,
    `interests` varchar(1000) NOT NULL,
    `city` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  ```
  
</details>

<details>
  <summary>2. Установить зависимости</summary>
    
  ```javascript
yarn install
  ```
  
</details>

<details>
  <summary>2. Запустить приложение</summary>
  Запустится на порту 3000  
  
  ```javascript
yarn start
  ```
  
</details>

  