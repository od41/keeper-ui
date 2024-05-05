import React from 'react'
import {PoolsDataCards} from './_components/pools-data-cards'
import { PoolsHistory } from './_components/pools-history'

const PoolsPage = () => {
  return (
    <div className='flex flex-col gap-8 mb-8'>
      <PoolsDataCards />
      <PoolsHistory />
    </div>
  )
}

export default PoolsPage