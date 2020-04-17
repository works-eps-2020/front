export const queries = {
  profile: `{
    user {
      id
      lastname
      firstname
      email
      displayname
    }
  }`,
  levels: `{
    level {
      id
      name
      topics_aggregate {
        aggregate {
          count
        }
      }
    }
  }`,
  chats: `query ($id: String!) {
    chat {
      group_picture
      id
      name
      chat_messages(limit: 20, order_by: {created_at: desc}) {
        content
        created_at
        id
        user {
          id
          firstname
          lastname
          displayname
          email
          logo_url
        }
      }
      chat_users(where: {user: {id: {_neq: $id}}}) {
        user {
          displayname
          logo_url
          id
          firstname
          email
          lastname
        }
      }
    }
  }  
  `,
  organizations: `query {
    organization {
      description
      id
      name
    }
  }`,
  getUserLike: `query ($name: String!) {
    user(where: {displayname: {_ilike: $name}}) {
      id
      displayname
    }
  }
  `
};
