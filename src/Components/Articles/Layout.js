import { MDXProvider } from '@mdx-js/react';
import { components } from './MdxComponents';

const Layout = ({ children }) => {
  return (
    <MDXProvider components={components}>
      <div>
        <header>
          <h1>My MDX Next.js Blog</h1>
        </header>
        <main>{children}</main>
      </div>
    </MDXProvider>
  );
};

export default Layout;