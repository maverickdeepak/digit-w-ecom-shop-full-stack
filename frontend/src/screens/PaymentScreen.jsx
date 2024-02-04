import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { FaArrowRight } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { save_payment_method } from "../slices/cart_slice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shipping_address } = cart;

  useEffect(() => {
    if (!shipping_address) {
      navigate("/shipping");
    }
  }, [shipping_address, navigate]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment Method</h2>
      <Form>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value={paymentMethod}
              checked
              onChange={(e) => setPaymentMethod(e.currentTarget.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Next <FaArrowRight />
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
