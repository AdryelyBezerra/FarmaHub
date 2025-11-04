import Database from 'better-sqlite3';

const db = new Database('farmahub.db');

//Cria as tabelas no banco farmahub.db
db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome VARCHAR(70) NOT NULL,
        cpf CHAR(11) UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL, 
        senha TEXT NOT NULL,
        tipo TEXT CHECK(tipo IN ('comprador', 'entregador', 'farmaceutico', 'superadmin')) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS compradores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        endereco TEXT,
        FOREING KEY (usuario_id) REFERENCES usuarios(id)
    );
    CREATE TABLE IF NOT EXISTS entregadores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        cnh CHAR(11),
        veiculo TEXT,
        FOREING KEY (usuario_id) REFERENCES usuarios(id)
    );
    CREATE TABLE IF NOT EXISTS farmaceuticos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        crf CHAR(10) NOT NULL,
        FOREING KEY (usuario_id) REFERENCES usuarios(id)
    );
`);

export default db;