import React from "react";
import { assets } from "../assets/assets.js";

const Footer = () => {
    return (
        <div className="md:mx-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-14 my-10 mt-40 text-sm">
                <div className="flex flex-col items-start">
                    <img className="mb-5 w-40" src={assets.logo} alt="logo" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6">
                        "Good health is not just about treating illness,
                        but about fostering a lifestyle of balance, prevention, and proactive care."<br/>

                    </p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">Get in touch</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+91 72250-72883</li>
                        <li>soniya.04malviya@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className="mt-5">
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2024 @ CureConnect - All Right Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
