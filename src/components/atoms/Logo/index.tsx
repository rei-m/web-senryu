import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

export type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "app-icon.png" }) {
        childImageSharp {
          fixed(width: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <Img
      fixed={data.file.childImageSharp.fixed}
      alt={data.site.title}
      className={className}
    />
  );
};

export default Logo;
