const {Hotel} = require('../models/hotel');
const {extend} = require('lodash');

const sendError = (res, status, message) =>
  detail => res.status(status).end(); //.json({status, message, detail});

const sendOk = res => resp => res.status(200).end();

const sendJson = res => data => res.json(data);

const getHotels = (req, res) =>
  Hotel.find().
    then(sendJson(res)).
    catch(sendError(res, 500, 'Cannot read database'));

const createHotel = (req, res) =>
  Hotel.create(req.body).
    then(sendOk(res)).
    catch(sendError(res, 500, 'Cannot create a Hotel'));

const updateHotel = (req, res) =>
  Hotel.findById(req.swagger.params.hotelId.value).
    then(hotel => extend(hotel, req.body)).
    then(hotel => hotel.save()).
    then(sendOk(res)).
    catch(sendError(res, 500, 'Cannot update the Hotel'));;

const getHotelById = (req, res) =>
  Hotel.findById(req.swagger.params.hotelId.value).
    then(sendJson(res)).
    catch(sendError(res, 404, 'Hotel not found'));

const deleteHotel = (req, res) =>
  Hotel.findById(req.swagger.params.hotelId.value).
    then(hotel => hotel ?
      removeHotel(req, res) :
      sendError(res, 404, 'Hotel not found')());

const removeHotel = (req, res) =>
  Hotel.remove({_id: req.swagger.params.hotelId.value}).
    then(sendOk(res)).
    catch(sendError(res, 500, 'Cannot delete the hotel'))


module.exports = {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
};