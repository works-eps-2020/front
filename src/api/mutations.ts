export const mutations = {
  INSERT_USER: `mutation ($firstname: String!, $lastname: String!, $email: String!, $displayname: String!) {
    insert_user(objects: {firstname: $firstname, lastname: $lastname, email: $email, displayname: $displayname}) {
      returning {
        id
      }
    }
  }
  `,
};
