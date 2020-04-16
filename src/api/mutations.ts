export const mutations = {
  CREATE_LEVEL: `mutation ($name: String!) {
    insert_level(objects: {name: $name}) {
      returning {
        displayname
        email
        firstname
        id
        name
      }
    }
  }  
  `,
  DELETE_LEVEL: `mutation ($id: uuid!) {
    delete_level(where: {id: {_eq: $id}}) {
      returning {
        id
      }
    }
  }
  `,
  INSERT_USER: `mutation ($displayname: String!, $email: String!, $firstname: String!, $lastname: String!, $logo_url: String!) {
    insert_user(objects: {displayname: $displayname, email: $email, firstname: $firstname, lastname: $lastname, logo_url: $logo_url}) {
      returning {
        displayname
        email
        firstname
        id
        last_seen
        lastname
        logo_url
      }
    }
  }  
  `,
  DELETE_ORGANIZATION: `mutation ($id: uuid!){
    delete_organization(where: {id: {_eq: $id}}) {
      returning {
        description
        name
        id
      }
    }
  }`,
  CREATE_ORGANIZATION: `mutation ($description: String!, $name: String!) {
    insert_organization(objects: {description: $description , name: $name}) {
      returning {
        description
        id
        name
      }
    }
  }`,
  UPDATE_ORGANIZATION: `mutation ($description: String!, $id: uuid!, $name: String!) {
    update_organization(_set: {description: $description, name: $name}, where: {id: {_eq: $id}}) {
      returning {
        description
        name
        id
      }
    }
  }
  `,
  INSERT_MESSAGE: `mutation ($content: String!, $chatId: uuid!) {
    insert_chat_message(objects: {content: $content, chat_id: $chatId}) {
      affected_rows
    }
  }
  `,
  LAST_SEEN: `mutation ($id: String!){
    update_user(_set: {last_seen: "now()"}, where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
  `,
  IS_TYPING: `mutation ($userId: Int) {
    update_user (
      _set: {
        last_typed: "now()"
      }
      where: {
        id: {
          _eq: $userId
        }
      }
    ) {
      affected_rows
    }
  }`
};
