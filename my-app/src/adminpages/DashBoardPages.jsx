import React from 'react'
import Title from './components/DashBoard/Title'
import DashboardCards from './components/DashBoard/DashBoardCards'
import DashBoardTakip from './components/DashBoard/DashBoardTakip'

const DashBoardPages = () => {
  return (
 <div style={{ height: '74vh', display: 'flex', flexDirection: 'column' }}>
   
<Title/>
<DashboardCards/>
<DashBoardTakip/>
    </div>  )
}

export default DashBoardPages