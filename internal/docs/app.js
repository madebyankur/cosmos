import '@auth0/cosmos-fonts'
import React from 'react'
import styled from 'styled-components'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Icon } from '@auth0/cosmos'

import Sidebar from './sidebar'
import ComponentPage from './component'
import Overview from './overview'
import Playground from './playground'
import { Navigation } from './docs-components'
import guides from './guides'

class App extends React.Component {
  constructor() {
    super()

    this.state = { sidebarVisible: false }
  }

  toggleSidebar = () => {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }

  componentDidMount() {
    // Copied from: https://github.com/ReactTraining/react-router/issues/394#issuecomment-128148470
    // Decode entities in the URL
    // Sometimes a URL like #/foo#bar will be encoded as #/foo%23bar
    window.location.hash = window.decodeURIComponent(window.location.hash)
    const scrollToAnchor = () => {
      const hashParts = window.location.hash.split('#')
      if (hashParts.length > 2) {
        const hash = hashParts.slice(-1)[0]
        const link = document.querySelector(`#${hash}`)
        if (link) link.scrollIntoView()
      } else {
        document.querySelector('nav').scrollIntoView()
      }
    }
    scrollToAnchor()
    window.onhashchange = scrollToAnchor
  }
  render() {
    return (
      <Router>
        <Layout>
          <Navigation />
          <SidebarToggle sidebarVisible={this.state.sidebarVisible} onClick={this.toggleSidebar}>
            <Icon name={this.state.sidebarVisible ? 'close' : 'arrow-right'} />
          </SidebarToggle>
          <SideContent visible={this.state.sidebarVisible}>
            <Sidebar />
          </SideContent>
          <MainContent id="main">
            <Body>
              {guides.map((guide, i) => (
                <Route key={i} exact path={guide.path} component={guide.component} />
              ))}

              <Route exact path="/playground" component={Playground} />
              <Route exact path="/component/:componentName" component={ComponentPage} />
            </Body>
            <Route exact path="/overview" component={Overview} />
          </MainContent>
        </Layout>
      </Router>
    )
  }
}

export default App

const SideContent = styled.div`
  width: 19rem;
  position: fixed;
  height: calc(100vh - 80px);
  overflow-y: auto;
  transition: width 0.25s;

  @media (max-width: 800px) {
    width: ${props => (props.visible ? '19rem' : '0rem')};
    z-index: 2;
  }
`
const SidebarToggle = styled.div`
  padding: 16px;
  position: fixed;
  left: ${props => (props.sidebarVisible ? '19rem' : '0rem')};
  transition: left 0.25s;
  z-index: 3;

  &:hover {
    svg path {
      fill: ${props => (props.sidebarVisible ? '#E40002' : '#0a84ae')};
    }
  }

  display: none;
  @media (max-width: 800px) {
    display: block;
  }
`

const MainContent = styled.div`
  padding-left: 19rem;
  padding-bottom: 4rem;

  @media (max-width: 800px) {
    padding-left: 4rem;
  }
`

const Body = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2.1rem 1.05rem;
`

const Layout = styled.div`
  position: relative;
  width: 100%;
  margin-top: 80px;
  ${'' /* make room for the fixed top navigation */};
`
