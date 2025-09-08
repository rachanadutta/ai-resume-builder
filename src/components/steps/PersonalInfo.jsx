import React from 'react';
import { useState } from 'react';

export default function PersonalInfo({formData,setFormData, nextStep}){
    return(
    <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold mb-4'>Personal Information</h2>
        <label className='text-lg font-semibold' htmlFor="name">Full Name</label>
        <input  className='border caret-black p-2 rounded '
        type="text"
        name="name"
        value={formData.name}
        onChange={(e)=> setFormData({...formData, name:e.target.value})}
        placeholder='Enter your Full Name' />
        <label className='text-lg font-semibold' htmlFor="title">Title</label>
        <input  className='border caret-black p-2 rounded '
        type="text"
        name="title"
        value={formData.title}
        onChange={(e)=> setFormData({...formData, title:e.target.value})}
        placeholder='Enter your Professional Title' />

        <label className='text-lg font-semibold' htmlFor="email">Email Address</label>
        <input className='border caret-black p-2 rounded '
        type="email"
        name="email"
        value={formData.email}
        onChange={(e)=> setFormData({...formData, email:e.target.value})}
        placeholder='Enter your Email' />
        <label className='text-lg font-semibold' htmlFor="phone">Phone Number</label>
        <input className='border caret-black p-2 rounded '
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={(e)=> setFormData({...formData, phone:e.target.value})}
        placeholder='Enter your Phone Number' />

        <label className='text-lg font-semibold' htmlFor="github">GitHub</label>
        <input className='border p-2 caret-black rounded '
        type="url"
        id='github'
        name='github'
        value={formData.github}
        onChange={(e)=> setFormData({...formData,github:e.target.value})}
        placeholder='Enter your GitHub Link' />
    
        <label className='text-lg font-semibold' htmlFor="linkedin">LinkedIn</label>
        <input className='border p-2 caret-black rounded '
        type="url"
        id='linkedin'
        name='linkedin'
        value={formData.linkedin}
        onChange={(e)=> setFormData({...formData,linkedin:e.target.value})}
        placeholder='Enter your LinkedIn Link' />

        <label className='text-lg font-semibold' htmlFor="portfolio">Portfolio</label>
        <input className='border p-2 caret-black rounded '
        type="url"
        id='portfolio'
        name='portfolio'
        value={formData.portfolio}
        onChange={(e)=> setFormData({...formData,portfolio:e.target.value})}
        placeholder='Enter your Portfolio Link' />
<div className='flex justify-end mt-6'>
     
        <button className='border-2 px-3 py-2 rounded-lg cursor-pointer bg-blue-400 text-white hover:bg-blue-700' type="button" onClick={nextStep}>Next</button>
       
        </div>
    </div>
    );
}