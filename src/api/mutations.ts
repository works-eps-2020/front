export const mutations = {
  CREATE_LEVEL: `mutation ($name: String!) {
    insert_level(objects: {name: $name}) {
      returning {
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
  `
};
