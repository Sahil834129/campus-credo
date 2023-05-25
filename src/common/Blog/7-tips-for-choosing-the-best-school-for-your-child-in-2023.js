import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import ArticleFeaturedImg from "../../assets/img/blog-img/campuscredo-blog-pic.jpg";
import Breadcrumbs from "../Breadcrumbs";
import Layout from "../layout";

const BlogArticle1 = () => {
  return (
    <>
      <Layout>
        <section className="content-area blog-main-wrapper">
          <Container className="content-area-inner inner-page-container">
            <Row className="content-section bc-section">
              <Col className="bc-col blog-bc">
                <span className="bc-cell left">
                  <Breadcrumbs />
                </span>
                <span className="bc-cell right">
                  <Link className="" to="/blog">
                    View All Blog Articles &#x3009;
                  </Link>
                </span>
              </Col>
            </Row>
            <Row className="content-section blog-content-wrap">
              <div className="blog-article-wrapper">
                <div className="article-heading">
                  <p className="category-tag">Featured</p>
                  <h1>
                    7 Tips for Choosing the Best School for Your Child in 2023!
                  </h1>
                  <p className="postedon">April 14, 2023</p>
                </div>
                <div className="article-content-wrap">
                  <div className="article-featured-img">
                    <img
                      src={ArticleFeaturedImg}
                      alt=""
                      className="card-article-image"
                    />
                  </div>
                </div>
                <div className="article-item">
                  <p>
                    Undeniably, education is a lifelong asset when it comes to
                    your child’s growth and development. Compromising with it in
                    any manner is eventually compromising your kid’s future.
                    Thus, in the regard to the fundamental rights of children
                    and the importance of education, choosing the right school
                    has become a major challenge in the present time.
                  </p>

                  <p>
                    We are all aware of the intense competition in the
                    educational field, yet a good school can provide your child
                    with much more than you may think. But, the question that
                    pops up is how can you discover the ideal school for your
                    child? First and foremost, it's crucial to realise that
                    picking a school is a decision that should be made after
                    contemplation. It is not sufficient to concentrate just on a
                    limited set of parameters, but also you must strive for
                    perfection. The following information will help you choose
                    the best school for your child in 2023.
                  </p>
                  <ul>
                    <li>
                      <strong>
                        Your Child’s Academic Performance Is A Ground:{" "}
                      </strong>
                      A significant thing to keep in mind while checking on
                      different schools for your child is examining their
                      academic performance. You can look at the number of
                      students who have scored above a particular percentage or
                      the ones who have cracked major competitive exams across
                      the country. All these aspects are important because this
                      helps to find a competency-based educational institute
                      with commendable faculty for pupils who aspire to master
                      their learnings and become successful people.
                    </li>
                    <li>
                      <strong>
                        Infrastructure & Environment Is Silent Speaker:
                      </strong>
                      Well, infrastructure & environment is indeed a silent
                      speaker as it says so much about the school management,
                      classroom behaviour and educational amenities. Having a
                      space with proper ventilation, greenery, required
                      teaching-learning materials, good furniture & lighting,
                      etc., makes a huge difference in a learner’s growth. So,
                      it’s imperative to closely observe the school premises to
                      figure out what your little ones would experience in 6-8
                      hours of seating in a specific area. Furthermore, you must
                      keenly understand and analyze how worthy digital
                      experiences a school aims to offer. In this modern era,
                      competent education providers have mobile-friendly
                      websites & apps to enable parents to monitor their child’s
                      holistic development anytime and anywhere.
                    </li>
                    <li>
                      <strong>
                        Pupil-Teacher Ratio For Balanced Instruction:
                      </strong>
                      The latest amendments in the school education policy have
                      created a huge impact on teacher-learner volume in one
                      class. Now, it’s important to ensure that there should be
                      a correct volume of teachers and students present in a
                      specific class to ensure a quality learning environment.
                      As per section-25, chapter-4 of the Right To Education
                      Act, 2004; the primary student-teacher ratio is 30:1 while
                      upper primary is 35:1. It specifies that 1 teacher will
                      manage each group of 30 students in a primary class. On
                      the contrary, 1 teacher will manage each group of 35
                      students in an upper primary class. Exceeding the quantity
                      obligates the educational laws and also hampers the
                      teaching-learning process.
                    </li>
                    <li>
                      <strong>School’s Commitment To Safety:</strong>
                      Being a parent, vigilance is an evident yet the most
                      important factor to consider. And you should definitely
                      not miss out on it when looking for a potential school for
                      your child’s admission. You can seek in what manners the
                      security of the campus has been designed, or how a school
                      ensures students’ safety. The reliability and proficiency
                      of the school stand in its commitment to students’
                      security, such as CCTV surveillance. Some reputed schools
                      in the educational world do provide CCTV access to parents
                      of the school campus so that they can relax while sending
                      their precious ones to school. This way, you can be
                      promptly available for your kid in case of emergencies and
                      also ensure their safety while accessing their classroom
                      activities anytime & anywhere.
                    </li>
                    <li>
                      <strong>Vocational Education Is Must: </strong>
                      In today’s time, India is equally competent and advanced
                      in diverse vocational niches. That’s one of the big
                      reasons why today's learners need to be prepared for
                      tomorrow’s success. And this success does not only limit
                      academic boundaries, but vocational education is also a
                      focal point for the holistic development of learners.
                      Keeping this viewpoint, you must check whether or not any
                      educational platform renders vocational education,
                      curricular and extracurricular activities, such as music,
                      dance, yoga, sports, acting, and so on. As per the New
                      Education Policy, 2020; vocational education has been
                      added to the school curriculum from 6th standard for
                      360-degree assessment of learners.
                    </li>
                    <li>
                      <strong>Distance Does Matter:</strong>
                      As per the latest school educational policies and National
                      curriculum frameworks, it is prominently important to
                      focus on the distance from the school to the house. Way
                      too much distance between the school and home would affect
                      a student’s health and at last impact their learning, too.
                      As per section-6, Chapter-3 of the Right To Education Act,
                      2009; the distance of the school from home should be a
                      maximum of 1 KM for primary students and a maximum of 3
                      KMs for upper primary classes. Henceforth, distance is a
                      crucial aspect, and you should enroll your child in a
                      school as per the school distance framework given by the
                      government on education.
                    </li>
                    <li>
                      <strong>Review The Fee Structure:</strong>
                      It is a pertinent aspect to consider when seeking a good
                      educational institute for your child. Planning for the
                      future is key to smooth learning and growth. Therefore,
                      while searching for a good school, it’s important to
                      closely monitor the fee structure. If any school fits your
                      requirement and budget, you will never bother to make
                      timely payments because it’s a deliberate and assessed
                      choice made by you before selecting the school for your
                      children.
                    </li>
                  </ul>
                  <hr></hr>
                  <strong>
                    <u><a href={"/schools"} style={{color: 'black'}}>CampusCredo: Going Paperless For School Admission</a>!</u>
                  </strong>
                  <p>
                    We hope that the above-mentioned tips & tricks will help you
                    find the most ideal educational institute for your child.
                    But, does this end here? Absolutely not, there’s something
                    highly pertinent to uncover yet. And that is none other than{" "}
                    <b>“CampusCredo.”</b> It is a one-stop digital window for
                    all school admission proceedings with a few easy, quick and
                    seamless steps.
                  </p>
                  <p>
                    {" "}
                    <b>CampusCredo</b> is an online portal that relieves you
                    from unwanted, daunting yet hectic school admission
                    processes such as paperwork, physical visits to schools,
                    filling multiple admission forms for different schools, long
                    queues outside the admission window, and so on. Choosing
                    CampusCredo will allow you to apply to multiple schools for
                    admission via a single application form, zero paperwork,
                    easy & quick access to various school details, and complete
                    transparency. Henceforth, apply to your favorite
                    institutions via your trusted partner, CampusCredo.{" "}
                  </p>
                </div>

                <div className="social-share-link">
                  <a href="https://twitter.com/CampusCredo" target="_blank">
                  <i class="icons twtUs-icon"></i> <span>Tweet Us</span>  
                  </a>
                  <a
                    href="https://www.facebook.com/CampusCredo/"
                    target="_blank"
                  >
                  <i class="icons fbLike-icon"></i> <span>Like Us</span> 
                  </a>
                  <Link className="" to="/signUp">
                  <i class="icons joinus-icon"></i> <span>Join Us</span>  
                  </Link>
                </div>
                <div className="blog-nav-wrapper">
                  <span className="blog-nav left">
                    {" "}
                    {/* <Link
                      className=""
                      to="/blog/7-tips-for-choosing-the-best-school-for-your-child-in-2023"
                    > */}{" "}
                    &#x2329; Previous Post {/* </Link> */}
                  </span>
                  <span className="blog-nav right">
                    <Link
                      className=""
                      to="/blog/should-you-choose-cbse-or-icse-school-for-your-children"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Next Post &#x3009;
                    </Link>
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

export default BlogArticle1;
