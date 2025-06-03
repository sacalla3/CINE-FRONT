import React from "react";
import { FaChair } from "react-icons/fa";

interface Seat {
  id: string;
  seatNumber: number;
  available: boolean;
}

interface Props {
  seats: Seat[];
  onSelectSeat?: (seatId: string) => void;
}

export const SeatSelector: React.FC<Props> = ({ seats, onSelectSeat }) => {
  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      {seats.map(seat => (
        <button
          key={seat.id}
          onClick={() => seat.available && onSelectSeat?.(seat.id)}
          disabled={!seat.available}
          className={`p-3 rounded ${
            seat.available ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
          } text-white`}
          title={`Asiento ${seat.seatNumber}`}
        >
          <FaChair />
        </button>
      ))}
    </div>
  );
};
