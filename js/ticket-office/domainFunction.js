
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
    console.log(availableSeats);
    let coach;
    Object.keys(availableSeats).forEach(key => {
        if (availableSeats[key].length >= seatCount && !coach) { 
            coach = key;
        }
    })
    return availableSeats[coach].splice(0, seatCount);
}

const seatsOfCoach = (seatsInTrain, coach) => {
    return seatsInTrain.filter(s => s.coach == coach);
}

const countReservedSeats = (seats) => {
    return seats.filter(s => s.booking_reference != "").length;
}

const countReservedSeatsInCoach = (seatsInTrain, coach) => {
    return countReservedSeats(seatsOfCoach(seatsInTrain, coach));
}

const isTrainLessThan70 = (seatsInTrain) => {
    return countReservedSeats(seatsInTrain) < 0.7 * seatsInTrain.length;
}

const isCoachLessThan70 = (seatsInTrain, coach) => {
    return countReservedSeatsInCoach(seatsInTrain, coach) < 0.7 * seatsOfCoach(seatsInTrain, coach).length;
}

const isOneCoachWithoutExceeding70AfterBooking = (seatsInTrain, seatCount) => {
    let found = false;
    Object.keys(seatsInTrain).forEach(coach => {
        if (!found) {
            found = countReservedSeatsInCoach(seatsInTrain, coach) + seatCount <= 0.7 * seatsOfCoach(seatsInTrain, coach).length;
        }
    })
    return found;
}


module.exports = { obtainAvailableSeats, obtainCoachWithRequiredSeatsNumber, isTrainLessThan70, isCoachLessThan70, isOneCoachWithoutExceeding70AfterBooking }