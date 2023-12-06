const obtainAvailableSeats = (seatsInTrain) => {
    const availableSeats = new Map();
    seatsInTrain.forEach(s => {
        if (!s.booking_reference){
            if (!availableSeats.has(s.coach)) {
                availableSeats.set(s.coach, []);
                availableSeats.get(s.coach).push({coach:s.coach, seat_number:s.seat_number, booking_reference:s.booking_reference});
            }
            else {
                availableSeats.get(s.coach).push({coach:s.coach, seat_number:s.seat_number, booking_reference:s.booking_reference});
            }
        }
    })
    return availableSeats;
}

const obtainCoachWithRequiredSeatsNumber = (availableSeats, seatCount) => {
    let coach = null;
    availableSeats.forEach((value, key) => {
        if (value.length >= seatCount) {
            coach = key;
        }
    })
    return availableSeats.get(coach).splice(0, seatCount);
}

module.exports = { obtainAvailableSeats, obtainCoachWithRequiredSeatsNumber }