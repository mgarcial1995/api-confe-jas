require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const participanteRoutes = require('./routes/participanteRoutes');
const habitacionRoutes = require('./routes/habitacionRoutes');
const companiaRoutes = require('./routes/companiaRoutes');
const maestrasRoutes = require('./routes/maestrasRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/participante', participanteRoutes);
app.use('/api/v1/habitacion', habitacionRoutes);
app.use('/api/v1/compania', companiaRoutes);
app.use('/api/v1/maestras', maestrasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
