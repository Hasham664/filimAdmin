// 'use client';
// import React, { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import Hero from '@/component/mainComponents/home/Hero';
// const Navbar = () => {
//   const [formData, setFormData] = useState({
//     service: '',
//     studio: '',
//     festival: '',
//     news: '',
//     contact: '',
//   });
//   const [image, setImage] = useState(null);
//   // Loading state for form submission
//   const [loading, setLoading] = useState(false);

  

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

  

  

//   return (
//     <div className='p-4 border'>
//       <ToastContainer />
//       <form>
//         {/* File Upload Section */}
//         <div className='rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36'>
//           <label
//             htmlFor='upload'
//             className='flex flex-col items-center gap-2 cursor-pointer'
//           >
//             <svg
//               xmlns='http://www.w3.org/2000/svg'
//               className='h-10 w-10 fill-white stroke-indigo-500'
//               viewBox='0 0 24 24'
//               stroke='currentColor'
//               strokeWidth='2'
//             >
//               <path
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
//               />
//             </svg>
//             <span className='text-gray-600 font-medium'>Upload file</span>
//           </label>
//           <input
//             onChange={handleFileChange}
//             id='upload'
//             type='file'
//             className='hidden'
//           />
//         </div>

//         {image && (
//           <div className='mt-4'>
//             <img src={image} alt='Preview' className='w-36 h-auto' />
//           </div>
//         )}

//         <div className='flex flex-wrap gap-6 items-end w-full mt-12'>
//             <div className='bg-white rounded-lg'>
//               <div className='relative bg-inherit'>
//                 <input
//                   type='text'
//                   // id={field.name}
//                   // name={field.name}
//                   // value={formData[field.name]}
//                   // onChange={handleChange}
//                   placeholder=''
//                   className='border-2 border-black p-3 peer bg-transparent placeholder-transparent focus:ring-sky-600 focus:outline-none focus:border-rose-600'
//                 />
//                 <label
//                   htmlFor=''
//                   className='absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-2 
//                              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
//                              peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all'
//                 >
//                 </label>
//               </div>
//             </div>

//           {/* Submit Button */}
//           <div className='mt-4'>
//             {loading ? (
//               <button
//                 type='button'
//                 disabled
//                 className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
//                            focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 inline-flex items-center'
//               >
//                 <svg
//                   aria-hidden='true'
//                   role='status'
//                   className='inline w-4 h-4 me-3 text-white animate-spin'
//                   viewBox='0 0 100 101'
//                   fill='none'
//                   xmlns='http://www.w3.org/2000/svg'
//                 >
//                   <path
//                     d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
//                     fill='#E5E7EB'
//                   />
//                   <path
//                     d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
//                     fill='currentColor'
//                   />
//                 </svg>
//                 Loading...
//               </button>
//             ) : (
//               <button
//                 type='submit'
//                 className='bg-blue-600 hover:bg-blue-800 text-white px-12 p-2 rounded-sm'
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Navbar;


import React from 'react'

const Navbar = () => {
  return (
    <div className='text-center text-2xl'>Navbar</div>
  )
}

export default Navbar