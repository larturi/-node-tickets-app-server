const TicketList = require('./ticket-list');
class Sockets {

    constructor( io ) {
        this.io = io;

        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');

            socket.on('solicitar-ticket', ( data, callback ) => {
                const nuevoTicket = this.ticketList.crearTicket();
                callback(nuevoTicket);
            });

            socket.on('atender-proximo-cliente', ( { agente, escritorio }, callback ) => {
                const proximoTicket = this.ticketList.asignarTicket(agente, escritorio);
                callback(proximoTicket);

                this.io.emit('ticket-asignado', this.ticketList.ultimosTickets);
            });
        
        });
    }

}


module.exports = Sockets;