import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

import withAuth from '../lib/withAuth';

// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      displayName: PropTypes.string,
    }),
  };

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    user: null,
  };

  render() {
    const { user } = this.props;
    return (
      <div style={{ padding: '10px 45px' }}>
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="List of purchased books." />
        </Head>
        <p>Content on Index Page</p>
        <p>
          Email:&nbsp;
          {user.email}
        </p>
      </div>
    );
  }
}

export default withAuth(Index);
