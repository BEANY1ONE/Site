-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE aquatech;

USE aquatech;

CREATE TABLE empresa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	razao_social VARCHAR(50),
	cnpj CHAR(14),
	codigo_ativacao VARCHAR(50)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

create table medida (
	id INT PRIMARY KEY AUTO_INCREMENT,
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT,
	FOREIGN KEY (fk_aquario) REFERENCES aquario(id)
);

insert into empresa (razao_social, codigo_ativacao) values ('Empresa 1', 'ED145B');
insert into empresa (razao_social, codigo_ativacao) values ('Empresa 2', 'A1B2C3');
insert into aquario (descricao, fk_empresa) values ('Aquário de Estrela-do-mar', 1);
insert into aquario (descricao, fk_empresa) values ('Aquário de Peixe-dourado', 2);

-- =============================================
-- _____________________________________________
-- Aqui abaixo, será o código do MySQL que será utilizado para criação do Banco de Dados e
-- tabelas do Projeto Individual
-- _____________________________________________
-- =============================================


CREATE DATABASE beany1;

USE beany1;

-- Criação das Tabelas do Banco de Dados
-- Tabela: Usuário

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(80),
	senha VARCHAR(20) NOT NULL
);

CREATE TABLE conta ( -- Informações da conta
	idConta INT AUTO_INCREMENT,
	fkUsuario INT,
		CONSTRAINT fkUsuarioConta FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
		PRIMARY KEY (idConta, fkUsuario),
	ranks VARCHAR(15),
		CONSTRAINT chkRanks CHECK (ranks IN('Cobre', 'Bronze', 'Prata', 'Ouro', 'Platina', 'Diamante', 'Champion')),
	kd DECIMAL DEFAULT 0,
	dtConta DATE DEFAULT NOW(),
	nvlConta INT
);

CREATE TABLE equipe (
	idEquipe INT PRIMARY KEY AUTO_INCREMENT,
	dtCriacao DATE NOT NULL,
	qtdMembros INT
);

CREATE TABLE partidaUsuario (
	idPartida INT AUTO_INCREMENT,
	fkUsuario INT,
	fkEquipe INT,
		CONSTRAINT fkUsuarioPartida FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
		CONSTRAINT fkEquipePartida FOREIGN KEY (fkEquipe) REFERENCES equipe(idEquipe),
		PRIMARY KEY (idPartida, fkUsuario, fkEquipe),
	dtPartida DATE DEFAULT NOW() NOT NULL,
	mapa VARCHAR(45) DEFAULT 'Mapa Indefinido',
	resultado VARCHAR(45) NOT NULL,
		CONSTRAINT chkResultado CHECK (resultado IN('Vitória', 'Derrota')),
	kills INT NOT NULL,
	deaths INT NOT NULL,
	pontos INT
);

-- ================================================================
-- Tabela Fóruns caso ache necessário futuramente adicionar
-- ================================================================

-- CREATE TABLE forum (
-- 	idPostagem INT PRIMARY KEY AUTO_INCREMENT,
-- 	titulo VARCHAR(45) NOT NULL,
-- 	comentario VARCHAR(200),
-- 	fkUsuario INT DEFAULT 0,
-- 		CONSTRAINT fkUsuarioForum FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
-- );

-- ________________________________________________________________
-- ________________________________________________________________
-- ================================================================
-- Inserção de Dados para teste
-- ================================================================
-- ________________________________________________________________
-- ________________________________________________________________

USE beany1;

-- Inserindo na tabela usuario
INSERT INTO usuario(username, email, senha) VALUES
("Richard", "richarddiez@gmail.com", "senha123"),
("Hunter", "richarddiez@gmail.com", "senha123456");

-- Inserindo na tabela conta(as informações extras)
INSERT INTO conta(fkUsuario, ranks, kd, dtConta, nvlConta) VALUES
(1, 'Platina', 1.2, '2025-11-26', 230),
(1, 'Ouro', 1.0, '2025-11-26', 120);

-- Inserindo na tabela equipe
INSERT INTO equipe (dtCriacao, qtdMembros) VALUES
("2025-11-26", 4),
("2025-11-26", 4);

-- Inserindo na tabela partidaUsuario
INSERT INTO partidaUsuario (fkUsuario, fkEquipe, dtPartida, resultado, kills, deaths) VALUES
(1, 1, DEFAULT, 'Vitória', 9, 5),
(2, 2, DEFAULT, 'Derrota', 7, 6);

SELECT * FROM partidaUsuario;

-- Inserindo na tabela fórum
-- INSERT INTO forum (titulo, comentario, fkUsuario) VALUES
-- ("Que JOGÃO!!!", 'Melhor jogo que já joguei na vida', DEFAULT),
-- ("Que RUIMMM!!!", 'Pior jogo que já joguei na vida', DEFAULT),
-- ("Dá pra melhorar", 'Ótimo jogo, uma pena que tem seus pontos a melhorar, onde em principal[...]', 1);
