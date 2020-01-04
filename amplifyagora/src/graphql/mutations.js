/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMarket = `mutation CreateMarket(
  $input: CreateMarketInput!
  $condition: ModelMarketConditionInput
) {
  createMarket(input: $input, condition: $condition) {
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
export const updateMarket = `mutation UpdateMarket(
  $input: UpdateMarketInput!
  $condition: ModelMarketConditionInput
) {
  updateMarket(input: $input, condition: $condition) {
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
export const deleteMarket = `mutation DeleteMarket(
  $input: DeleteMarketInput!
  $condition: ModelMarketConditionInput
) {
  deleteMarket(input: $input, condition: $condition) {
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
export const createProduct = `mutation CreateProduct(
  $input: CreateProductInput!
  $condition: ModelProductConditionInput
) {
  createProduct(input: $input, condition: $condition) {
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
export const updateProduct = `mutation UpdateProduct(
  $input: UpdateProductInput!
  $condition: ModelProductConditionInput
) {
  updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = `mutation DeleteProduct(
  $input: DeleteProductInput!
  $condition: ModelProductConditionInput
) {
  deleteProduct(input: $input, condition: $condition) {
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
export const registerUser = `mutation RegisterUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  registerUser(input: $input, condition: $condition) {
    id
    username
    email
    registered
    orders {
      items {
        id
        createdAt
      }
      nextToken
    }
  }
}
`;
export const updateUser = `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    username
    email
    registered
    orders {
      items {
        id
        createdAt
      }
      nextToken
    }
  }
}
`;
export const createOrder = `mutation CreateOrder(
  $input: CreateOrderInput!
  $condition: ModelOrderConditionInput
) {
  createOrder(input: $input, condition: $condition) {
    id
    user {
      id
      username
      email
      registered
      orders {
        nextToken
      }
    }
    product {
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
      }
    }
    shippingAddress {
      city
      country
      address_line1
      address_state
      address_zip
    }
    createdAt
  }
}
`;
