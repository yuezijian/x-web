import { gql } from 'apollo-boost';


const gql_request =
  {
    items:
      `
        query
        {
          items
          {
            id
            name
          }
        }
      `,

    item_add:
      `
        mutation($text: String!)
        {
          item_add(name: $text)
          {
            success
            message
            item
            {
              id
              name
            }
          }
        }
      `,

    item_remove:
      `
        mutation($id: ID!)
        {
          item_remove(id: $id)
          {
            success
            message
            item
            {
              id
              name
            }
          }
        }
      `,

    item_update:
      `
        mutation($id: ID!, $name: String!)
        {
          item_update(id: $id, name: $name)
          {
            success
            message
            item
            {
              id
              name
            }
          }
        }
      `,

    on_item_add: gql
      `
        subscription
        {
          on_item_add
          {
            id
            name
          }
        }
      `,

    on_item_remove: gql
      `
        subscription
        {
          on_item_remove
          {
            id
            name
          }
        }
      `,

    on_item_update: gql
      `
        subscription
        {
          on_item_update
          {
            id
            name
          }
        }
      `
  };


export default gql_request;
