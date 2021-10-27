import Head from 'next/head'
import LogoVideo from '@/components/LogoVideo'
import Scene1 from '@/components/Scene1'
import Scene2 from '@/components/Scene2'
import InstancedGrid from '@/components/InstancedGrid'
import LeafScene from '@/components/LeafScene'
import xhr from 'xmlhttprequest';
import CustomCursor from '@/components/CustomCursor'
var faker = require('faker');

export default function Cube() {
  return (
    <>
    <Head></Head>
    <div className="mx-96 my-24 relative z-10 text-white">{faker.lorem.lines(1000)}</div>
    {/* <LeafScene></LeafScene> */}
    <InstancedGrid></InstancedGrid>

    <CustomCursor />
    </>
    
  )
}

export async function getStaticProps(ctx) {
  global.XMLHttpRequest = xhr.XMLHttpRequest;  
  return {
    props: {}, // will be passed to the page component as props
  };
}
