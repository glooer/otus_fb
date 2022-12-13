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
  
alter table t_friends
    add constraint t_friends_t_users_id_fk
        foreign key (user_id) references t_users (id);

alter table t_friends
    add constraint t_friends_t_users_id_fk2
        foreign key (friend_id) references t_users (id);

create table test.t_post
(
    id          int unsigned auto_increment,
    user_id     int unsigned null comment 'Пользователь опубликовавший сообщение',
    content     varchar(140) null comment 'Сообщение',
    date_create timestamp    null comment 'Дата публикации',
    constraint t_post_pk
        primary key (id)
);

alter table t_post
    add constraint t_post_t_users_id_fk
        foreign key (user_id) references t_users (id);

create table test.t_message
(
    id           int unsigned auto_increment,
    from_user_id int unsigned not null comment 'От какого пользователя сообщение',
    to_user_id   int unsigned not null comment 'Какому пользователю',
    message      varchar(140) not null comment 'Сообщение',
	  date_create  timestamp    not null comment 'Дата отправки',
    constraint t_message_pk
        primary key (id),
    constraint t_message_pk2
        unique (id),
    constraint t_message_t_users_id_fk
        foreign key (from_user_id) references test.t_users (id),
    constraint t_message_t_users_id_fk2
        foreign key (to_user_id) references test.t_users (id)
)
    comment 'Сообщения от пользователя к пользователю';


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

  
Postman коллекция лежит в файлике `fb.postman_collection.json`
После регистрации нужно авторизоваться (`/user/signin`), и в постмане поменять хедер authorization на новый