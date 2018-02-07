import React from 'react'
import Markdown from 'markdown-to-jsx'
import yaml from 'yamljs'

import Playground from './playground'
import Break from './break'

import IconBrowser from './icon-browser'
import { Code } from '../../components'
import { Text, ListItem, List, Link } from '../docs-components/typography'
import PageHeader from './page-header'
import SectionHeader from './section-header'
import ExampleHeader from './example-header'

const Example = props => {
  const options = {
    overrides: {
      hr: Break,
      h2: SectionHeader,
      h3: ExampleHeader,
      p: Text,
      a: Link,
      li: ListItem,
      ul: List,
      /* use playground for js code blocks */
      code: markdownProps => {
        const language = markdownProps.className

        if (!language) return <Code>{markdownProps.children}</Code>
        else if (['lang-js', 'lang-jsx'].includes(language)) {
          return (
            <div>
              <Playground
                code={markdownProps.children}
                language={language}
                component={props.component}
              />
            </div>
          )
        } else if (language === 'lang-meta') {
          const metadata = yaml.parse(markdownProps.children)
          return <PageHeader {...metadata} />
        } else {
          return null
        }
      },
      IconBrowser
    }
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <Markdown options={options}>{props.documentation}</Markdown>
    </div>
  )
}

export default Example
