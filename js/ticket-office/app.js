const express = require('express')
const fetch  = require('node-fetch')
const morgan = require('morgan')

const { obtainAvailableSeats, obtainCoachWithRequiredSeatsNumber, isTrainLessThan70, isCoachLessThan70, isOneCoachWithoutExceeding70AfterBooking } = require('./domainFunction')

const port = 8083

const app = express()
app.use(express.json())
app.use(morgan('tiny'))

app.post("/reserve", async (req, res) => {
  const { body } = req
  const seatCount = body.count
  const trainId = body.train_id

  // Step 1: get a booking reference
  let response = await fetch("http://localhost:8082/booking_reference")
  const bookingReference = await response.text()

  // Step 2: fetch train data
  response = await fetch(`http://localhost:8081/data_for_train/${trainId}`)
  const train = await response.json()
  const seatsInTrain = Object.values(train.seats)

  // Step 3: find available seats
  const availableSeats = obtainAvailableSeats(seatsInTrain);

  // Step 3.5: check if there are less than 70% of seats reserved
  if (!isTrainLessThan70(seatsInTrain)) {
    res.status(500)
    res.send("Train is full")
    return
  }
  else if (!isOneCoachWithoutExceeding70AfterBooking(seatsInTrain, seatCount)) {
    res.status(500)
    res.send("Coach is full")
    return
  }
  

  // Step 4: make reservation
  const toReserve = obtainCoachWithRequiredSeatsNumber(availableSeats, seatCount)
  const seatIds = toReserve.map(s => `${s.seat_number}${s.coach}`)
  const reservation = {
    booking_reference: bookingReference,
    seats: seatIds,
    train_id: trainId
  }
  response = await fetch(`http://localhost:8081/reserve`, {
    method: 'POST',
    body: JSON.stringify(reservation),
    headers: { 'Content-Type': 'application/json' }
  })
  const status = response.status
  if (status != 200) {
    res.status(500)
    const message = await response.text()
    res.send(message)
    return
  }

  // Step 5: send back the reservation that was made
  res.send(reservation)
})



app.listen(port, () => {
  console.log(`Ticket Office listening on port ${port}`)
})
