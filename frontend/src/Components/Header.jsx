import React from "react";
import {assets} from "../assets/assets.js";

const Header=()=>{

     return (
         <div className="flex flex-col md:flex-row flex-wrap bg-blue-900 rounded-lg px-6 md:px-10 lg:px-20">
             {/*--left side of the header*/}
             <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
                 <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
                     Connecting You <br/> to Trusted Doctors
                 </p>
                 <div className="flex flex-col md:flex-row items-centre gap-3 text-white text-sm font-light">
                     <img  className="w-16 sm:w-20 md:w-28 lg:w-36 xl:w-44" src={assets.group_profiles} alt="group profiles" />
                     <p>
                         Book your appointments easily and efficiently.<br className="hidden sm:block"/> Our platform offers a seamless experience to
                         find the right doctor for your needs.
                     </p>
                 </div>
                 <a href="#speciality" className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300">
                     Book appointment
                     <img className='w-3' src={assets.arrow_icon} alt="arrow_icon" />
                 </a>

             </div>
             {/*right side of the header */}
             <div className="md:w-1/2 relative">
                <img className="w-full md:absolute bottom-0 h-auto rounded-lg" src={assets.header_img} alt=""/>
             </div>

         </div>
     )

 }
 export default Header;