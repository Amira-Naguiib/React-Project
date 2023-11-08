import React, { useContext } from 'react'
import styles from './Home.module.css'
import FeatureProduct from '../FeatureProduct/FeatureProduct'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from './../MainSlider/MainSlider';

export default function Home() {

  return (
    <>
    <MainSlider/>
    <CategoriesSlider/>
      <FeatureProduct/>
    </>
  )
}
