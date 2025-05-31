export interface Ticket {
        id: string,
        status: boolean,
        pricePaid: number,
        dateTime: Date,
        roomNumber: number,
        movieName: string,
        seatNumbers: number[],  // Array de números de asiento

    }
