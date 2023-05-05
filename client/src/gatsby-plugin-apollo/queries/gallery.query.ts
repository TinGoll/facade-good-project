import { gql } from "@apollo/client";

const GALLERY_GET_ALL = gql`
  query getAll($tag: String, $category: String) {
    findAll(tag: $tag, category: $category) {
      id
      category
      tag
      index
      title
      subtitle
      description
      params
      images {
        id
        filename
        index
      }
    }
  }
`;

declare module GalleryImages {
  interface Root {
    findAll: Item[];
  }

  interface Item {
    __typename: string;
    id: string;
    category: string;
    tag: string;
    index: number;
    title: string;
    subtitle: string;
    description: string;
    params: string;
    images: Image[];
  }

  interface Image {
    __typename: string;
    id: string;
    filename: string;
    index: number;
  }
}

export { GalleryImages, GALLERY_GET_ALL };
