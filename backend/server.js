require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Library&Loans API rodando!' });
});

const sequelize = require('./src/config/database')
require('./src/models/Funcionario')

sequelize.sync({ force: false })
  .then(() => console.log('Banco de dados conectado e sincronizado!'))
  .catch((err) => console.log('Erro ao conectar banco:', err))
  
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});