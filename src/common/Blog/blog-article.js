import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import ArticleFeaturedImg from "../../assets/img/article-featured-img.jpg";
import Breadcrumbs from '../../common/Breadcrumbs';
import Layout from "../../common/layout";

const BlogArticle = () => {
  return (
  <>
  
    <Layout>
            <section className="content-area blog-main-wrapper">
                <Container className="content-area-inner inner-page-container">
                    <Row className='content-section bc-section'>
                        <Col className='bc-col blog-bc'>
                            <span className="bc-cell left"><Breadcrumbs/></span>
                            <span className="bc-cell right"><Link className="" to='/blog'>View All Blog Articles &#x3009;</Link></span>
                        </Col>
                    </Row>
                    <Row className='content-section blog-content-wrap'>
                        <div className="blog-article-wrapper">
                            <div className="article-heading">
                                <p className="category-tag">Featured</p>
                                <h1>We asked the SEC for reasonable crypto rules for Americans. We got legal threats instead.</h1>
                                <p className="postedon">Mar 22, 2023</p>
                            </div>
                            <div className="article-content-wrap">
                                <div className="article-featured-img"><img src={ArticleFeaturedImg} alt="" className="card-article-image" /></div>
                            </div>
                            <div className="article-item">
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
                    dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                     sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                      qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi 
                      tempora incidunt ut labore et dolore.
                                </p>
                                <strong> de Finibus Bonorum et Malorum </strong>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                                </p>
                                <strong> de Finibus Bonorum et Malorum </strong>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
                            </div>


                            <div className="social-share-link">
                                <Link className="" to='/blogArticle'>Tweet Us</Link>--<Link className="" to='/blogArticle'>Like Us</Link>--<Link className="" to='/blogArticle'>Join Us</Link>
                            </div>
                            <div className="blog-nav-wrapper">
                                <span className="blog-nav left">	&#x2329; Previous Post</span> 
                                <span className="blog-nav right"><Link className="" to='/blogArticle'>Next Post &#x3009; </Link></span>
                            </div>

                        </div>

                    </Row>
                    
                </Container>
            </section>
    </Layout>
  </>

  );
};

export default BlogArticle;
