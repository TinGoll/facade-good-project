import { graphql, useStaticQuery } from "gatsby";

interface SiteMetadata {
  title: string;
  description: string;
  twitterUsername: string;
  image: string;
  siteUrl: string;
  keywords: string;
}

export const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          image
          siteUrl
          keywords
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
