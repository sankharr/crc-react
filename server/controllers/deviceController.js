const Device = require("../model/Device");

const getAllDevices = async (req, res, next) => {
  let devices;
  try {
    devices = await Device.find();
  } catch (err) {
    console.log(err);
  }

  if (!devices) {
    return res.status(404).json({ message: "No devices found" });
  }
  return res.status(200).json({ devices });
};

const getDeviceById = async (req, res, next) => {
    const id = req.params.id;
    let device;
    try {
        device = await Device.findById(id);
    }
    catch (err) {
        console.log(err);
    }

    if(!device) {
        return res.status(400).json({ message: "No device found!"})
    }
    return res.status(200).json({device});
}

const addDevice = async (req, res, next) => {
    const { itemName, price, totalQuantity, lastUpdatedDate } = req.body;
    let device;
    try {
        device = new Device({
            itemName,
            price,
            totalQuantity,
            lastUpdatedDate,
        });

        await device.save();
    }
    catch (err) {
        console.log(err);
    }

    if(!device) {
        return res.status(500).json({ message: "Unable to add" });
    }

    return res.status(201).json({ message: "Successfully added the reservation" });
}

const updateDevice = async (req, res, next) => {
    const id = req.params.id;
    const { itemName, price, totalQuantity, lastUpdatedDate } = req.body;
    let device;
    try {
        device = await Device.findByIdAndUpdate(id, {
            itemName,
            price,
            totalQuantity,
            lastUpdatedDate,
        });

        await device.save();
    }
    catch (err) {
        console.log(err);
    }
    if (!device) {
        return res.status(404).json({ message: "Unable to update by id"})
    }
    return res.status(200).json({device});
}

const deleteDevice = async (req, res, next ) => {
    let id = req.params.id;
    let device;
    try {
        device = await Device.findByIdAndRemove(id);
    }
    catch (err) {
        console.log(err);
    }

    if(!device) {
        return res.status(404).json({ message: "Unable to delete reservation"});
    }
    return res.status(200).json({ message: "Reservation Successfully Deleted" });
}

exports.getAllDevices = getAllDevices;
exports.addDevice = addDevice;
exports.getDeviceById = getDeviceById;
exports.updateDevice = updateDevice;
exports.deleteDevice = deleteDevice;