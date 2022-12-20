import { useQuery } from '@apollo/react-hooks';
import { QUERY_PRODUCTS } from './queries';

function ProductDetail(props) {
  const { loading, error, data } = useQuery(QUERY_PRODUCTS, {
    variables: { id: props.productId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <p>Shop ID: {data.product.shopId}</p>
      <p>Product Name: {data.product.productName}</p>
      <p>Product Description: {data.product.productDescription}</p>
      <p>Product Image: {data.product.productImage}</p>
      <p>Price: {data.product.price}</p>
      <p>Category: {data.product.category.join(', ')}</p>
    </div>
  );
}

// use <ProductDetail productId={'12345'} /> to return the correct product ID.
