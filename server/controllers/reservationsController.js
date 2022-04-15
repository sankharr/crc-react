const Reservation = require("../model/Reservation");

const getAllReservations = async (req, res, next) => {
  let reservations;
  try {
    reservations = await Reservation.find();
  } catch (err) {
    console.log(err);
  }

  if (!reservations) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ reservations });
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    let reservation;
    try {
        reservation = await Reservation.findById(id);
    }
    catch (err) {
        console.log(err);
    }

    if(!reservation) {
        return res.status(400).json({ message: "No book found!"})
    }
    return res.status(200).json({reservation});
}

const addReservation = async (req, res, next) => {
    const { itemName, startDate, endDate, days, amount, quantity, customerName, eventColor, status } = req.body;
    const lastUpdatedDate = new Date();
    let reservation;
    try {
        reservation = new Reservation({
            itemName,
            startDate,
            endDate,
            days,
            amount,
            quantity,
            customerName,
            eventColor,
            lastUpdatedDate,
            status
        });

        await reservation.save();
    }
    catch (err) {
        console.log(err);
    }

    if(!reservation) {
        return res.status(500).json({ message: "Unable to add" });
    }

    return res.status(201).json({ message: "Successfully added the reservation" });
}

const updateReservation = async (req, res, next) => {
    const id = req.params.id;
    const { itemName, startDate, endDate, price, quantity, customerName } = req.body;
    let reservation;
    try {
        reservation = await Reservation.findByIdAndUpdate(id, {
            itemName,
            startDate,
            endDate,
            price,
            quantity,
            customerName
        });

        await reservation.save();
    }
    catch (err) {
        console.log(err);
    }
    if (!reservation) {
        return res.status(404).json({ message: "Unable to update by id"})
    }
    return res.status(200).json({reservation});
}

const deleteReservation = async (req, res, next ) => {
    let id = req.params.id;
    let reservation;
    try {
        reservation = await Reservation.findByIdAndRemove(id);
    }
    catch (err) {
        console.log(err);
    }

    if(!reservation) {
        return res.status(404).json({ message: "Unable to delete reservation"});
    }
    return res.status(200).json({ message: "Reservation Successfully Deleted" });
}

exports.getAllreservations = getAllReservations;
exports.addReservation = addReservation;
exports.getByID = getById;
exports.updateReservation = updateReservation;
exports.deleteReservation = deleteReservation;