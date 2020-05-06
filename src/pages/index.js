import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Badge from '../components/badge'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (


              <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div class="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div class="flex-1">
                    <p class="text-sm leading-5 font-medium text-indigo-600">
                      {node.frontmatter.categories.map((category) =>
                        <Badge>{category}</Badge>
                      )}
                    </p>
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      <h3 class="mt-2 text-xl leading-7 font-semibold text-gray-900">
                        {title}
                      </h3>
                      <p class="mt-3 text-base leading-6 text-gray-500" dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { 
          published: { ne: false }, 
          frontpage: { eq: true }
        }
      }
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            categories
          }
        }
      }
    }
  }
`
