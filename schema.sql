-- Criação do banco
CREATE DATABASE IF NOT EXISTS clinica_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE clinica_db;

-- Tabela Admin
CREATE TABLE IF NOT EXISTS Admin (
  idAdmin INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  usuario VARCHAR(60) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  email VARCHAR(120) NOT NULL
);

-- Tabela Medicos
CREATE TABLE IF NOT EXISTS Medicos (
  idMedico INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  crm VARCHAR(30) NOT NULL UNIQUE,
  especialidade VARCHAR(120) NOT NULL,
  telefone VARCHAR(30),
  email VARCHAR(120),
  disponibilidade VARCHAR(120)
);

-- Tabela Pacientes
CREATE TABLE IF NOT EXISTS Pacientes (
  idPaciente INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  dataNascimento DATE,
  telefone VARCHAR(30),
  endereco VARCHAR(200),
  historicoMedico TEXT
);

-- Tabela Consultas
CREATE TABLE IF NOT EXISTS Consultas (
  idConsulta INT AUTO_INCREMENT PRIMARY KEY,
  dataConsulta DATE NOT NULL,
  horaConsulta TIME NOT NULL,
  motivo VARCHAR(200),
  status VARCHAR(50) DEFAULT 'agendada',
  observacoes TEXT,
  idPaciente INT NOT NULL,
  idMedico INT NOT NULL,
  CONSTRAINT fk_consulta_paciente FOREIGN KEY (idPaciente) REFERENCES Pacientes(idPaciente) ON DELETE CASCADE,
  CONSTRAINT fk_consulta_medico FOREIGN KEY (idMedico) REFERENCES Medicos(idMedico) ON DELETE RESTRICT
);
