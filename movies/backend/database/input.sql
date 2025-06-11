create database table movies default characte set utf8 collate hungarian_utf8;

create table users(
    id int primary key auto_increment,
    username varchar(255) unique,
    email varchar(255) unique,
    password varchar(255)
)

create table movies(
    id int primary key auto_increment,
    director varchar(255),
    title varchar(255),
    price int
)

create table favourites(
    id int primary key auto_increment,
    user_id int,
    movie_id int,
    foreign key (user_id) references users(id),
    foreign key (movie_id) references movies(id)
)


insert into movies (id, director, title, price) values(
    (1, 'Christopher Nolan', 'Inception', 2500),
    (2, 'Quentin Tarantino', 'Kill Bill', 2000),
    (3, 'Quentin Tarantino', 'Iglorious Bastards', 3000),
    (4, 'Christopher Nolan', 'Interstellar', 2500)
)