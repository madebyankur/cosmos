import * as React from 'react'
import { PageHeader, Button } from '@auth0/cosmos'
import { mockFn } from '../helpers/event-handler'

class Fixture extends React.Component {
  static onPrimaryClick = mockFn

  render() {
    return (
      <PageHeader
        id="custom-id"
        title="Clients"
        description={<span>long description goes here</span>}
        learnMore="/link"
        primaryAction={
          <Button icon="plus" onClick={mockFn}>
            Create Client
          </Button>
        }
        secondaryAction={<Button icon="play-circle">Tutorial</Button>}
      />
    )
  }
}



export default Fixture
