import ProductCard from "./Elements/ProductCard"

const FeaturedProducts = () => {
  return (
    <section id='featured-products'>
        <div className='products-subtitle'>
            <h2>Feautred Products</h2>
            <p>Check out our latest products!</p>
        </div>

        <div className='products-cards_container'>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>

        </div>
    </section>
  )
}

export default FeaturedProducts