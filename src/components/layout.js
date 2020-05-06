import React from "react"
import { Link } from "gatsby"
import './style.css'
import Footer from './footer'


class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <Link to={`/`}>
              <h2 class="text-2xl font-bold leading-7 text-cyan-900 sm:text-3xl sm:leading-9 sm:truncate">
                {title}
              </h2>
            </Link>
          </div>

        </div >
      )
    } else {
      header = (
        <div class="md:flex md:items-center md:justify-between sm:py-1 lg:py-4">
          <div class="flex-1 min-w-0">
            <Link to={`/`}>
              <h2 class="text-2xl font-bold leading-7 text-cyan-900 sm:text-3xl sm:leading-9 sm:truncate">
                {title}
              </h2>
            </Link>
          </div>

        </div>
      )
    }
    return (
      <div className="container mx-auto bg-gray-50">
        <header>{header}</header>
        <div className="px-2">
          <main>{children}</main>
          <Footer></Footer>
        </div>
      </div>
    )
  }
}

export default Layout
