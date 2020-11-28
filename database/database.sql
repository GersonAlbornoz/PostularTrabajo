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
    fecha_pago TIMESTAMP,
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

insert into detalle_cronograma VALUES(DEFAULT,1,'INI matrícula',300,'2020-03-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'INI marzo',300,'2020-03-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'INI abril',300,'2020-04-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'INI mayo',300,'2020-05-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'INI junio',300,'2020-06-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'INI julio',300,'2020-07-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'INI agosto',300,'2020-08-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'INI setiembre',300,'2020-09-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'INI octubre',300,'2020-10-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'INI noviembre',300,'2020-11-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'INI diciembre',300,'2020-12-31');

insert into detalle_cronograma VALUES(DEFAULT,1,'PRI matrícula',450,'2020-03-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'PRI marzo',450,'2020-03-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'PRI abril',450,'2020-04-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'PRI mayo',450,'2020-05-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'PRI junio',450,'2020-06-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'PRI julio',450,'2020-07-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'PRI agosto',450,'2020-08-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'PRI setiembre',450,'2020-09-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'PRI octubre',450,'2020-10-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'PRI noviembre',450,'2020-11-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'PRI diciembre',450,'2020-12-31');

insert into detalle_cronograma VALUES(DEFAULT,1,'SEC matrícula',540,'2020-03-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'SEC marzo',540,'2020-03-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'SEC abril',540,'2020-04-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'SEC mayo',540,'2020-05-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'SEC junio',540,'2020-06-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'SEC julio',540,'2020-07-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'SEC agosto',540,'2020-08-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'SEC setiembre',540,'2020-09-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'SEC octubre',540,'2020-10-31');
insert into detalle_cronograma VALUES(DEFAULT,1,'SEC noviembre',540,'2020-11-30');
insert into detalle_cronograma VALUES(DEFAULT,1,'SEC diciembre',540,'2020-12-31');

CREATE FUNCTION last() RETURNS integer AS $$
    select max(nid_persona) from persona;
$$ LANGUAGE SQL;

CREATE FUNCTION lastNivel() RETURNS text AS $$
    SELECT G.nivel FROM persona P, grado G where P.nid_grado=G.nid_grado and P.nid_persona=last();
$$ LANGUAGE SQL;

CREATE FUNCTION detalles() RETURNS SETOF detalle_cronograma AS $$
    SELECT * from detalle_cronograma WHERE substring(desc_pension from 1 for 3)=lastNivel();
$$ LANGUAGE SQL;

CREATE FUNCTION id_detalles() RETURNS SETOF integer AS $$
    SELECT id_detalle_cronograma from detalle_cronograma WHERE substring(desc_pension from 1 for 3)=lastNivel();
$$ LANGUAGE SQL;

CREATE FUNCTION last_monto() RETURNS DECIMAL AS $$
    SELECT max(monto) from detalle_cronograma WHERE substring(desc_pension from 1 for 3)=lastNivel();
$$ LANGUAGE SQL;

CREATE FUNCTION insertarPagos() RETURNS void AS $$
DECLARE rec RECORD;
BEGIN
    FOR rec IN (SELECT * from detalle_cronograma WHERE substring(desc_pension from 1 for 3)=lastNivel()) LOOP
        RAISE INFO '%', rec;
        insert into movimiento VALUES(DEFAULT,'INGRESO',last_monto(),'POR PAGAR',null,last(),rec.id_detalle_cronograma);
        RAISE INFO 'DONE';
    END LOOP;
END;
$$ LANGUAGE PLPGSQL;

CREATE FUNCTION mes(id INTEGER) returns text as $$
    SELECT 	substring(desc_pension from 5 for char_length(desc_pension)-4) from detalle_cronograma WHERE id_detalle_cronograma=id;
$$ LANGUAGE SQL;