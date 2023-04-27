import React from "react";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import BlogThumbnail from "../../assets/img/blog-img/campuscredo-blog-pic.jpg";
import Breadcrumbs from '../../common/Breadcrumbs';
import Layout from "../../common/layout";

const Blog = () => {
  return (
    <>
      <Layout>
        <section className="content-area blog-main-wrapper">
          <Container className="content-area-inner inner-page-container">
            <Row className="content-section bc-section">
              <Col className="bc-col">
                <Breadcrumbs />
              </Col>
            </Row>
            <Row className="content-section blog-content-wrap">
              <h2>Recent Blog Posts</h2>
              <ListGroup as="ul" className="blog-list">
                <ListGroup.Item as="li">
                  <Link className="" to="/blog/7-tips-for-choosing-the-best-school-for-your-child-in-2023">
                    <div className="blog-thumb">
                      <img
                        src={BlogThumbnail}
                        alt=""
                        className="card-article-image"
                      />
                    </div>
                    <div className="blog-content">
                      <div className="postedon">Apr 14, 2023,</div>
                      <div className="blog-title">
                      7 Tips for Choosing the Best School for Your Child in 2023!
                      </div>
                    </div>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default Blog;
