import React from 'react'
import Hero from '../components/Hero'
import Category from '../components/Category'
import BestSeller from '../components/BestSeller'
import NewLetter from '../components/NewLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='mt-10'>
      <Hero />
      <Category />
      <BestSeller />
      <NewLetter />
      
    </div>
  )
}

export default Home;

/*
Explanation:

- This is the Home page of the application.
- It imports and renders three components:
  1. <Hero />: Likely a top banner or promotional section.
  2. <Category />: Displays various product categories to explore.
  3. <BestSeller />: Showcases top-selling or featured products.
- The container has top margin using Tailwind CSS class `mt-10` for spacing.

Summary:

This page acts as the landing/home page of the application.
It introduces the user to the platform with a hero banner, highlights product categories, and promotes best-selling items.
*/
