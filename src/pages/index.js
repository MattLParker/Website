import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import { StyledIndex } from '../components/styles/index-page';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import bg from "../../static/blog-cover.jpg"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const siteDescription = data.site.siteMetadata.description;

    return (
      <React.Fragment>
        <StyledIndex>
          {/* <div style="Centered"><img src={bg}></img></div> */}
            <Layout location={this.props.location} title={siteTitle}>
            <SEO />
            <p>Ramblings of a SysAdmin.</p>
            <nav>
              <p>
                <Link to="/blog">Blog</Link>
              </p>
              <p>
                <Link to="/aboutme">About-Me</Link>
              </p>
            </nav>
            
            </Layout>
        </StyledIndex>
        <Footer />
      </React.Fragment>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;