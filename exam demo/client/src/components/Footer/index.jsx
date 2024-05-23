import React from "react";
import { Button, Col, Row } from "antd";
import styles from "../Footer/footer.module.scss"
const Footer = () => {
  return (
    <footer>
        <div className="container">
        <Row>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            facere laudantium magnam voluptatum autem. Amet aliquid nesciunt
            veritatis aliquam.
          </p>
        </Col>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <h3>Features</h3>
          <ul>
            <li>About Us</li>
            <li>Testimoials</li>
            <li>Terms Of Service</li>
            <li>Privacy</li>
            <li>Contact Us</li>
          </ul>
        </Col>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <h3>Some Paragraph</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Neque
            facere laudantium <br /> magnam voluptatum autem. Amet aliquid <br /> nesciunt
            veritatis aliquam.
          </p>
          <h3>SUBSCRIBE TO NEWSLETTER</h3>
          <div className={styles.all}>
          <input type="text" placeholder="Enter Email"/>
          <Button>Subscribe</Button>
          </div>
          
        </Col>
      </Row>
        </div>
     
    </footer>
  );
};

export default Footer;
