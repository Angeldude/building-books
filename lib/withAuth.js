import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

let globalUser = null;

function withAuth(BaseComponent, { loginRequired = true, logoutRequired = false } = {}) {
  class App extends React.Component {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
      user: PropTypes.shape({
        displayName: PropTypes.string,
        email: PropTypes.string.isRequired,
      }),
      isFromServer: PropTypes.bool.isRequired,
    };

    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
      user: null,
    };

    componentDidMount() {
      const { user, isFromServer } = this.props;

      if (isFromServer) {
        globalUser = user;
      }

      if (loginRequired && !logoutRequired && !user) {
        Router.push('/login');
      }

      if (logoutRequired && user) {
        Router.push('/');
      }
    }

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req;
      const user = ctx.req ? ctx.req.user && ctx.req.user.toObject() : globalUser;

      if (isFromServer && user) {
        user._id = user._id.toString();
      }

      const props = { user, isFromServer };

      if (BaseComponent.getInitialProps) {
        Object.assign(props, (await BaseComponent.getInitialProps(ctx)) || {});
      }

      return props;
    }

    render() {
      const { user } = this.props;

      if (loginRequired && !logoutRequired && !user) {
        return null;
      }

      if (logoutRequired && user) {
        return null;
      }

      // eslint-disable-next-line react/jsx-props-no-spreading
      return <BaseComponent {...this.props} />;
    }
  }
  return App;
}

export default withAuth;
