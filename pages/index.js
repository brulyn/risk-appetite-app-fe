import Head from 'next/head'
import DetailsScreen from '../components/detailsSection'
import MainScreen from '../components/mainScreen'
import SideBar from '../components/sidebar'


export default function Home() {
  return (
    <div className="flex min-h-screen">
      <SideBar/>
      <MainScreen/>
      <DetailsScreen/>
      
    </div>
  )
}
