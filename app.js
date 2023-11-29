const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRouter = require('./routes/products');
const chatRouter = require('./routes/chats'); // Agrega esta línea

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

app.use('/api/products', productsRouter);
app.use('/chat', chatRouter); // Agrega esta línea

const port = 8080;
server.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
