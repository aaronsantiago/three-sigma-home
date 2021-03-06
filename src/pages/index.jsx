import Head from 'next/head';
import LogoVideo from '@/components/LogoVideo';
import Scene1 from '@/components/Scene1';
import Scene2 from '@/components/Scene2';
import InstancedGrid from '@/components/InstancedGrid';
import LeafScene from '@/components/LeafScene';
import xhr from 'xmlhttprequest';
import CustomCursor from '@/components/CustomCursor';
import Link from "next/link";
var faker = require('faker');

export default function Home() {
  return (
    <>
    <Head></Head>
      <CustomCursor />
      <LogoVideo></LogoVideo>
      <Scene1></Scene1>
      <Link href="/cube">click me for cool webpage</Link>
      <Scene2></Scene2>
    </>
    
  )
}

export async function getStaticProps(ctx) {
  global.XMLHttpRequest = xhr.XMLHttpRequest;  
  return {
    props: {}, // will be passed to the page component as props
  };
}
