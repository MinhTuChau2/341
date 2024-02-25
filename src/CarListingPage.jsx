import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReservationPage from './ReservationPage';

const CarListingPage = () => {
  const [cars, setCars] = useState([
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, price: 50, available: true },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019, price: 60, available: true },
    { id: 3, make: 'Ford', model: 'Focus', year: 2018, price: 55, available: true },
  ]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [availableCars, setAvailableCars] = useState([]);

  const checkAvailability = () => {
    const available = cars.filter(car => car.available);
    const unavailable = cars.filter(car => !car.available);
    setAvailableCars({ available, unavailable });
  };

  const reserveCar = (carId) => {
    setCars(prevCars => {
      return prevCars.map(car => {
        if (car.id === carId) {
          return { ...car, available: false };
        }
        return car;
      });
    });
  };

  return (
    <div>
      <h2>Check Car Availability</h2>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      <button onClick={checkAvailability}>Check Availability</button>

      {availableCars.available && (
        <div>
          <h3>Available Cars for the selected date range:</h3>
          <ul>
            {availableCars.available.map(car => (
              <li key={car.id}>{car.make} {car.model}</li>
            ))}
          </ul>
        </div>
      )}

      {availableCars.unavailable && (
        <div>
          <h3>Unavailable Cars for the selected date range:</h3>
          <ul>
            {availableCars.unavailable.map(car => (
              <li key={car.id}>{car.make} {car.model}</li>
            ))}
          </ul>
        </div>
      )}

      <h1>Available Cars for Rent</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price per Day ($)</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.price}</td>
              <td>{car.available ? 'Yes' : 'No'}</td>
              <td>
                {car.available ? (
                <Link to="/Reservation">
                <button onClick={() => reserveCar(car.id)}>Reserve</button>
                </Link>
                ) : (
                <span>Not Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarListingPage;
