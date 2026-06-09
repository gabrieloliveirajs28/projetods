const bcrypt = require('bcrypt')
const Funcionario = require('../models/Funcionario')
const sequelize = require('../config/database')

const seed = async () => {
  await sequelize.sync()

  const adminExiste = await Funcionario.findOne({ where: { email: 'admin@bibliotech.com' } })

  if (!adminExiste) {
    // Criação de perfis de acesso para admin e bibliotecário
    await Funcionario.bulkCreate([
      {
        nome: 'Administrador',
        email: 'admin@bibliotech.com',
        senha_hash: await bcrypt.hash('Admin@123', 10),
        perfil: 'admin',
        status: true
      },

      {
        nome: 'Bibliotecário',
        email: 'biblio@bibliotech.com',
        senha_hash: await bcrypt.hash('Biblio@123', 10),
        perfil: 'bibliotecario',
        status: true
      }
    ])

    console.log('Seed criado com sucesso!')
  } else {
    console.log('Seed já executado, pulando...')
  }
}

seed()