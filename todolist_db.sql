create database if not exists todolist;
use todolist;

create table users (
	id bigint primary key auto_increment,
    user_id varchar(100) not null unique,
    password varchar(255) not null,
    email varchar(255) not null unique,
    name varchar(100) not null
);

create table todolists (
	id bigint primary key auto_increment,
    user_id bigint not null,
    content TEXT not null,
    create_time TIME not null,
    foreign key (user_id) references users (id)
);