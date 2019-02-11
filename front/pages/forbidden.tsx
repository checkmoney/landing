import { FORBIDDEN } from 'http-status-codes'
import * as React from 'react'

import { AppContext } from '@front/domain/AppContext'

export default class ForbiddenPage extends React.Component {
  public static getInitialProps({ res }: AppContext) {
    res.statusCode = FORBIDDEN

    return {}
  }

  public render() {
    return <p>Forbidden</p>
  }
}
