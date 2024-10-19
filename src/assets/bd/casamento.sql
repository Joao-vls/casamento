create database casamento;
use casamento;
INSERT INTO locais (municipio, uf, valor, quantidade_max_pessoas, rua, bairro, numero, complemento) 
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


INSERT INTO usuario (email, senha, telefone,nome) 
VALUES 
('joao@example.com', 'senha', '123456789','joao'),
('marcos@example.com', 'senha', '985471354','marcos'),
('marcas@example.com', 'senha', '9854781354','marcas'),
('pedro@example.com', 'senha', '978451355','pedro'),
('yara@example.com', 'senha', '978451343','yara'),
('flaves@example.com', 'senha', '978548711','flave'),
('juliana@example.com', 'senha', '998574153','juliana'),
('contratanteexterno@example.com', 'senha', '998574153','flavio'),
('marcia@example.com', 'senha', '997121179','marcia'),
('carolina@example.com', 'senha', '995214779','carolina'),
('luisa@example.com', 'senha', '999985512','luisa'),
('fernandosil@example.com', 'senha', '998745123','fernando');

select *  from contratante;

INSERT INTO contratante ( data_contrato, fk_usuario)
VALUES 
( '2023-01-15 10:00:00', 1),
('2023-05-10 16:32:00', 2),
('2023-05-10 16:32:00', 3),
('2023-03-10 16:32:00', 4),
( '2023-03-10 16:32:00', 8),
('2023-05-10 16:32:00', 6),
('2023-03-04 14:12:00', 5),
('2023-01-20 14:12:00', 7),
('2023-08-20 14:12:00', 9),
('2023-09-20 11:12:00',10 ),
('2023-07-20 08:52:00',11 ),
('2023-03-19 13:11:00',12 );

INSERT INTO noivos (nome,idade_dia_casamento, fk_contratante) 
VALUES 
('João da Silva',30, 1), -- 1
('Maria Oliveira',31,1), -- 2
('Pedro Santos',21, 3),  -- 3
('Ana Souza',24,3),		-- 4
('Lucas Pereira',20, 3), -- 5
('Juliana Costa',50, 6), -- 6
('Gustavo Almeida',55,6), -- 7
('Carolina Lima',40, 8),  -- 8
('Rafaela Ferreira',45, 8), -- 9
('Fernando Barbosa',35, 9), -- 10
('Luisa',37, 9),		-- 11
('Fernando lucas',39, 10), -- 12
('Fernando Silva',41, 10), -- 13
('Marcos',50, 2),	-- 14
('Marcas',78,2),	-- 15
('Flavio junior',29, 5), -- 16
('Flavio silva',29, 5),	-- 17
('Flavia',40, 5), -- 18
('Marcia',25,7),	-- 19
('Silva',71,7), -- 20
('Hugu',50,4), -- 21
('Yara',48,4); -- 22

INSERT INTO usuario_noivos (fk_noivo, fk_usuario) 
VALUES 
(1, 1),
(14, 2),
(15, 3),
(3,4),
(22,5),
(17,6),
(6,7),
(19,9),
(8,10),
(11,11),
(13,12);

INSERT INTO casamento (dia, valor_do_local_dia_compra, fk_local, fk_contratante) 
VALUES 
('2023-06-15 18:00:00', 3000.00, 1, 1),
('2023-07-20 16:30:00', 5000.00, 2, 2),
('2023-07-21 17:00:00', 5000.00, 2, 3),
('2023-08-15 13:00:00', 3500.00, 3, 4), --
('2023-09-08 12:00:00', 5000.00, 4, 5),--
('2023-10-04 18:00:00', 3500.00, 5, 6),--
('2023-11-05 20:00:00', 3000.00, 6, 7),--
('2023-12-15 23:00:00', 7800.00, 7, 8), --
('2024-01-05 15:00:00', 4800.00, 8, 9), --
('2024-02-20 14:30:00', 5200.00, 9, 10);


INSERT INTO pagamento (valor_do_pagamento, data_pagamento, tipo, desconto, fk_contratante,fk_casamento) 
VALUES 
(3000.00, '2023-01-15 08:30:00', 'pix', 0, 1, 1),
(5000.00, '2023-02-20 10:15:00', 'credito', 10, 2, 2),
(2500.00, '2023-03-25 13:45:00', 'debito', 5, 3, 3),
(2000.00, '2023-04-10 16:20:00', 'boleto', 15, 4, 4),
(1800.00, '2023-05-05 09:00:00', 'pix', 0, 5, 5),
(3500.00, '2023-06-10 11:30:00', 'credito', 10, 6, 6),
(1000.00, '2023-07-15 14:00:00', 'debito', 5, 7, 7),
(1200.00, '2023-08-20 17:10:00', 'boleto', 15, 8, 8),
(800.00, '2023-09-25 08:45:00', 'pix', 0, 9, 9),
(200.00, '2023-08-25 08:45:00', 'pix', 0, 9, 9),
(1500.00, '2023-10-30 10:00:00', 'credito', 10, 10, 10),
(1500.00, '2023-10-30 10:00:00', 'credito', 10, 11, 11),
(1500.00, '2023-10-30 10:00:00', 'credito', 10, 12, 12);



-- Inserções na tabela 'padrinhosMadrinhas'
INSERT INTO padrinhos_madrinhas (nome, fk_casamento) 
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
INSERT INTO tipo_servico (nome, descricao, valor) 
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
('Maquiagem e cabelo', 'Serviço de maquiagem e cabelo para o casamento', 1200.00);

-- Inserções na tabela 'servicos'
INSERT INTO servicos (fk_tipo_Servico, fk_casamento, valor) 
VALUES 
(1, 1, 3000.00),
(4, 2, 5000.00),
(2, 3, 9350.00),
(2, 4, 2500.00),
(3, 5, 1500.00),
(4, 6, 2000.00),
(5, 7, 1800.00),
(6, 8, 3500.00),
(7, 9, 1000.00),
(8, 10, 1200.00);









-- valor total com os valores ja pagos
SELECT 
    c.id AS id_casamento,
    c.dia,
    c.valorDoLocalDiaCompra AS valor_local,
    SUM(s.valor) AS valor_servicos,
    c.valorDoLocalDiaCompra + IFNULL(SUM(s.valor), 0) AS valor_total,
    c.valorDoLocalDiaCompra + IFNULL(SUM(s.valor), 0) - IFNULL(SUM(p.valorDoPagamento), 0) AS valor_faltante
FROM 
    casamento c
LEFT JOIN 
    servicos s ON c.id = s.fk_casamento
LEFT JOIN 
    pagamento p ON c.fk_contratante = p.fk_contratante
GROUP BY 
    c.id
ORDER BY 
    c.dia;

-- valor do casamento
SELECT 
    c.id AS id_casamento,
    c.dia,
    c.valorDoLocalDiaCompra AS valor_local,
    SUM(s.valor) AS valor_servicos,
    c.valorDoLocalDiaCompra + IFNULL(SUM(s.valor), 0) AS valor_total
FROM 
    casamento c
LEFT JOIN 
    servicos s ON c.id = s.fk_casamento
GROUP BY 
    c.id
ORDER BY 
    c.dia;
    
    
-- municipios que mais tem casamento

SELECT 
    l.municipio,
    COUNT(c.id) AS total_casamentos
FROM 
    locais l
JOIN 
    casamento c ON l.id = c.fk_local
GROUP BY 
    l.municipio
ORDER BY 
    total_casamentos DESC;
    
    
-- mes que mais teve casamento
SELECT 
    MONTH(dia) AS mes,
    COUNT(*) AS total_casamentos
FROM 
    casamento
GROUP BY 
    mes
ORDER BY 
    total_casamentos DESC
LIMIT 1;

-- locais disponivel em uma data
SELECT locais.id, locais.municipio, locais.uf
FROM locais
WHERE locais.id NOT IN (
    SELECT casamento.fk_local
    FROM casamento
    WHERE casamento.dia = '2023-06-15 18:00:00' -- Substitua esta data pela data desejada
);

-- noivos e padrinhos
SELECT noivos.nome AS noivo_noiva, 'Noivo(a)' AS papel
FROM noivos
JOIN casamento ON noivos.fk_contratante = casamento.fk_contratante
WHERE casamento.id = 3
UNION ALL
SELECT padrinhosMadrinhas.nome, 'Padrinho/Madrinha' AS papel
FROM padrinhosMadrinhas
JOIN casamento ON padrinhosMadrinhas.fk_casamento = casamento.id
WHERE casamento.id = 3;

-- faixa etaria
SELECT CASE 
           WHEN idadeDiaCasamento BETWEEN 18 AND 25 THEN '18-25'
           WHEN idadeDiaCasamento BETWEEN 26 AND 35 THEN '26-35'
           WHEN idadeDiaCasamento BETWEEN 36 AND 45 THEN '36-45'
           ELSE '45+'
       END AS faixa_etaria,
       COUNT(*) AS quantidade_noivos
FROM noivos
GROUP BY faixa_etaria;

-- total de casamentos por mês:
SELECT MONTH(dia) AS mes, COUNT(*) AS total_casamentos
FROM casamento
GROUP BY mes;

SELECT c.nome AS contratante, SUM(p.valorDoPagamento) AS total_pago
FROM contratante c
LEFT JOIN pagamento p ON c.id = p.fk_contratante
GROUP BY c.nome;
