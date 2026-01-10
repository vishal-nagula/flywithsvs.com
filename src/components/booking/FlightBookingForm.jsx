
import React, { useState } from 'react';
import { api } from '../../services/api';

const FlightBookingForm = ({ onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        originLocation: '',
        destinationLocation: '',
        departureDate: '',
        passengers: [{ firstName: '', lastName: '', passportNumber: '' }]
    });
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePassengerChange = (index, e) => {
        const updatedPassengers = [...formData.passengers];
        updatedPassengers[index][e.target.name] = e.target.value;
        setFormData({ ...formData, passengers: updatedPassengers });
    };

    const addPassenger = () => {
        setFormData({
            ...formData,
            passengers: [...formData.passengers, { firstName: '', lastName: '', passportNumber: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', msg: 'Processing booking...' });
        try {
            await api.bookFlight(formData);
            setStatus({ type: 'success', msg: 'Flight booked successfully!' });
        } catch (err) {
            setStatus({ type: 'error', msg: err.message || 'Booking failed' });
        }
    };

    return (
        <div className="booking-form-container">
            <h2 className="form-title">Flight Booking</h2>

            {status.msg && (
                <div className={`status-msg ${status.type}`}>
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Origin (Airport Code)</label>
                        <input name="originLocation" required placeholder="DXB" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Destination (Airport Code)</label>
                        <input name="destinationLocation" required placeholder="LHR" onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Departure Date</label>
                        <input type="date" name="departureDate" required onChange={handleChange} />
                    </div>
                </div>

                <hr className="form-divider" />
                <h3>Primary Contact</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>First Name</label>
                        <input name="firstName" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input name="lastName" required onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" required onChange={handleChange} />
                </div>

                <hr className="form-divider" />
                <h3>Passengers</h3>
                {formData.passengers.map((p, i) => (
                    <div key={i} className="passenger-row">
                        <input placeholder="First Name" name="firstName" value={p.firstName} onChange={(e) => handlePassengerChange(i, e)} required />
                        <input placeholder="Last Name" name="lastName" value={p.lastName} onChange={(e) => handlePassengerChange(i, e)} required />
                        <input placeholder="Passport Number" name="passportNumber" value={p.passportNumber} onChange={(e) => handlePassengerChange(i, e)} required />
                    </div>
                ))}
                <button type="button" onClick={addPassenger} className="btn-secondary">+ Add Passenger</button>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
                    <button type="submit" className="btn-primary" disabled={status.type === 'loading'}>
                        {status.type === 'loading' ? 'Booking...' : 'Confirm Booking'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FlightBookingForm;
