export interface Ticket {
        id: string,
        status: string,
        pricePaid: number,
        dateTime: Date,
        roomNumber: number,
        movieName: string,
        seatNumbers: number[],  // Array de números de asiento

    }
