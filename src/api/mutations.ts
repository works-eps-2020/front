export const mutations = {
  INSERT_USER: `mutation ($displayname: String!, $email: String!, $firstname: String!, $lastname: String!, $logo_url: String!) {
    insert_user(objects: {displayname: $displayname, email: $email, firstname: $firstname, lastname: $lastname, logo_url: $logo_url}) {
      returning {
        auth0_id
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
};
