import { useEffect, useState } from 'react';
import './formTest.css'
import stateDb from '../../data/states.json';
import { object, string, number, date, InferType } from 'yup';
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    age: yup.string().required('Age is required'),
    sex: yup.string().required('Sex is required'),
    mobile: yup.string()
        .matches(/^[6-9]\d{9}$/, 'Mobile number is not valid')
        .required('Mobile number is required'),
    emergencyContactNumber: yup.string()
        .matches(/^[6-9]\d{9}$/, 'Emergency contact number is not valid')
        .required('Emergency contact number is required'),
    // govtIdType: yup.string().required('Govt ID Type is required'),
    // govtId: yup.string().when('govtIdType', {
    //     is: 'Aadhar',
    //     then: yup.string()
    //         .matches(/^\d{12}$/, 'Aadhar number is not valid')
    //         .required('Aadhar number is required'),
    //     otherwise: yup.string()
    //         .matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, 'PAN number is not valid')
    //         .required('PAN number is required'),
    // }),
});

const Form2 = () => {

    const [index , setIndex] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };




    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='personal-details'>
                    <div className='row'>
                        <span className='col field'>Personal Details</span>
                    </div>
                    <div className='row'>
                        <div className='col-4 field'>
                            <label>Name</label>
                            <input type='text' placeholder='Enter Name' {...register("name")} />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div className='col-3 field'>
                            <label>Date of Birth or Age</label>
                            <input type='text' placeholder='DD/MM/YYYY or Age in Years'
                                {...register('age')} />
                            {errors.age && <p>{errors.age.message}</p>}
                        </div>
                        <div className='col-3 field'>
                            <label>Sex</label>
                            <select {...register('sex')} id="sex" placeholder='Enter Sex' >
                                <option value="" defaultChecked disabled>Enter Sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                            {errors.sex && <p>{errors.sex.message}</p>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4 field'>
                            <label>Mobile Number</label>
                            <input type="text" id="mobile-number" {...register('mobile')} placeholder='Enter Mobile' />
                            {errors.mobile && <p>{errors.mobile.message}</p>}
                        </div>
                        {/* <div className='col-8 field'>
                            <label>Govt Issued ID</label>
                            <select id="id-type" placeholder='ID Type' {...register('govtIdType')}>
                                <option value="">Select ID Type</option>
                                <option value="aadhar">Aadhar</option>
                                <option value="pan">PAN</option>
                            </select>
                            {errors.govtIdType && <p>{errors.govtIdType.message}</p>}


                            <input type="text" id="government-id"
                                {...register('govtId')} placeholder='Enter Govt ID' />
                            {errors.govtId && <p>{errors.govtId.message}</p>}
                        </div> */}
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
                                {...register('Label')}
                            >
                                <option value="">Enter Label</option>
                                <option value="aadhar">Mr.</option>
                                <option value="pan">Mrs</option>
                            </select>
                            <input type='text' placeholder='Enter Guardian Name' {...register('Guardian Name')} />
                        </div>
                        <div className='col field'>
                            <label>Email</label>
                            <input type='email' placeholder='Enter Email'
                                {...register('Email')}
                            />
                        </div>
                        <div className='col field'>
                            <label>Emergency Contact Number</label>
                            <input type='text' placeholder='Enter Emergency No'
                                {...register('emergencyContactNumber')}
                            />
                            {errors.emergencyContactNumber && <p>{errors.emergencyContactNumber.message}</p>}
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
                            <input type="text" id="address" {...register('address')}


                                placeholder='Enter Address' />
                        </div>
                        <div className='col field'>
                            <label htmlFor="state">State</label>
                            <select id="state" {...register('state')}
                                placeholder='Enter State'>
                                {
                                    stateDb.map((index) => <>
                                        <option value={index.states}>{index.states}</option>
                                    </>)
                                }
                            </select>
                        </div>
                        <div className='col field'>
                            <label htmlFor="city">City</label>
                            <select id="city" {...register('city')}
                                placeholder='Enter City'>
                                {
                                    stateDb[index].cities.map((index) => <>
                                        <option value={index.states}>{index.city}</option>
                                    </>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4 field'>
                            <label htmlFor="country">Country</label>
                            <select id="country" {...register('country')} >
                                <option value="India">India</option>
                            </select>
                        </div>
                        <div className='col field'>
                            <label htmlFor="pincode">Pincode</label>
                            <input type='number' id='pincode' {...register('pincode')} />
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
                            <input type="text" id="occupation" {...register('occupation')} />
                        </div>
                        <div className='col field'>
                            <label>Religion</label>
                            <select id="religion" {...register('religion')}

                            >
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
                            <select id="maritalStatus" {...register('maritalStatus')}

                            >
                                <option value="">-- Select --</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                            </select>
                        </div>
                        <div className='col field'>
                            <label>Blood Group</label>
                            <select id="bloodGroup" {...register('bloodGroup')}

                            >
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
                            <select id="nationality" {...register('nationality')}>
                                <option value="India">India</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='buttons'>
                    <button>Cancel</button>
                    {/* <button type='submit'>Submit</button> */}
                    <input type="submit" />
                </div>
            </form>

        </div>
    )
}

export default Form2