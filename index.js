const { 
    server 
} = require('./server');

const port = 8080;

server.listen(port, () => {
    console.log(`O Servidor estará sendo executado na porta ${port}`);
});