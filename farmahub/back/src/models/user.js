import db from '../config/db.js';

export const UserModel = {
    create: (usuario) => {
        const stmt = db.prepare(`
            INSERT INTO usuarios (nome, cpf, email, senha, tipo)
            VALUES (?, ?, ?, ?, ?)
            `);
        const result = stmt.run(usuario.nome, usuario.cpf, usuario.email, usuario.senha, usuario.tipo);
        return { id: result.lastInsertRowid, ...usuario};
    },

    findAll: () => {
        return db.prepare('SELECT * FROM usuarios').all();
    },

    findById: (id) => {
        return db.prepare('SELECT * FROM usuarios WHERE id = ?').get(id);
    },
};

export default UserModel;