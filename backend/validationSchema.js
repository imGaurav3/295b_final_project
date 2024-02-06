const Joi = require("joi");

const createHotelSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
});

const createSuiteSchema = Joi.object({
  hotelId: Joi.number().required(),
  numberOfBeds: Joi.number().required(),
  numberOfRooms: Joi.number().required(),
  pricePerNight: Joi.number().required(),
  suiteType: Joi.string().required(),
  amenities: Joi.object().required(),
});

const createHotelReservationSchema = Joi.object({
  hotelId: Joi.number().required(),
  suiteId: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
  pricePerNight: Joi.number().required(),
  userId: Joi.number().required(),
  numberOfGuests: Joi.number().required(),
  totalPayment: Joi.number().required(),
});

const updateHotelReservationDatesSchema = Joi.object({
  startDateTime: Joi.date().required(),
  endDateTime: Joi.date().min(Joi.ref("startDateTime")).required(),
});

module.exports = {
  createHotelSchema,
  createSuiteSchema,
  createHotelReservationSchema,
  updateHotelReservationDatesSchema,
};
