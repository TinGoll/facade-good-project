import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "../hooks/use-site-metadata";

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
}
export const SEO: FC<SEOProps> = ({
  title,
  description,
  pathname,
  children,
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
    keywords,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    keywords: `${keywords || ""}`,
  };

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "ru",
        }}
      >
        <title>{seo.title}</title>
        <meta name="keywords" content={seo.keywords} />
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />
        <meta http-equiv="Content-Language" content="ru"></meta>
        <meta charSet="utf-8"></meta>
      </Helmet>
      {children}
    </>
  );
};
