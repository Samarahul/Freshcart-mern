import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='relative'>
      <img src={assets.main_banner_bg} alt="" className='hidden md:block w-full' /> 
      <img src={assets.main_banner_bg_sm} alt="" className='md:hidden w-full' /> 
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24'>
        <h1 className='text-3xl md:text-4xl font-bold text-center md:text-left text-black max-w-72 md:max-w-80 leading-tight lg:leading-[60px]'>
          Freshness You Can Trust, Savings You Will Love!
        </h1>
        <div className='flex items-center mt-6 font-medium gap-6'>
            <Link to='/products' className='flex group items-center gap-2 px-7 rounded text-white py-3 bg-primary cursor-pointer'>Shop Now
            <img src={assets.white_arrow_icon} alt="" className='md:hidden transition group-focus:translate-x-1' />
            </Link>
            <Link to='/products' className='hidden md:flex group items-center gap-2 px-7 rounded text-white py-3 bg-primary cursor-pointer'>Explore Deals
            <img src={assets.white_arrow_icon} alt="" className='md:hidden transition group-focus:translate-x-1' />
            </Link>
        </div>
      </div> 
    </div>
  );
}

export default Hero;

/*
Explanation:
the  line number 8 indicates that it is hidden on small devices and the image width will be maximum and can be seen in medium,large devices
the kine number 9 tells us the md:hidden means it is hidden on meduim devices and visibe to small devices


- This component renders a responsive "Hero" banner section for the homepage.
- It uses two images:
  - `main_banner_bg` for medium and larger screens.
  - `main_banner_bg_sm` for small screens.
- A title is overlaid on the banner using absolute positioning and Tailwind utility classes.
- Below the title, two buttons are rendered as <Link> elements:
  - "Shop Now" is shown on mobile.
  - "Explore Deals" is shown on desktop.
- The buttons navigate to the `/products` page and include an arrow icon.

Summary:

The Hero component serves as a visually appealing banner at the top of the homepage.
It promotes key marketing text and provides responsive call-to-action buttons for navigation.
It adapts seamlessly across screen sizes with separate layouts and visuals for mobile and desktop.
*/
