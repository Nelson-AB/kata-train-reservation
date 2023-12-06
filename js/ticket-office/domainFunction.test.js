const {obtainAvailableSeats} = require('./domainFunction')
 
const createSeat = (coach, seat_number, booking_reference = "") => ({
  coach,
  seat_number,
  booking_reference,
});
 
test('Retrieve available seats from a train with only available seats', () => {
  const seatsInTrain = [
    createSeat("A", "1"),
    createSeat("A", "2"),
  ];
 
  const availableSeats = obtainAvailableSeats(seatsInTrain);
 
  expect(availableSeats).toEqual({
    "A": [
      createSeat("A", "1"),
      createSeat("A", "2"),
    ],
  });
});
 
test('Retrieve available seats from a train with seats that may be already reserved', () => {
  const seatsInTrain = [
    createSeat("A", "1", "azertyuiop"),
    createSeat("A", "2"),
  ];
 
  const availableSeats = obtainAvailableSeats(seatsInTrain);
 
  expect(availableSeats).toEqual({
    "A": [
      createSeat("A", "2"),
    ],
  });
});
 
test('Retrieve available seats from a train with seats that are all already reserved', () => {
  const seatsInTrain = [
    createSeat("A", "1", "azertyuiop"),
    createSeat("A", "2", "azertyuiop"),
  ];
 
  const availableSeats = obtainAvailableSeats(seatsInTrain);
 
  expect(availableSeats).toEqual({});
});