
const express = require("express");
const router = express.Router();
// const Reservation = require("../model/Reservation");
const reservationController = require("../controllers/reservationsController");

router.get("/", reservationController.getAllreservations);
router.post("/", reservationController.addReservation);
router.get("/:id",reservationController.getByID);
router.put("/:id", reservationController.updateReservation);
router.delete("/:id", reservationController.deleteReservation);

module.exports = router;