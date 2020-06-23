import Head from 'next/head';
import PropTypes from 'prop-types';

const Index = ({ user }) => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>Index Page</title>
      <meta name="description" content="this is description of Index" />
    </Head>
    <p>Content on Index Page</p>
    <p>
      Email: 
       {user.email}
    </p>
  </div>
);

Index.getInitialProps = async (ctx) => ({ user: ctx.query.user });

Index.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  user: null,
}

export default Index;
