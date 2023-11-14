create database urna;

create table administrador(
	id_administrador serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null unique
);

create table eleicao(
	id_eleicao serial primary key,
  id_administrador int references administrador(id_administrador),
  nome text not null,
  votos int,
  cadeiras int not null,
  finalizada boolean default false
);

create table partido(
	id_partido serial primary key,
  id_eleicao int references eleicao(id_eleicao),
  id_lider int,
  nome text not null,
  email text not null unique,
  senha text not null
);

create table deputado(
	id_deputado serial primary key,
  id_partido int references partido(id_partido),
  nome text not null,
  eleito boolean
);

create table eleitor(
	id_eleitor serial primary key,
  id_eleicao int references eleicao(id_eleicao),
  nome text not null,
  email text not null unique,
  senha text not null,
  votou boolean
);

create table resultado(
	id_resultado serial primary key,
  id_eleicao int references eleicao(id_eleicao),
  id_partido int references partido(id_partido),
  candidatos int,
  votos int,
  porcentagem_votos numeric(3,2),
  cadeiras int, 
  porcentagem_cadeiras numeric(3,2)
);

alter table partido
add constraint fk_deputado
foreign key (id_lider)
references deputado (id_deputado);