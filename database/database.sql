CREATE TABLE grado(
    nid_grado serial primary key ,
    desc_grado varchar(30) not null,
    nivel varchar(3) not null
);
CREATE TABLE persona(
    nid_persona serial primary key ,
    nom_persona varchar(50) not null,
    ape_pate_pers varchar(50) not null,
    ape_mate_pers varchar(50) not null,
    nid_grado integer not null,
    fecha_naci date not null,
    foto_ruta text,
    foreign key (nid_grado) references grado
);
CREATE TABLE cronograma(
    id_cronograma serial primary key ,
    year integer not null
);
CREATE TABLE detalle_cronograma(
    id_detalle_cronograma serial primary key ,
    id_cronograma integer not null,
    desc_pension varchar(50) not null,
    monto decimal not null ,
    fecha_venci date not null,
    foreign key (id_cronograma) references cronograma
);
CREATE TABLE movimiento(
    id_movimiento serial primary key ,
    tipo_movimiento varchar(20) not null,
    monto decimal not null,
    estado varchar(20) not null ,
    fecha_pago TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    id_persona integer not null ,
    id_detalle_cronograma integer not null ,
    foreign key (id_persona) references persona,
    foreign key (id_detalle_cronograma) references detalle_cronograma
);
insert into grado values (default,'Cuna','INI');
insert into grado values (default,'1 Año','INI');
insert into grado values (default,'2 Años','INI');
insert into grado values (default,'3 Años','INI');
insert into grado values (default,'4 Años','INI');
insert into grado values (default,'5 Años','INI');
insert into grado values (default,'Primero','PRI');
insert into grado values (default,'Segundo','PRI');
insert into grado values (default,'Tercero','PRI');
insert into grado values (default,'Cuarto','PRI');
insert into grado values (default,'Quinto','PRI');
insert into grado values (default,'Sexto','PRI');
insert into grado values (default,'Primero','SEC');
insert into grado values (default,'Segundo','SEC');
insert into grado values (default,'Tercero','SEC');
insert into grado values (default,'Cuarto','SEC');
insert into grado values (default,'Quinto','SEC');

insert into cronograma values (default,2020);