CREATE DATABASE games CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

create table users(
	id int primary key auto_increment,
	username varchar(255) unique,
	email varchar(255) unique,
	password varchar(255)
);

create table games(
	id int primary key auto_increment,
	owner int,
	developer varchar(255),
	name varchar(255),
	price int,
	foreign key (owner) references games.users(id)
);

INSERT INTO users (username, email, password) VALUES
('gamer_pro', 'gamer.pro@email.com', 'hashed_password_1'),
('silent_player', 'silent.player@email.com', 'hashed_password_2'),
('dungeon_master', 'dungeon.master@email.com', 'hashed_password_3'),
('wake_walker', 'wake.walker@email.com', 'hashed_password_4'),
('cyber_punk', 'cyber.punk@email.com', 'hashed_password_5'),
('admin', 'admin@gamestore.com', 'admin_hashed_password');

INSERT INTO games (owner, developer, name, price, cover) VALUES
(1, 'Rockstar Games', 'Grand Theft Auto V', 5990, 'gta5_cover.jpg'),
(2, 'Konami', 'Silent Hill 2', 4990, 'silent_hill_cover.jpg'),
(3, 'Red Hook Studios', 'Darkest Dungeon', 2490, 'darkest_dungeon_cover.jpg'),
(4, 'Remedy Entertainment', 'Alan Wake 2', 6990, 'alan_wake_2_cover.jpg'),
(5, 'CD Projekt RED', 'Cyberpunk 2077', 5490, 'cyberpunk_cover.jpg'),
(1, 'FromSoftware', 'Elden Ring', 6490, 'elden_ring_cover.jpg'),
(2, 'Naughty Dog', 'The Last of Us Part II', 4990, 'tlou2_cover.jpg'),
(3, 'Bethesda Game Studios', 'The Elder Scrolls V: Skyrim', 3990, 'skyrim_cover.jpg'),
(4, 'Blizzard Entertainment', 'Diablo IV', 7490, 'diablo4_cover.jpg'),
(5, 'Valve Corporation', 'Counter-Strike 2', 0, 'cs2_cover.jpg'),
(6, 'Rockstar Games', 'Grand Theft Auto V', 5990, 'gta5_cover.jpg'),
(6, 'Konami', 'Silent Hill 2', 4990, 'silent_hill_cover.jpg'),
(6, 'Red Hook Studios', 'Darkest Dungeon', 2490, 'darkest_dungeon_cover.jpg'),
(6, 'Remedy Entertainment', 'Alan Wake 2', 6990, 'alan_wake_2_cover.jpg'),
(6, 'CD Projekt RED', 'Cyberpunk 2077', 5490, 'cyberpunk_cover.jpg'),
(6, 'FromSoftware', 'Elden Ring', 6490, 'elden_ring_cover.jpg'),
(6, 'Naughty Dog', 'The Last of Us Part II', 4990, 'tlou2_cover.jpg'),
(6, 'Bethesda Game Studios', 'The Elder Scrolls V: Skyrim', 3990, 'skyrim_cover.jpg'),
(6, 'Blizzard Entertainment', 'Diablo IV', 7490, 'diablo4_cover.jpg'),
(6, 'Valve Corporation', 'Counter-Strike 2', 0, 'cs2_cover.jpg');