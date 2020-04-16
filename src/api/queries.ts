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
          count(distinct: true)
        }
      }
    }
  }`
};
