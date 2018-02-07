import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { metadata as components } from '../metadata.json'

import { Heading1 } from '../docs-components/typography'
import Example from './example'

const Container = styled.div``
const Headings = styled.div`
  margin-bottom: 3rem;
`

export default props => {
  const componentName = props.match.params.componentName

  const component = components.filter(component => component.displayName === componentName)[0]

  return (
    <Container>
      <Helmet title={component.displayName + ' — Cosmos'} />
      <Headings>
        <Heading1>{component.displayName}</Heading1>
      </Headings>

      <Example documentation={component.documentation} component={component} />
    </Container>
  )
}
