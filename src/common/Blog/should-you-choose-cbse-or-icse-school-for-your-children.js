import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import CbseVsIcsePic from "../../assets/img/blog-img/cbse-vs-icse.jpg";
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
                    Should You Choose CBSE Or ICSE School For Your Children?
                  </h1>
                  <p className="postedon">May 18, 2023</p>
                </div>
                <div className="article-content-wrap">
                  <div className="article-featured-img">
                    <img
                      src={CbseVsIcsePic}
                      alt=""
                      className="card-article-image"
                    />
                  </div>
                </div>
                <div className="article-item">
                  <p>
                    CBSE or ICSE, which board of education is better, has still
                    been a debate discussion for many. Even parents often
                    consider this parameter as the crucial and foremost facet
                    before finalising any school for their children. CBSE or
                    Central Board of Secondary Education and ICSE or Indian
                    Certificate of Secondary Education are two prominent boards
                    of education significantly catered to by various educational
                    institutes all over India. Where both of these boards
                    encompass diverse yet unique terms in the education system,
                    their primary focus is to inculcate the best educational
                    ethics among learners. Should you, being a parent, choose
                    CBSE or ICSE for your child? Which board will turn out to be
                    a boon for your child’s holistic development? Does CBSE or
                    ICSE comprise negative characteristics, too? All these
                    questions might daunt you which will be smoothly cleared
                    with the help of this post. Stay a loyal reader, and get all
                    your queries answered via this single blog.
                  </p>
                  <p>
                    <strong>CBSE</strong>
                  </p>
                  <p>
                    CBSE, also known as Central Board of Secondary Education is
                    an NCERT (National Council of Education and Research
                    Training) approved and followed curriculum. It is
                    substantially the most carried out board of education in
                    multiple schools, which is for secondary and senior
                    secondary academic levels. CBSE curriculum comprises a
                    profound combination of compulsory and additional subjects
                    for students’ 360 degrees assessment and holistic
                    development. CBSE runs a bilingual curriculum in both Hindi
                    & English for learners' convenience. Students can also
                    access its learning materials via its official website
                    {" "} <a href="https://www.cbse.gov.in/" target="_blank">https://www.cbse.gov.in/</a>   which is available in the same
                    bilingual format. Furthermore, it conducts two arrays of
                    examinations, AISSE (All India Secondary School Examination)
                    for 10th standard boards and AISSCE (All India Senior School
                    Certificate Examination) for 12th standard boards. Both of
                    these sets of board exams are conducted at the end of March
                    each year for 10th and 12th-level students. In CBSE, the
                    question paper for one subject remains the same across the
                    country and its competitive exams include JEE, NEET, and so
                    on. With a creative and student-centric approach, a massive
                    number of schools are affiliated with the CBSE board.
                  </p>

                  <hr></hr>
                  <strong>ICSE</strong>
                  <p>
                    ICSE, also known as the Indian Certificate of Secondary
                    Education is a CISCE (Council of Indian School Certificate
                    Examination) managed board. It is another invaluable
                    education board carried out by many reputed schools which
                    follows the curriculum adopted by the Anglo-Indian Board. It
                    has also been popular during the British dynasty, which is
                    the Cambridge IGCSE. ICSE conducts examinations for all
                    classes from 1st to 12th which are considerably complicated
                    for all levels. It enables learners to appear for 6 subjects
                    along with social exposure & environmental knowledge. ICSE
                    prohibits the use of the mother tongue within the school
                    boundaries and ensures students experience the English
                    environment throughout. You can also check out its official
                    website for detailed knowledge via{" "}
                    <a
                      href="https://cisce.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://cisce.org/
                    </a>
                    . <br />
                    Furthermore, ICSE sets a strong base for learners to crack
                    competitive exams outside India such as TOEFL, SATs, etc. It
                    conducts two arrays of examinations, the ICSE exam for class
                    10th and the ISC exam for class 12th. With an
                    application-based teaching methodology and vast syllabus,
                    ICSE is a recognized education board worldwide. Considering
                    English as the mandatory subject, ICSE releases its results
                    based on 6 subjects wherein the best 5 subject marks are
                    chosen. The subjects of the ICSE curriculum are divided into
                    three segments wherein the first segment has been made
                    compulsory for all learners while students are given the
                    option to pick up the subjects of their choice from the
                    second and third segments. ICSE also promotes and caters to
                    special education for physically handicapped or disabled
                    students.{" "}
                  </p>

                  <strong>CBSE Vs ICSE</strong>
                  <div class="table-wrapper">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Basic</th>
                          <th>CBSE</th>
                          <th>ICSE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Medium </td>
                          <td>English & Hindi</td>
                          <td>English </td>
                        </tr>
                        <tr>
                          <td>Exams</td>
                          <td>
                            AISSE - 10th Class <br /> AISSCE - 12th Class{" "}
                          </td>
                          <td>
                            ICSE - 10th Class <br /> ISC - 12th Class
                          </td>
                        </tr>
                        <tr>
                          <td>Recognition</td>
                          <td>All Over India </td>
                          <td>All Over World</td>
                        </tr>
                        <tr>
                          <td>Competency </td>
                          <td>Standard</td>
                          <td>Intricate</td>
                        </tr>
                        <tr>
                          <td>Authorization</td>
                          <td>NCERT</td>
                          <td>CISCE</td>
                        </tr>
                        <tr>
                          <td>Curriculum </td>
                          <td>NCERT</td>
                          <td>Cambridge IGCSE</td>
                        </tr>
                        <tr>
                          <td>Total Subjects</td>
                          <td>5</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>Assessment Type</td>
                          <td>Practicals + Internal Evaluation</td>
                          <td>Practicals + Lab Tutorials</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <strong>
                    CampusCredo: An Easy Gateway To Enroll In Schools!{" "}
                  </strong>
                  <p>
                    We hope you’re now clear about the major differences between
                    the two popular educational boards run in different
                    educational institutes all over India. When it comes to
                    comparison, both of these boards are recognized and
                    encompass diverse purposes and optimal educational practices
                    in their own ways. Where admissions in school appear to be a
                    daunting task for parents, CampusCredo has made it fully
                    effortless for everyone. You can easily find the right
                    institutes as per your requirements, apply to multiple
                    schools at once and track statuses from <a href={"/"}>www.campuscredo.com</a>!{" "}
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
                    <Link
                      className=""
                      to="/blog/7-tips-for-choosing-the-best-school-for-your-child-in-2023"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {" "}
                      &#x2329; Previous Post{" "}
                    </Link>
                  </span>
                  {/* <span className="blog-nav right">
                    {/* <Link className="" to='/blogArticle'> */}
                  Next Post &#x3009;
                  {/* </Link>  }
                  </span> */}
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
