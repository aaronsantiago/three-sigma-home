import Head from 'next/head'
import LogoVideo from '@/components/LogoVideo'
import Scene1 from '@/components/Scene1'
import Scene2 from '@/components/Scene2'
import InstancedGrid from '@/components/InstancedGrid'
var faker = require('faker');

export default function Home() {
  return (
    <>
    <Head></Head>
    <div className="mx-96 my-24 relative z-10 text-white">{faker.lorem.lines(1000)}</div>
    <InstancedGrid></InstancedGrid>
    {/* <LogoVideo></LogoVideo>
    <Scene1></Scene1>
    <Scene2></Scene2> */}
    </>
    
  )
}
