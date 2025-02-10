create database if not exists todolist;
use todolist;

create table users (
	id bigint primary key auto_increment,
    user_id varchar(100) not null unique,
    password varchar(255) not null,
	name varchar(100) not null,
    email varchar(255) not null unique
);

create table todos (
	id bigint primary key auto_increment,
    user_id bigint not null,
    content TEXT not null,
    status boolean not null default false, -- TINYINT default 0
    foreign key (user_id) references users (id)
);

select * from todos;