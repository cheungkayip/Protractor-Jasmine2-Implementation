import newCar from '../../aiep/car/new.json';
import oldtimerCar from '../../aiep/car/oldtimer.json';
import error from '../../aiep/car/error.json';

const vehicles = {};
vehicles[newCar.licensePlate] = newCar;
vehicles[oldtimerCar.licensePlate] = oldtimerCar;

export default (req, res) => {
	let vehicle = vehicles[req.body.licensePlate.toUpperCase()] || error;
	res.send(vehicle);
};