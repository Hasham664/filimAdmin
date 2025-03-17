'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Advancing from './Advancing';
import TopListing from './TopListing';
import Robot from './Robot';
import Competition from './Competition';
import Runway from './Runway';

const Hero = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  console.log(image);

  const [advance, setAdvance] = useState({
    title: '',
    title2: '',
    description: '',
  });

  const [advanceImage, setAdvanceImage] = useState(false);

  const [toplist, setToplist] = useState({
    title: '',
    description: '',
    button: '',
  });

  const [toplistImage, setToplistImage] = useState(false);

  const [robot, setRobot] = useState({
    title: '',
    description: '',
    button: '',
  });

  const [robotImage, setRobotImage] = useState(false);

  const [competate, setCompetate] = useState({
    title: '',
    button: '',
  });

  const [competateImage, setCompetateImage] = useState(false);

  const [runway, setRunway] = useState({
    title: '',
    button: '',
  });

  const [runwayImage, setRunwayImage] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            'http://localhost:4000/api/service/getservice'
          );
          console.log(data.services[0], 'response get api');
  
          const homeData = data.services[0];
          if (homeData?.hero) {
            setTitle(homeData.hero.title || '');
          
            setImage(homeData.hero.bgImage || '');
          }
          if (homeData?.advance) {
            setAdvance(homeData.advance);
            setAdvanceImage(homeData.advance.bgImage);
          }
          if (homeData?.toplist) {
            setToplist(homeData.toplist);
            setToplistImage(homeData.toplist.bgImage);
          }
          if (homeData?.robot) {
            setRobot(homeData.robot);
            setRobotImage(homeData.robot.bgImage);
          }
          if (homeData?.competate) {
            setCompetate(homeData.competate);
            setCompetateImage(homeData.competate.bgImage);
          }
          if (homeData?.runway) {
            setRunway(homeData.runway);
            setRunwayImage(homeData.runway.bgImage);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error('Error fetching data');
        }
      };
  
      fetchData();
    }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      const hero = {
        title,
        
      };
      formData.append('hero', JSON.stringify(hero));
      formData.append('advance', JSON.stringify(advance));
      formData.append('toplist', JSON.stringify(toplist));
      formData.append('robot', JSON.stringify(robot));
      formData.append('competate', JSON.stringify(competate));
      formData.append('runway', JSON.stringify(runway));

      if (image) {
        formData.append('heroImage', image);
      }
      if (advanceImage) {
        formData.append('advanceImage', advanceImage);
      }
      if (toplistImage) {
        formData.append('toplistImage', toplistImage);
      }
      if (robotImage) {
        formData.append('robotImage', robotImage);
      }
      if (competateImage) {
        formData.append('competateImage', competateImage);
      }
      if (runwayImage) {
        formData.append('runwayImage', runwayImage);
      }
      const response = await axios.post(
        'http://localhost:4000/api/service/serviceRoute',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success('Hero data submitted successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=''>
      <div className=' p-4 border'>
        <h1 className='mt-4 mb-12 text-center text-3xl font-semibold'>
          HERO SECTION
        </h1>{' '}
        <form>
          {' '}
          <div className='rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36'>
            {' '}
            <label
              htmlFor='upload2'
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
              <span className='text-gray-600 font-medium'>Upload file</span>
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              id='upload2'
              type='file'
              accept='video/*'
              className='hidden'
            />
          </div>
          {/* Image Preview */}
          {image && (
            <div className='mt-4'>
              <video
                src={
                  typeof image === 'string' ? image : URL.createObjectURL(image)
                }
                alt='Preview'
                className='w-36 h-auto'
              />
            </div>
          )}
          {/* Text Input Fields */}
          <div className='mt-8'>
            <div className='mb-4'>
              <h1 className='text-black'>TITLE</h1>
              <input
                type='text'
                placeholder='Title'
                className='border border-black px-3 py-2 mt-2 outline-0 w-full'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      {/* Other components on the home page */}
      <Advancing
        advance={advance}
        setAdvance={setAdvance}
        advanceImage={advanceImage}
        setAdvanceImage={setAdvanceImage}
      />
      <TopListing
        toplist={toplist}
        setToplist={setToplist}
        toplistImage={toplistImage}
        setToplistImage={setToplistImage}
      />
      <Robot
        robot={robot}
        setRobot={setRobot}
        robotImage={robotImage}
        setRobotImage={setRobotImage}
      />
      <Competition
        competate={competate}
        setCompetate={setCompetate}
        competateImage={competateImage}
        setCompetateImage={setCompetateImage}
      />
      <Runway
        runway={runway}
        setRunway={setRunway}
        runwayImage={runwayImage}
        setRunwayImage={setRunwayImage}
      />
      <div className='flex justify-end mt-8 mb-8'>
        <button
          onClick={handleSubmit}
          type='submit'
          disabled={loading}
          className='bg-blue-600 hover:bg-blue-800 cursor-pointer text-white px-12 py-2 rounded-sm text-right'
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default Hero;
