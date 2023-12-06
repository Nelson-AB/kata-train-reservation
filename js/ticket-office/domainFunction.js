const obtainAvailableSeats = (seatsInTrain) => {
    const availableSeats = {};
    seatsInTrain.forEach(s => {
        if (!s.booking_reference){
            if (!availableSeats[s.coach]) {
                availableSeats[s.coach] = [];
                availableSeats[s.coach].push({coach:s.coach, seat_number:s.seat_number, booking_reference:s.booking_reference});
            }
            else {
                availableSeats[s.coach].push({coach:s.coach, seat_number:s.seat_number, booking_reference:s.booking_reference});
            }
        }
    })
    return availableSeats;
}

const obtainCoachWithRequiredSeatsNumber = (availableSeats, seatCount) => {
    let coach = null;
    Object.keys(availableSeats).forEach(key => {
        if (availableSeats[key].length >= seatCount) {
            coach = key;
        }
    })
    return availableSeats[coach].splice(0, seatCount);
}

module.exports = { obtainAvailableSeats, obtainCoachWithRequiredSeatsNumber }