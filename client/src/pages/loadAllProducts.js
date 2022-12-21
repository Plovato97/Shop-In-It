import { useQuery } from '@apollo/client';
import { QUERY_SHOP_PRODUCTS } from '../utils/queries';
import {Product} from '../components/Product';

function LoadAllProducts() {
    const { data, loading, error } = useQuery(QUERY_SHOP_PRODUCTS);
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

export default LoadAllProducts;