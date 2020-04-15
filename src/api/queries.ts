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
  chats: `query ($id: String!) {
    chat {
      group_picture
      id
      name
      chat_messages(limit: 1, order_by: {created_at: desc}) {
        content
        created_at
        id
        status
        user {
          auth0_id
          firstname
          lastname
          displayname
          email
        }
      }
      chat_users(where: {user: {auth0_id: {_neq: $id}}}) {
        user {
          displayname
          logo_url
          auth0_id
          firstname
          email
          lastname
        }
      }
    }
  }  
  `
};
