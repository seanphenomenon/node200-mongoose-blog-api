const server = require('./app');

const PORT = process.env.PORT || 8080;

server.listen(PORT, function(){
    console.log(`server listening on http://localhost:${PORT}`);
});