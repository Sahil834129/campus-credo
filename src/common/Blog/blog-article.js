import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import ArticleFeaturedImg from "../../assets/img/blog-img/campuscredo-blog-pic.jpg";
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
                                <h1>5 Tips for Choosing the Best School for Your Child in 2023!</h1>
                                <p className="postedon">April 14, 2023</p>
                            </div>
                            <div className="article-content-wrap">
                                <div className="article-featured-img"><img src={ArticleFeaturedImg} alt="" className="card-article-image" /></div>
                            </div>
                            <div className="article-item">
                                <p>Undeniably, education is a treasure trove when it comes to your child’s growth and development. Compromising with it in any manner is compromising with your kid’s future which is why it is a crucial facet of a child’s learning. Considering the fundamental right of children and educational importance, choosing the right school has become a major challenge in the present time. Many times parents experience the issue of good quality education for their children and that’s why school selection is a prominent factor. 
                                </p>
                                <strong> How campuscredo makes a difference? </strong>
                                <p>
                                We all know that competition is cut-throat in the educational world, but an apt school can cater to your child way more than you may reckon. So, how can you find that apt school? Firstly, it’s essential to understand that school selection is a careful choice that should be made after contemplation. Focusing only on certain pre-made parameters isn’t just enough, you need to closely eye for perfection. Below are certain useful tips for selecting the right school for your child in 2023. 

                                </p>
                               <ul>
                                    <li>
                                        <strong>Review The Fee Structure: </strong>
                                        It is the first and foremost aspect to consider when seeking a good educational institute for your child. Planning for the future is key to smooth learning and growth. Therefore, while searching for a good school, it’s important to closely monitor the fee structure. If any school fits your requirement and budget, you will never bother to make timely payments because it’s a deliberate and assessed choice made by you before picking the school for your children
                                    </li>
                                    <li>
                                        <strong>Your Kids’ Academic Performance Is A Ground: </strong>
                                        Another significant thing to keep in mind while checking on different schools for your kids is examining their academic performance. It’s important because this factor helps to find a competent school with commendable faculty for the pupils who have good academic scores. In the case of vice versa also, it’s relevant to comprehend whether or not the faculty of the educational institute possesses the required skill set to impart quality education to the pupils. 
                                    </li>
                                    <li>
                                        <strong>Never Miss Out On Your Child’s Comfort: </strong>
                                        Whether or not your child has ordinary or extraordinary comfort, being a parent you should always give this facet a second thought. The reason for this is learners often become demotivated in the first seating which eventually creates an impact on their learning too. If a child follows a particular discipline and seeks to experience a home-like environment, you should check on this factor. Because upliftment in one area will ultimately result in the upliftment of other arena(s). So, it is valuable to let the pupil choose his/her path over time. 
                                    </li>
                                    <li>
                                        <strong>Distance Does Matter: </strong>
                                        As per the latest school educational policies and National curriculum frameworks, it is prominently important to focus on the distance of the student from the school to the house. Way too much distance between the school and home would affect your little one's health and at last their learning, too. Henceforth, considering the distance as a crucial aspect, you should enrol your child in a school with little to no distance between the house and school. This way, you can be promptly available for your kid in case of emergencies and also ensure their safety during school pick-ups/drop-offs.
                                    </li>
                                    <li>
                                        <strong>Environment &amp; Infrastructure Is A Silent Speaker: </strong>
                                        The last but not the least considerable thing while searching for the schools to enrol your kids in is the Infrastructure assessment. Well, it’s indeed a silent speaker as it says so much about the school management, classroom behaviour and educational amenities. Having a space with proper ventilation, greenery, required teaching-learning materials, good furniture & lighting, etc., makes a huge difference in a learner’s growth. So, it’s imperative to closely observe the school premises to figure out what your little ones would experience in 6-8 hours of seating in a specific area.
                                    </li>
                               </ul>
                               <hr></hr>
                               <strong><u>CampusCredo: Going Paperless For School Admission!</u></strong>
                               <p>We hope that the above-mentioned tips & tricks will help you find the most ideal educational institute for your child. But, does this end here? Absolutely not, there’s something highly pertinent to uncover yet. And that is none other than <b>“CampusCredo.”</b> It is a one-stop digital window for all school admission proceedings with a few easy, quick and seamless steps.</p>
                               <p> <b>CampusCredo</b> is an online portal that relieves you from unwanted, daunting yet hectic school admission processes such as paperwork, physical visits to schools, filling multiple school admission forms, long queues outside the admission window, and so on. With its incredible multi-applying school admission process via single admission form, zero paperwork, easy & quick access to various school details, and complete transparency; that’s a commendable path to opt for. So, look no further than to apply to multiple schools with just a single form anywhere & anytime, CampusCredo is all set to turn your dreams into reality. </p>


                            </div>


                            <div className="social-share-link">
                                <a href="https://twitter.com/CampusCredo" target="_blank">Tweet Us</a>--<a href="https://www.facebook.com/CampusCredo/" target="_blank">Like Us</a>--<Link className="" to='/signUp'>Join Us</Link>
                            </div>
                            <div className="blog-nav-wrapper">
                                <span className="blog-nav left">	&#x2329; Previous Post</span> 
                                <span className="blog-nav right">
                                    {/* <Link className="" to='/blogArticle'> */}
                                        Next Post &#x3009; 
                                    {/* </Link> */}
                                </span>
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
