import bgHero from '../assets/img/bgHero.jpg'

const Hero = () => {
  return (
    <section id="hero">
      <div className="hero-bg">
        <img src={bgHero} alt="" />
      </div>

      <div className='hero-title'>
        <h1>Don't miss our <br /> amazing deals.</h1>
        <p>Save up to 60% off on your first order</p>

        <div className='hero-input-container'>
          <input type="text" placeholder='Enter your email address'/>
          <button>Suscribe</button>
        </div>
      </div>
    </section>
  )
}

export default Hero