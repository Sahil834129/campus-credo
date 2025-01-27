import React from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import bestpreschool from "../../assets/img/blog-img/best-preschool-nearyou.png";
import BlogThumbnail from "../../assets/img/blog-img/campuscredo-blog-pic.jpg";
import cbsevsicse from "../../assets/img/blog-img/cbse-vs-icse.jpg";
import choosingthebestschool from "../../assets/img/blog-img/choosing-the-best-schools.jpg";
import Breadcrumbs from "../../common/Breadcrumbs";
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
                  <Link
                    className=""
                    to="/blog/7-tips-for-choosing-the-best-school-for-your-child-in-2023"
                  >
                    <div className="blog-thumb">
                      <img
                        src={BlogThumbnail}
                        alt=""
                        className="card-article-image"
                      />
                    </div>
                    <div className="blog-content">
                      <div className="postedon">April 14, 2023</div>
                      <div className="blog-title">
                        7 Tips for Choosing the Best School for Your Child in
                        2023!
                      </div>
                    </div>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link
                    className=""
                    to="/blog/should-you-choose-cbse-or-icse-school-for-your-children"
                  >
                    <div className="blog-thumb">
                      <img
                       src={cbsevsicse}
                        alt=""
                        className="card-article-image"
                      />
                    </div>
                    <div className="blog-content">
                    <div className="postedon">May 18, 2023</div>
                      <div className="blog-title">
                      Should You Choose CBSE Or ICSE School For Your Children?
                      </div>
                    </div>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link
                    className=""
                    to="/blog/how-to-choose-the-best-preschool-near-you"
                  >
                    <div className="blog-thumb">
                      <img
                        src={bestpreschool}
                        alt=""
                        className="card-article-image"
                      />
                    </div>
                    <div className="blog-content">
                    <div className="postedon">June 16, 2023</div>
                      <div className="blog-title">
                      How To Choose the Best Preschool Near You?
                      </div>
                    </div>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link
                    className=""
                    to="/blog/choosing-the-best-schools-a-complete-school-admission-guide-2023-24"
                  >
                    <div className="blog-thumb">
                      <img
                        src={choosingthebestschool}
                        alt=""
                        className="card-article-image"
                      />
                    </div>
                    <div className="blog-content">
                    <div className="postedon">Aug 16, 2023</div>
                      <div className="blog-title">
                      Choosing The Best Schools – A Complete School Admission Guide 2023-24!
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
