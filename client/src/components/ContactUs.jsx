import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import backgroundImage from '../assets/login-bg.jpg';

const ContactUs = () => {
    const [state, handleSubmit] = useForm("xwpeewby");

    if (state.succeeded) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="bg-[#272727] bg-opacity-75 p-6 sm:p-6 md:p-8 rounded shadow-lg max-w-md w-full text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Thank you for your message!</h2>
                    <p className="text-gray-300">We will get back to you soon.</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="bg-[#272727] bg-opacity-75 p-6 sm:p-6 md:p-8 rounded shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold mb-6 text-white text-center">Contact Us</h2>
                <form onSubmit={handleSubmit} action={process.env.REACT_APP_FORM_ENDPOINT} method="POST">
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className="mt-1 block w-full bg-transparent border border-white rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-base text-white p-3"
                            required
                        />
                        <ValidationError
                            prefix="Name"
                            field="name"
                            errors={state.errors}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="mt-1 block w-full bg-transparent border border-white rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-base text-white p-3"
                            required
                        />
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                        />
                    </div>
                    <div className="mb-6">
                        <ValidationError
                            prefix="Location"
                            field="location"
                            errors={state.errors}
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            className="mt-1 block w-full bg-transparent border border-white rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-base text-white p-3"
                            required
                        />
                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={state.submitting}
                        className="w-full bg-[#FFC30D] text-white text-lg font-bold py-3 px-4 rounded hover:bg-[#ecc245] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
