'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  // State for text fields and image URLs
  const [navbarData, setNavbarData] = useState({
    service: '',
    studio: '',
    festival: '',
    news: '',
    contact: '',
    logo: '',
    tiktokIcon: '',
    youtubeIcon: '',
    instaIcon: '',
    twitterIcon: '',
  });
  console.log(navbarData, 'navbarData');

  // File states for logo and icon images
  const [logoImage, setLogoImage] = useState(null);
  const [tiktokIconFile, setTiktokIconFile] = useState(null);
  const [youtubeIconFile, setYoutubeIconFile] = useState(null);
  const [instaIconFile, setInstaIconFile] = useState(null);
  const [twitterIconFile, setTwitterIconFile] = useState(null);

  const [loading, setLoading] = useState(false);
  // Navbar document id if it already exists
  const [navbarId, setNavbarId] = useState(null);

  // On mount, fetch Navbar data using GET API and update text fields from nav.links
  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/navbar`
        );
        if (data.navbar && data.navbar.length > 0) {
          const nav = data.navbar[0];
          setNavbarId(nav._id);

          // Build an object from nav.links array for easier access
          const linksObj = {};
          if (Array.isArray(nav.links)) {
            nav.links.forEach((link) => {
              // Using lower case keys (e.g., 'service') for matching
              linksObj[link.name.toLowerCase()] = link.link;
            });
          }

          setNavbarData({
            service: linksObj.service || '',
            studio: linksObj.studio || '',
            festival: linksObj.festival || '',
            news: linksObj.news || '',
            contact: linksObj.contact || '',
            logo: nav.logo || '',
            tiktokIcon: nav.tiktokIcon || '',
            youtubeIcon: nav.youtubeIcon || '',
            instaIcon: nav.instaIcon || '',
            twitterIcon: nav.twitterIcon || '',
          });
        }
      } catch (error) {
        toast.error('Error fetching Navbar data');
        console.error(error);
      }
    };

    fetchNavbar();
  }, []);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNavbarData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change for logo image
  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoImage(e.target.files[0]);
    }
  };

  // Generic handler for icon file input change
  const handleIconChange = (e, setter) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  // Handle form submission: send text fields and files via FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      // Append text fields individually
      formData.append('service', navbarData.service);
      formData.append('studio', navbarData.studio);
      formData.append('festival', navbarData.festival);
      formData.append('news', navbarData.news);
      formData.append('contact', navbarData.contact);

      // Append file fields if new files are selected
      if (logoImage) {
        formData.append('logoImage', logoImage);
      }
      if (tiktokIconFile) {
        formData.append('tiktokIcon', tiktokIconFile);
      }
      if (youtubeIconFile) {
        formData.append('youtubeIcon', youtubeIconFile);
      }
      if (instaIconFile) {
        formData.append('instaIcon', instaIconFile);
      }
      if (twitterIconFile) {
        formData.append('twitterIcon', twitterIconFile);
      }

      let response;
      if (navbarId) {
        // Update existing Navbar document
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/navbar/${navbarId}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success('Navbar updated successfully!');
      } else {
        // Create new Navbar document
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/navbar`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setNavbarId(response.data.navbar._id);
        toast.success('Navbar created successfully!');
      }
      console.log('Response:', response.data);
    } catch (error) {
      toast.error('Error submitting data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4 border'>
      <ToastContainer />

      {/* Logo Upload Section */}
      <div className='mb-4'>
        <div className='rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36'>
          <label
            htmlFor='logoUpload'
            className='flex flex-col items-center gap-2 cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-10 w-10 fill-white stroke-indigo-500'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
            <span className='text-gray-600 font-medium'>Upload Logo</span>
          </label>
          <input
            id='logoUpload'
            type='file'
            accept='image/*'
            onChange={handleLogoChange}
            className='hidden'
          />
        </div>
        {logoImage ? (
          <div className='mt-4'>
            <img
              src={URL.createObjectURL(logoImage)}
              alt='New Logo Preview'
              className='w-36 h-auto'
            />
          </div>
        ) : (
          navbarData.logo && (
            <div className='mt-4'>
              <img
                src={navbarData.logo}
                alt='Logo Preview'
                className='w-36 h-auto'
              />
            </div>
          )
        )}
      </div>

      {/* Icon Uploads Section */}
      <div className='mb-4 grid grid-cols-2 gap-4'>
        {/* Tiktok Icon */}
        <div className='rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md'>
          <label
            htmlFor='tiktokUpload'
            className='flex flex-col items-center gap-2 cursor-pointer'
          >
            <span className='text-gray-600 font-medium'>
              Upload Tiktok Icon
            </span>
          </label>
          <input
            id='tiktokUpload'
            type='file'
            accept='image/*'
            onChange={(e) => handleIconChange(e, setTiktokIconFile)}
            className='hidden'
          />
          {tiktokIconFile ? (
            <div className='mt-2'>
              <img
                src={URL.createObjectURL(tiktokIconFile)}
                alt='Tiktok Icon Preview'
                className='w-16 h-auto'
              />
            </div>
          ) : (
            navbarData.tiktokIcon && (
              <div className='mt-2'>
                <img
                  src={navbarData.tiktokIcon}
                  alt='Tiktok Icon'
                  className='w-16 h-auto'
                />
              </div>
            )
          )}
        </div>

        {/* Youtube Icon */}
        <div className='rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md'>
          <label
            htmlFor='youtubeUpload'
            className='flex flex-col items-center gap-2 cursor-pointer'
          >
            <span className='text-gray-600 font-medium'>
              Upload Youtube Icon
            </span>
          </label>
          <input
            id='youtubeUpload'
            type='file'
            accept='image/*'
            onChange={(e) => handleIconChange(e, setYoutubeIconFile)}
            className='hidden'
          />
          {youtubeIconFile ? (
            <div className='mt-2'>
              <img
                src={URL.createObjectURL(youtubeIconFile)}
                alt='Youtube Icon Preview'
                className='w-16 h-auto'
              />
            </div>
          ) : (
            navbarData.youtubeIcon && (
              <div className='mt-2'>
                <img
                  src={navbarData.youtubeIcon}
                  alt='Youtube Icon'
                  className='w-16 h-auto'
                />
              </div>
            )
          )}
        </div>

        {/* Instagram Icon */}
        <div className='rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md'>
          <label
            htmlFor='instaUpload'
            className='flex flex-col items-center gap-2 cursor-pointer'
          >
            <span className='text-gray-600 font-medium'>
              Upload Instagram Icon
            </span>
          </label>
          <input
            id='instaUpload'
            type='file'
            accept='image/*'
            onChange={(e) => handleIconChange(e, setInstaIconFile)}
            className='hidden'
          />
          {instaIconFile ? (
            <div className='mt-2'>
              <img
                src={URL.createObjectURL(instaIconFile)}
                alt='Instagram Icon Preview'
                className='w-16 h-auto'
              />
            </div>
          ) : (
            navbarData.instaIcon && (
              <div className='mt-2'>
                <img
                  src={navbarData.instaIcon}
                  alt='Instagram Icon'
                  className='w-16 h-auto'
                />
              </div>
            )
          )}
        </div>

        {/* Twitter Icon */}
        <div className='rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md'>
          <label
            htmlFor='twitterUpload'
            className='flex flex-col items-center gap-2 cursor-pointer'
          >
            <span className='text-gray-600 font-medium'>
              Upload Twitter Icon
            </span>
          </label>
          <input
            id='twitterUpload'
            type='file'
            accept='image/*'
            onChange={(e) => handleIconChange(e, setTwitterIconFile)}
            className='hidden'
          />
          {twitterIconFile ? (
            <div className='mt-2'>
              <img
                src={URL.createObjectURL(twitterIconFile)}
                alt='Twitter Icon Preview'
                className='w-16 h-auto'
              />
            </div>
          ) : (
            navbarData.twitterIcon && (
              <div className='mt-2'>
                <img
                  src={navbarData.twitterIcon}
                  alt='Twitter Icon'
                  className='w-16 h-auto'
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Form for text inputs */}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block mb-1'>Service</label>
          <input
            type='text'
            name='service'
            value={navbarData.service}
            onChange={handleInputChange}
            className='border p-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1'>Studio</label>
          <input
            type='text'
            name='studio'
            value={navbarData.studio}
            onChange={handleInputChange}
            className='border p-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1'>Festival</label>
          <input
            type='text'
            name='festival'
            value={navbarData.festival}
            onChange={handleInputChange}
            className='border p-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1'>News</label>
          <input
            type='text'
            name='news'
            value={navbarData.news}
            onChange={handleInputChange}
            className='border p-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1'>Contact</label>
          <input
            type='text'
            name='contact'
            value={navbarData.contact}
            onChange={handleInputChange}
            className='border p-2 w-full'
          />
        </div>
        <div className='flex justify-end mt-8'>
          <button
            type='submit'
            disabled={loading}
            className='bg-blue-600 hover:bg-blue-800 text-white px-12 py-2 rounded-sm'
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Navbar;
