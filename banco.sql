create database urna;

create table administrador (
	id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
);

create table eleicao (
	id serial primary key,
  id_administrador int references administrador(id),
	nome text not null,
  votos int,
  cadeiras int not null,
  candidatos int 
);

create table partido (
	id serial primary key,
  id_eleicao int references administrador(id),
  id_lider int,
  nome text not null,
  email text not null unique,
  senha text not null,
  votos int
);

create table deputado (
	id serial primary key,
  id_partido int references partido(id),
  nome text not null,
  eleito boolean
);

create table eleitor (
	id serial primary key,
  id_eleicao int references eleicao(id),
  nome text not null,
  email text not null unique,
  senha text not null,
  votou boolean
);

alter table partido
	add constraint fk_deputado
  foreign key (id_lider)
  references deputado(id);