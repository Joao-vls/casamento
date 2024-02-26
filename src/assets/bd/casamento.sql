create database casamento;
use casamento;
create table locais (
	id int auto_increment primary key,
    municipio varchar(50) not null,
    uf char(2) not null,
    valor float not null,
    quantidadeMaxPessoas smallint not null,
    rua varchar(50) not null,
    bairro varchar(50) not null,
    numero varchar(10) not null,
    complemento varchar(40)
);

create table casamento(
	id int auto_increment primary key,
	dia datetime not null,
    fk_local int ,
    UNIQUE KEY dia_local (dia,fk_local),
    foreign key (fk_local) references locais(id)
);

create table noivos(
	id int auto_increment primary key,
    nome varchar(150),
    fk_casamento int,
    foreign key (fk_casamento) references casamento(id)
);

create table padrinhosMadrinhos(
	id int auto_increment primary key,
    nome varchar(150) not null,
    fk_casamento int,
    foreign key (fk_casamento) references casamento(id)
);
create table tipo(
	id int auto_increment primary key,
    nome varchar(50),
	descricao varchar(150),
    valor float not null
);
create table servicos(
	fk_tipoServico int,
	fk_casamento int,
    unique key(fk_tipoServico,fk_casamento),
    foreign key (fk_casamento) references casamento(id),
    foreign key (fk_tipoServico) references tipo(id)
);


-- Inserções na tabela 'locais'
INSERT INTO locais (municipio, uf, valor, quantidadeMaxPessoas, rua, bairro, numero, complemento) 
VALUES 
('São Paulo', 'SP', 5000.00, 200, 'Avenida Paulista', 'Centro', '123', 'Apartamento 101'),
('Rio de Janeiro', 'RJ', 7000.00, 150, 'Rua Copacabana', 'Copacabana', '456', ''),
('Belo Horizonte', 'MG', 4000.00, 100, 'Avenida Afonso Pena', 'Funcionários', '789', ''),
('Salvador', 'BA', 6000.00, 180, 'Avenida Sete de Setembro', 'Barra', '1011', ''),
('Curitiba', 'PR', 4500.00, 120, 'Rua XV de Novembro', 'Centro', '1213', 'Sala 301'),
('Recife', 'PE', 5500.00, 160, 'Avenida Boa Viagem', 'Boa Viagem', '1415', ''),
('Brasília', 'DF', 6500.00, 170, 'Setor Comercial Sul', 'Asa Sul', '1617', ''),
('Fortaleza', 'CE', 4800.00, 130, 'Avenida Beira Mar', 'Meireles', '1819', ''),
('Manaus', 'AM', 5200.00, 140, 'Avenida Djalma Batista', 'Chapada', '2021', ''),
('Porto Alegre', 'RS', 4300.00, 110, 'Avenida Borges de Medeiros', 'Centro Histórico', '2223', '');

-- Inserções na tabela 'casamento'
INSERT INTO casamento (dia, fk_local) 
VALUES 
('2023-06-15 18:00:00', 1),
('2021-06-15 18:00:00', 2),
('2023-07-20 16:30:00', 2),
('2023-07-21 17:00:00', 2),
('2018-10-05 13:00:00', 4),
('2018-06-08 12:00:00', 5),
('2020-06-04 18:00:00', 1),
('2024-10-05 20:00:00', 7),
('2024-12-15 23:00:00', 4),
('2024-07-05 15:00:00', 1);


INSERT INTO noivos (nome, fk_casamento) 
VALUES 
('João da Silva', 1),
('Maria Oliveira', 1),
('Pedro Santos', 3),
('Ana Souza', 3),
('Lucas Pereira', 3),
('Juliana Costa', 6),
('Gustavo Almeida', 6),
('Carolina Lima', 8),
('Rafaela Ferreira', 8),
('Fernando Barbosa', 9),
('Luisa', 9),
('Fernando lucas', 10),
('Fernando Silva', 10),
('Marcos', 2),
('Marcas', 2),
('Flavio junior', 5),
('Flavio silva', 5),
('Flavia', 5),
('Fanta',7),
('Coca',7),
('Hugu',4),
('Yara',4);

-- Inserções na tabela 'padrinhosMadrinhos'
INSERT INTO padrinhosMadrinhos (nome, fk_casamento) 
VALUES 
('Carlos Oliveira', 1),
('Patrícia Santos', 1),
('Ricardo Silva', 1),
('Camila Almeida', 2),
('Felipe Pereira', 3),
('Fernanda Costa', 3),
('Bruno Lima', 4),
('Mariana Ferreira', 4),
('Diego Barbosa', 5),
('Laura Oliveira', 5),
('Laura', 6),
('Roberto', 7),
('Carlos',7),
('Cristiano',8),
('Ronaldo',8),
('Maria',9),
('Bianca',10);

-- Inserções na tabela 'tipo'
INSERT INTO tipo (nome, descricao, valor) 
VALUES 
('Decoração', 'Serviço de decoração para o casamento', 3000.00),
('Buffet <150', 'Serviço de buffet para o casamento', 5000.00),
('Buffet >150<300', 'Serviço de buffet para o casamento', 9350.00),
('Fotografia', 'Serviço de fotografia para o casamento', 2500.00),
('DJ', 'Serviço de DJ para o casamento', 1500.00),
('Bolo e doces', 'Serviço de bolo e doces para o casamento', 2000.00),
('Transporte', 'Serviço de transporte para o casamento', 1800.00),
('Vestido', 'Vestido  para o casamento', 3500.00),
('Traje', 'Traje  para o casamento', 1000.00),
('Maquiagem e cabelo', 'Serviço de maquiagem e cabelo para o casamento', 1200.00),
('Convites', 'Serviço de convites para o casamento', 800.00);

-- Inserções na tabela 'servicos'
INSERT INTO servicos (fk_tipoServico, fk_casamento) 
VALUES 
(1, 1),
(4, 2),
(2, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);


-- valor total do casamento para exibir para o cliente 
-- SELECT 
--     SUM(tipo.valor) + locais.valor AS valorTotal
-- FROM casamento  JOIN locais  ON casamento.fk_local = locais.id
-- LEFT JOIN servicos  ON casamento.id = servicos.fk_casamento
--  LEFT JOIN 
--     tipo ON servicos.fk_tipoServico = tipo.id 
--     WHERE 
--     casamento.id = 1;

        
-- -- municipos com mais casamentos
-- SELECT locais.municipio, COUNT(casamento.id) AS total_casamentos
-- FROM locais
-- JOIN casamento  ON locais.id = casamento.fk_local
-- GROUP BY locais.id, locais.municipio
-- ORDER BY total_casamentos DESC;

-- -- casamentos ja realizados
-- -- SELECT casamento.id , casamento.dia, locais.municipio, locais.rua, locais.bairro FROM casamento 
-- -- JOIN locais  ON casamento.fk_local = locais.id
-- -- WHERE casamento.dia >= CURDATE(); 

-- -- mes com mais casamento
-- SELECT MONTH(dia) AS mes, COUNT(*) AS total_casamentos
-- FROM casamento
-- GROUP BY mes
-- ORDER BY total_casamentos DESC
-- LIMIT 1;


-- SELECT CONCAT(noivos.nome, ' (Noivo/a)') AS nome, casamento.id AS id_casamento
-- FROM noivos
-- JOIN casamento ON noivos.fk_casamento = casamento.id
-- WHERE casamento.id = 3
-- UNION ALL
-- SELECT CONCAT(padrinhosMadrinhos.nome, ' (Padrinho/Madrinha)') AS nome, casamento.id AS id_casamento
-- FROM padrinhosMadrinhos
-- JOIN casamento ON padrinhosMadrinhos.fk_casamento = casamento.id
-- WHERE casamento.id = 3;



-- SELECT l.*
-- FROM locais l
-- LEFT JOIN casamento c ON l.id = c.fk_local AND c.dia = '2024-10-05 20:00:00'
-- WHERE c.id IS NULL;

-- drop database casamento;






