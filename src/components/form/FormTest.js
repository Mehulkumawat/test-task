import { useEffect, useState } from 'react';
import './formTest.css'
import data from '../../data/states.json';

function FormTest() {
    //personal details
    const [mobileNumber, setMobileNumber] = useState('');
    const [isValidMobile, setIsValidMobile] = useState(true);
    const [name, setName] = useState("");
    const [DOB, setDOB] = useState("");
    const [sex, setSex] = useState("");

    const handleMobileNumberChange = (event) => {
        const { value } = event.target;
        // Remove any non-digit characters
        const formattedValue = value.replace(/\D/g, '');
        // Check if the formatted value satisfies the conditions for a valid mobile number
        const mobileNumberRegex = /^(0|91)?[6-9]\d{9}$/;
        setIsValidMobile(mobileNumberRegex.test(formattedValue));
        setMobileNumber(formattedValue);
    };

    // contact details
    const [gurdianDetails, setGuardian] = useState('');
    const [email, setEmail] = useState('');
    const [emergency, setEmergency] = useState('');

    // govt ID
    const [idType, setIdType] = useState('');
    const [governmentId, setGovernmentId] = useState('');
    const [isValidGovtID, setIsValidGovtID] = useState(true);
    const handleIdTypeChange = (event) => {
        const { value } = event.target;
        setIdType(value);
        setGovernmentId('');
        setIsValidGovtID(true);
    };

    const handleGovernmentIdChange = (event) => {
        const { value } = event.target;
        setIsValidGovtID(true);
        if (idType === 'aadhar') {
            // Validate Aadhar ID
            const aadharRegex = /^\d{12}$/;
            if (!aadharRegex.test(value)) {
                setIsValidGovtID(false);
            }
        } else if (idType === 'pan') {
            // Validate PAN ID
            const panRegex = /^[A-Za-z]{5}\d{4}[A-Za-z]$/;
            if (!panRegex.test(value)) {
                setIsValidGovtID(false);
            }
        }
        setGovernmentId(value);
    };

    // address details
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('India');
    const [pincode, setPincode] = useState('');

    // other details
    const [occupation, setOccupation] = useState('');
    const [religion, setReligion] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [nationality, setNationality] = useState('India');

    function onSubmitHandler(event) {
        event.preventDefault();
    }
    useEffect(() => {
        console.log(data)
    }, [])

    return (

        <form onSubmit={onSubmitHandler}>
            <div className='personal-details'>
                <div className='row'>
                    <span className='col field'>Personal Details</span>
                </div>
                <div className='row'>
                    <div className='col-4 field'>
                        <label>Name</label>
                        <input type='text' placeholder='Enter Name'
                            name='name' value={name}
                            onChange={(event) => setName(event.target.value)} required />
                    </div>
                    <div className='col-3 field'>
                        <label>Date of Birth or Age</label>
                        <input type='date' placeholder='DD/MM/YYYY or Age in Years'
                            name='age'
                            value={DOB}
                            onChange={(event) => setDOB(event.target.value)} required />
                    </div>
                    <div className='col-3 field'>
                        <label>Sex</label>
                        <select name="sex" id="sex" placeholder='Enter Sex'
                            value={sex}
                            onChange={(event) => setSex(event.target.value)} required>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 field'>
                        <label>Mobile Number</label>
                        <input type="text" id="mobile-number" name="mobile-number"
                            value={mobileNumber} onChange={handleMobileNumberChange}
                            placeholder='Enter Mobile' />
                        {!isValidMobile && <span style={{ color: 'red' }}>Please enter a valid mobile number</span>}
                    </div>
                    <div className='col-8 field'>
                        <label>Govt Issued ID</label>
                        <select id="id-type" placeholder='ID Type' name="id-type" value={idType} onChange={handleIdTypeChange}>
                            <option value="">Select ID Type</option>
                            <option value="aadhar">Aadhar</option>
                            <option value="pan">PAN</option>
                        </select>

                        <input type="text" id="government-id"
                            name="government-id" placeholder='Enter Govt ID'
                            value={governmentId} onChange={handleGovernmentIdChange} />
                        {!isValidGovtID && <span style={{ color: 'red' }}>Please enter a valid government ID</span>}
                    </div>
                </div>
            </div>
            {/* contact details */}
            <div className='contact-details'>
                <div className='row'>
                    <span>Contact Details</span>
                </div>
                <div className='row input-section'>
                    <div className='col-4 field'>
                        <label>Guardian Details</label>
                        <select id="label" placeholder='Enter Label'
                            name="Label" value={gurdianDetails}
                            onChange={(event) => setGuardian(event.target.value)}>
                            <option value="">Enter Label</option>
                            <option value="aadhar">Mr.</option>
                            <option value="pan">Mrs</option>
                        </select>
                        <input type='text' placeholder='Enter Guardian Name' name='Guardian Name' />
                    </div>
                    <div className='col field'>
                        <label>Email</label>
                        <input type='email' placeholder='Enter Email'
                            name='Email' value={email}
                            onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className='col field'>
                        <label>Emergency Contact Number</label>
                        <input type='number' placeholder='Enter Emergency No'
                            name='Emergency Number' value={emergency}
                            onChange={(event) => setEmergency(event.target.value)} />
                    </div>
                </div>
            </div>
            {/* {Address Details} */}
            <div className='address-details'>
                <div className='row'>
                    <span>Address Details</span>
                </div>
                <div className='row'>
                    <div className='col-4 field'>
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            placeholder='Enter Address' />
                    </div>
                    <div className='col field'>
                        <label htmlFor="state">State</label>
                        <select id="state" name="state"
                            value={state}
                            onChange={(event) => setState(event.target.value)}
                            placeholder='Enter State'>
                            {
                                data.map((index) => <>
                                    <option value={index.states}>{index.states}</option>
                                </>)
                            }
                        </select>
                    </div>
                    <div className='col field'>
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            placeholder='Enter City/Town/Village' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 field'>
                        <label htmlFor="country">Country</label>
                        <select id="country" name="country"
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}>
                            <option value="India">India</option>
                        </select>
                    </div>
                    <div className='col field'>
                        <label htmlFor="pincode">Pincode</label>
                        <input type="text" id="pincode"
                            name="pincode" value={pincode}
                            onChange={(event) => setPincode(event.target.value)} />
                    </div>

                </div>
            </div>
            {/* {other details} */}
            <div className='other-details'>
                <div className='row'>
                    <span>Other Details</span>
                </div>
                <div className='row'>
                    <div className='col field'>
                        <label>Occupation</label>
                        <input type="text" id="occupation" name="occupation" value={occupation} onChange={(event) => setOccupation(event.target.value)} />
                    </div>
                    <div className='col field'>
                        <label>Religion</label>
                        <select id="religion" name="religion"
                            value={religion}
                            onChange={(event) => setReligion(event.target.value)}>
                            <option value="">Enter Religion</option>
                            <option value="Hinduism">Hinduism</option>
                            <option value="Islam">Islam</option>
                            <option value="Christianity">Christianity</option>
                            <option value="Sikhism">Sikhism</option>
                            <option value="Buddhism">Buddhism</option>
                            <option value="Jainism">Jainism</option>
                            <option value="Zoroastrianism">Zoroastrianism</option>
                            <option value="Other">Other</option>
                        </select></div>
                    <div className='col field'>
                        <label>Marital Status</label>
                        <select id="maritalStatus" name="maritalStatus"
                            value={maritalStatus}
                            onChange={(event) => setMaritalStatus(event.target.value)}>
                            <option value="">-- Select --</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                        </select>
                    </div>
                    <div className='col field'>
                        <label>Blood Group</label>
                        <select id="bloodGroup" name="bloodGroup"
                            value={bloodGroup}
                            onChange={(event) => setBloodGroup(event.target.value)}>
                            <option value="">-- Select --</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col field'>
                        <label>Nationality</label>
                        <select id="nationality" name="nationality" value={nationality} onChange={(event) => setNationality(event.target.value)}>
                            <option value="India">India</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='buttons'>
                <button>Cancel</button>
                <button>Submit</button>
            </div>
        </form>

    );
}

export default FormTest;