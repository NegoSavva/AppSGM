USE master;
GO
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'bd_cardapio')
BEGIN
    DROP DATABASE bd_cardapio;
END
GO
-- CRIAR UM BANCO DE DADOS
CREATE DATABASE bd_cardapio
GO
-- ACESSAR O BANCO DE DADOS
USE bd_cardapio
GO

CREATE TABLE Usuario
( 
   id            INT			IDENTITY,
   nome          VARCHAR(100)	NOT NULL,
   email         VARCHAR(100)	UNIQUE NOT NULL,
   senha         VARCHAR(100)	NOT NULL,
   nivelAcesso   VARCHAR(10)    NULL, -- ADMIN ou USER
   foto			 VARBINARY(MAX) NULL,
   dataCadastro	 SMALLDATETIME	NOT NULL,
   statusUsuario VARCHAR(20)    NOT NULL, -- ATIVO ou INATIVO ou TROCAR_SENHA

   PRIMARY KEY (id)
)
GO
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Fulano da Silva', 'fulano@email.com.br', '12345678', 'ADMIN', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Choco Bono', 'sa@gmail.com', '12345678', 'ADMIN', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Beltrana de Sá', 'beltrana@email.com.br', '12345678', 'USER', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Sicrana de Oliveira', 'sicrana@email.com.br', '12345678', 'USER', NULL, GETDATE(), 'INATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Ordnael Zurc', 'ordnael@email.com.br', '12345678', 'USER', NULL, GETDATE(), 'TROCAR_SENHA')
GO

CREATE TABLE Categoria
(
	id	 INT		  IDENTITY,
	nome VARCHAR(100) NOT NULL, 
	statusCategoria VARCHAR(10)	 NOT NULL,

	PRIMARY KEY(id)
)
GO

CREATE TABLE Produto
(
	id				INT		     IDENTITY,
	nome			VARCHAR(100) NOT NULL,
	descricao		VARCHAR(400) NOT NULL,
	porcao			VARCHAR(50)	 NOT NULL,
	infoNutricional	VARCHAR(400) NOT NULL,
	categoria_id	INT			 NOT NULL,
	statusProduto	VARCHAR(10)	 NOT NULL, -- ATIVO, CARDAPIO ou INATIVO

	PRIMARY KEY (id),
	FOREIGN KEY (categoria_id) REFERENCES Categoria (id)
)
GO

CREATE TABLE Prato
(
	id				INT		     IDENTITY,
	nome			VARCHAR(100) NOT NULL,
	descricao		VARCHAR(400) NOT NULL,
	principal		VARCHAR(200) NOT NULL,
	secundario		VARCHAR(200) NOT NULL,
	acompanhamento  VARCHAR(200) NOT NULL, 
	statusPrato		VARCHAR(10)	 NOT NULL, -- ATIVO, CARDAPIO ou INATIVO
 
	PRIMARY KEY (id)
)
GO
GO

INSERT Prato (nome, descricao, principal, secundario, acompanhamento, statusPrato)
VALUES ('Scooby','PRATO LEGAL', 'Arroz com feijão', 'Carne moída', 'Saladinha', 'ATIVO')
GO
CREATE TABLE PratoProduto
(
	id					INT			 IDENTITY,
	informacao			VARCHAR(400)	 NULL,
	prato_id			INT			 NOT NULL,
	produto_id			INT			 NOT NULL,
	statusPratoProduto	VARCHAR(10)	 NOT NULL, -- ATIVO, CARDAPIO ou INATIVO

	PRIMARY KEY (id),
	FOREIGN KEY (prato_id) REFERENCES Prato (id),
	FOREIGN KEY (produto_id) REFERENCES Produto (id)
)
GO

CREATE TABLE Cardapio
(
	id				INT			 IDENTITY,
	nome			VARCHAR(20) null,
	diaServido		DATE	 NULL,
	prato_id		INT			 NOT NULL,
	statusCardapio	VARCHAR(10)	 NOT NULL, -- ATIVO ou INATIVO
	foto			VARBINARY(MAX) NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (prato_id) REFERENCES Prato (id)
)
GO

CREATE TABLE Mensagem
(
	id	            INT			  IDENTITY,
	dataMensagem    SMALLDATETIME NOT NULL,
	emissor			VARCHAR(100)  NOT NULL,
	email 	        VARCHAR(100)  NOT NULL,
	telefone	    VARCHAR(20)       NULL,
	texto 	        VARCHAR(400)  NOT NULL,
	statusMensagem  VARCHAR(10)   NOT NULL, -- ATIVO ou INATIVO

	PRIMARY KEY (id)
)
GO
INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, statusMensagem) 
VALUES (GETDATE(), 'Ordnael Zurc', 'ordnael@email.com', '(11) 98765-4123', 'Mensagem de teste', 'ATIVO')
INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, statusMensagem) 
VALUES (GETDATE(), 'Maria Onete', 'maria@email.com', null, 'Segunda mensagem de teste', 'ATIVO')
GO
INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, statusMensagem) 
VALUES (GETDATE(), 'Choco Bono', 'sa@gmail.com', '98555-5555', 'Entupiram a privada!!! Grato desde de já que você mandasse alguém lá resolver.', 'ATIVO')
GO

SELECT * FROM Usuario
SELECT * FROM Mensagem
SELECT * FROM Categoria
SELECT * FROM Produto
SELECT * FROM Prato
SELECT * FROM Cardapio


/* VERIFICAR CONEXÕES EXISTENTES */
/*
SELECT * FROM sys.dm_exec_sessions
WHERE database_id = DB_ID('bd_pizzaria_3d')
AND host_name IS NOT NULL
AND program_name LIKE 'Microsoft SQL Server Management Studio%'
*/




