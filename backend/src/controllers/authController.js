const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Funcionario = require('../models/Funcionario')

const login = async (req, res) => {
  const { email, senha } = req.body

  try {
    const funcionario = await Funcionario.findOne({ where: { email } })

    if (!funcionario) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos' })
    }

    if (!funcionario.status) {
      return res.status(403).json({ message: 'Funcionário inativo' })
    }

    const senhaValida = await bcrypt.compare(senha, funcionario.senha_hash)

    if (!senhaValida) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos' })
    }

    const token = jwt.sign(
      { id: funcionario.id, perfil: funcionario.perfil },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    res.json({
      token,
      funcionario: {
        id: funcionario.id,
        nome: funcionario.nome,
        email: funcionario.email,
        perfil: funcionario.perfil
      }
    })

  } catch (err) {
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

module.exports = { login }