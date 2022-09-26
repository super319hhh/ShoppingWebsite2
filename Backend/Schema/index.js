const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
        firstname: String!
        lastname: String!
        phone: Int
        address: String
    }

    type Order {
        _id: ID!
        creator: User!
        products: [ProductInOrder!]
        date: String!
        status: String!
    }

    type OrderOutput {
        _id: ID!
        creator: User!
        products: [ProductInOrderOutput!]
        date: String!
        status: String!
    }

    type Cart {
        _id: ID!
        creator: User!
        product: Product!
        quantity: Int!
    }

    type Product {
        _id: ID!
        name: String!
        price: Float!
        description: String!
        images: [String]
    }

    input OrderInput {
        creator: String!
        product: String!
        quantity: Int!
    }

    input UserInput {
        email: String!
        password: String!
        firstname: String!
        lastname: String!
        phone: Int 
        address: String
    }

    input ProductInput{
        name: String!
        price: Float!
        description: String!
        images: [String!]
    }

    input CartInput{
        Creator: String!
        Product: String!
    }

    input ChangeCartQuantityInput{
        User: String!
        Product: String!
        Quantity: Int!
    }

    type AuthData{
        userId: ID!
        token: String!
        tokenExpiration: Int!
    } 

    type ProductInOrder{
        product: String!
        quantity: Int!
        price: Float!
    }

    type ProductInOrderOutput{
        product: Product!
        quantity: Int!
        price: Float!
    }

    type CartData {
        _id: ID!
        creator: User!
        product: Product!
        quantity: Int!
    }

    type RootQuery {
        users: [User!]!
        Products: [Product!]!
        getCartForUser(userId: String!): [Cart]!
        fetchOrders: [OrderOutput!]
        findProductsByName(name: String!): [Product!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createProduct(productInput: ProductInput): Product
        addToCart(cartInput: CartInput): Cart
        changeQuantityInCart(changeCartQuantityInput:ChangeCartQuantityInput):Cart
        placeOrder(cart:[OrderInput!]):Order
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
