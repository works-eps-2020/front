export const mutations = {
  CREATE_LEVEL: `mutation ($name: String!) {
    insert_level(objects: {name: $name}) {
      returning {
        id
      }
    }
  }
  `,
  DELETE_LEVEL: `mutation ($id: String!) {
    delete_level(where: {id: {_eq: $id}}) {
      returning {
        id
      }
    }
  }
  `,
  INSERT_USER: `mutation ($firstname: String!, $lastname: String!, $email: String!, $displayname: String!) {
    insert_user(objects: {firstname: $firstname, lastname: $lastname, email: $email, displayname: $displayname}) {
      returning {
        id
      }
    }
  }
  `
};
