'use client'
import { useEffect, useState } from 'react';
import Layout from "@/components/layout/Layout";
//import Link from "next/link";
import styles from './StepperForm.module.css';
import Image from 'next/image';

export default function Home() {
 
    const [currentStep, setCurrentStep] = useState(1);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const handleNext = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  

    useEffect(() => {
        // Fetch the states.json file
      //  initMDB({ Input, Ripple });
        fetch('data/states.json')
            .then(response => response.json())
            .then(data => {
                // Filter the states with country_id = "101"
                const filteredStates = data.filter(state => state.country_id === "101");
                setStates(filteredStates);
                
            })
            .catch(error => console.error('Error fetching states:', error));
    }, []);


    useEffect(() => {
        if (selectedState) {
            // Fetch the cities.json file from the public directory
            fetch('data/cities.json')
                .then(response => response.json())
                .then(data => {
                    // Filter the cities by the selected state
                    const filteredCities = data.filter(city => city.state_id === selectedState);
                    setCities(filteredCities);
                })
                .catch(error => console.error('Error fetching cities:', error));
        }
    }, [selectedState]);


    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <h2>Contact Information</h2>
                        <form >
                            {/* Name input */}
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label mb-0" htmlFor="form4Example1">
                                  Name
                                </label>
                                <input type="text" id="form4Example1" className="form-control" />
                            </div>
                            {/* Email input */}
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label mb-0" htmlFor="form4Example2">
                                    Email address
                                </label>
                                <input type="email" id="form4Example2" className="form-control" />
                            </div>
                            {/* Message input */}
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label mb-0" htmlFor="form4Example3">
                                    Phone
                                </label>
                                <input
                                className="form-control"
                                id="form4Example3"
                                type='tel'
                                />
                            </div>
                            {/* Checkbox */}
                            {/* Submit button */}
                            <button
                                type="button"
                                className="btn  button-block btn-primary w-100 "
                            >
                                Submit
                            </button>
                        </form>

                    </div>
                );
            case 2:
                return (
                    <div>
                    <h2>Shipping Information</h2>
                    <form>
                        {/* Address input */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label mb-0" htmlFor="form4Example4">
                                Address
                            </label>
                            <input type="text" id="form4Example4" className="form-control" />
                        </div>
                        {/* Country input */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label mb-0" htmlFor="form4Example8">
                                Country
                            </label>
                            <input readOnly value="India" type="text" id="form4Example8" className="form-control" />
                        </div>
                        {/* State input */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label mb-0" htmlFor="form4Example6">
                                State
                            </label>
                            <select id="form4Example6" className="form-control" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                                <option value="" disabled>Select state</option>
                                {states.map(state => (
                                    <option key={state.id} value={state.id}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        {/* City input */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label mb-0" htmlFor="form4Example5">
                                City
                            </label>
                            <select id="form4Example5" className="form-control" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                                    <option value="" disabled>Select city</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                            </select>
                        </div>
                        {/* Postal Code input */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label mb-0" htmlFor="form4Example7">
                                Postal Code
                            </label>
                            <input type="text" id="form4Example7" className="form-control" />
                        </div>
                        
                        {/* Submit button */}
                        <button
                            data-mdb-ripple-init
                            type="button"
                            className="btn btn-primary w-100 mb-4"
                            onClick={handleNext} // Advance to next step
                        >
                            Next
                        </button>
                    </form>
                </div>
                );
            case 3:
                return (
                    <div>
                        <h2>Check Out Session</h2>
                        <div className="card mb-3" style={{ maxWidth: '600px' }}>
                            <div className="row no-gutters">
                                <div className="col-md-4" style={{ position: 'relative', height: '200px' }}>
                                <Image
                                    src={"/assets/images/gallery/gallery-1.jpg"}
                                    width={100}
                                    height={100}
                                    objectFit="cover"
                                    className="card-img"
                                />
                                </div>
                                <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Stamen Cream</h5>
                                    <p className="card-text">
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
                                            <input
                                                type="number"
                                                className="form-control text-center mx-2"
                                                style={{ width: '100%' }}
                                                value={quantity}
                                                disabled
                                                onChange={handleQuantityChange}
                                                min="1"
                                            />
                                            <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
                                        </div>
                                        <div className='d-flex border-bottom w-100'>
                                            <div className='col-4'>
                                                <b>Full Name:</b>
                                            </div>
                                            <div className='col-8'>Sample name</div>
                                        </div>
                                        <div className='d-flex border-bottom w-100'>
                                            <div className='col-4'>
                                                <b>Phone:</b>
                                            </div>
                                            <div className='col-8'>9888888888</div>
                                        </div>
                                        <div className='d-flex border-bottom w-100'>
                                            <div className='col-4'>
                                                <b>Email:</b>
                                            </div>
                                            <div className='col-8'>example@gmail.com</div>
                                        </div>
                                        <div className='d-flex border-bottom w-100'>
                                            <div className='col-4'>
                                                <b>Address:</b>
                                            </div>
                                            <div className='col-8'>example address, city, state, country</div>
                                        </div>
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-100 d-flex justify-content-evenly' style={{marginBottom:'15px'}}>
                            <button className='btn w-100 bg-primary'>Pay On Delivery</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div className={styles.stepperWrapper}>
                    <div className={styles.steps}>
                        <div
                            className={`${styles.step} ${currentStep === 1 ? styles.active : ''}`}
                            onClick={() => setCurrentStep(1)}
                        >
                            Step 1: Contact Info

                            
                        </div>
                        <div
                            className={`${styles.step} ${currentStep === 2 ? styles.active : ''}`}
                            onClick={() => setCurrentStep(2)}
                        >
                            Step 2: Shipping Info
                        </div>
                        <div
                            className={`${styles.step} ${currentStep === 3 ? styles.active : ''}`}
                            onClick={() => setCurrentStep(3)}
                        >
                            Step 3: Checkout
                        </div>
                    </div>
                    <div className={styles.formContainer}>
                        {renderStepContent()}
                        <div className='d-flex justify-content-end gap-3'>
                            {currentStep > 1 && (
                                <button className='btn bg-primary' onClick={handlePrevious}>Previous</button>
                            )}
                            {/* &&currentStep>1 */}
                            {(currentStep < 3) && (
                                <button className='btn' onClick={handleNext}>Next</button>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
