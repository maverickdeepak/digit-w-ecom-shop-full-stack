import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { FaAnglesLeft } from "react-icons/fa6";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductsDetailsQuery } from "../slices/products_api_slice";
import { add_to_cart } from "../slices/cart_slice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: productDetails,
    isLoading,
    error,
  } = useGetProductsDetailsQuery(productId);

  const add_to_cart_handler = () => {
    dispatch(add_to_cart({ ...productDetails?.data, quantity }));
    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Link
            className="btn btn-light my-3 d-flex align-items-center go-back-btn"
            to={`/`}
          >
            <FaAnglesLeft />
            Back
          </Link>
          <Row>
            <Col md={5}>
              <Image
                src={productDetails?.data?.image}
                alt={productDetails?.data?.name}
                fluid
              />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{productDetails?.data?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={productDetails?.data?.rating}
                    text={`${productDetails?.data?.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>${productDetails?.data?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {productDetails?.data?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${productDetails?.data?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <span
                          className={`${
                            productDetails?.data?.countInStock > 0
                              ? "in-stock"
                              : "out-of-stock"
                          }`}
                        >
                          {productDetails?.data?.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {productDetails?.data?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          >
                            {[
                              ...Array(
                                productDetails?.data?.countInStock
                              ).keys(),
                            ].map((stock) => {
                              return (
                                <option key={stock + 1} value={stock + 1}>
                                  {stock + 1}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={productDetails?.data?.countInStock === 0}
                      onClick={add_to_cart_handler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
