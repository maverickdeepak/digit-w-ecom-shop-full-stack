import React from "react";
import { Row, Col } from "react-bootstrap";
// import products from "../products";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/products_api_slice";

const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
    {isLoading ? (
      <h2>Loading...</h2>
    ) : isError ? (
      <div>{isError?.data.message || isError.error}</div>
    ) : (
      <>
      <h2>Latest Products</h2>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
      </>
    )}
    </>
  );
};

export default HomeScreen;
