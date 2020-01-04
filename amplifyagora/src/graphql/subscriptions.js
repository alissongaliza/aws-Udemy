/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMarket = `subscription OnCreateMarket {
  onCreateMarket {
    id
    name
    tags
    owner
    createdAt
    products {
      items {
        id
        description
        price
        shipped
        owner
        createdAt
      }
      nextToken
    }
  }
}
`;
export const onUpdateMarket = `subscription OnUpdateMarket {
  onUpdateMarket {
    id
    name
    tags
    owner
    createdAt
    products {
      items {
        id
        description
        price
        shipped
        owner
        createdAt
      }
      nextToken
    }
  }
}
`;
export const onDeleteMarket = `subscription OnDeleteMarket {
  onDeleteMarket {
    id
    name
    tags
    owner
    createdAt
    products {
      items {
        id
        description
        price
        shipped
        owner
        createdAt
      }
      nextToken
    }
  }
}
`;
export const onCreateProduct = `subscription OnCreateProduct($owner: String!) {
  onCreateProduct(owner: $owner) {
    id
    description
    file {
      bucket
      region
      key
    }
    price
    shipped
    owner
    createdAt
    market {
      id
      name
      tags
      owner
      createdAt
      products {
        nextToken
      }
    }
  }
}
`;
export const onUpdateProduct = `subscription OnUpdateProduct($owner: String!) {
  onUpdateProduct(owner: $owner) {
    id
    description
    file {
      bucket
      region
      key
    }
    price
    shipped
    owner
    createdAt
    market {
      id
      name
      tags
      owner
      createdAt
      products {
        nextToken
      }
    }
  }
}
`;
export const onDeleteProduct = `subscription OnDeleteProduct($owner: String!) {
  onDeleteProduct(owner: $owner) {
    id
    description
    file {
      bucket
      region
      key
    }
    price
    shipped
    owner
    createdAt
    market {
      id
      name
      tags
      owner
      createdAt
      products {
        nextToken
      }
    }
  }
}
`;
