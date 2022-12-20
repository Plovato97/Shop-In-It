import { useQuery } from '@apollo/client';
import { QUERY_ME } from './queries';

function UserInfo() {
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { username, email, orders, shop } = data.me;

  return (
    <div>
      <h2>User Information</h2>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      {orders.length > 0 && (
        <>
          <h3>Orders</h3>
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                Order placed on {order.datePurchased}:
                <ul>
                  {order.products.map((product) => (
                    <li key={product._id}>
                      {product.productName} - {product.price}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
      {shop && (
        <>
          <h3>Shop Information</h3>
          <p>Shop Name: {shop.shopTitle}</p>
          <p>Shop Description: {shop.shopDescription}</p>
          {shop.products.length > 0 && (
            <>
              <h4>Shop Products</h4>
              <ul>
                {shop.products.map((product) => (
                  <li key={product._id}>
                    {product.productName} - {product.price}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
