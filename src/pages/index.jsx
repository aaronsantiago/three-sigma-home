// import dynamic from 'next/dynamic'
// // Step 5 - delete Instructions components
// import Instructions from '@/components/dom/Instructions'

// // Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// // WARNING ! errors might get obfuscated by using dynamic import.
// // If something goes wrong go back to a static import to show the error.
// // https://github.com/pmndrs/react-three-next/issues/49
// const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
//   ssr: false,
// })

// // dom components goes here
// const DOM = () => {
//   return (
//     // Step 5 - delete Instructions components
//     <Instructions />
//   )
// }

// // canvas components goes here
// const R3F = () => {
//   return (
//     <>
//       <Shader />
//     </>
//   )
// }

// const Page = () => {
//   return (
//     <>
//       <DOM />
//       <R3F r3f />
//     </>
//   )
// }

// export default Page

// export async function getStaticProps() {
//   return {
//     props: {
//       title: 'Index',
//     },
//   }
// }
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LogoVideo from '@/components/LogoVideo'
import Scene1 from '@/components/Scene1'
import Scene2 from '@/components/Scene2'

export default function Home() {
  return (
    <>
    <Head></Head>
    <LogoVideo></LogoVideo>
    <Scene1></Scene1>
    <Scene2></Scene2>
    </>
    
  )
}
