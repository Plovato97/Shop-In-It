import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_PRODUCTS } from './queries';
import Product from './components/Product';

function LoadAllProducts() {
    const { data, loading, error } = useQuery(QUERY_ALL_PRODUCTS);
    const products = data ? data.products : [];


    const productList = products.map(product => (
        <Product data={product} key={product._id} />
      ));


      return (
        <div className='products'>
          {productList}
        </div>
      );
  };

export default LoadAllProducts