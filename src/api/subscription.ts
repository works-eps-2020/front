export const subscription = {
  SUB_MESSAGES: `subscription ($chatId: uuid!) {
    chat_message(order_by: {created_at: desc}, where: {chat_id: {_eq: $chatId}}, limit: 1) {
      id
      user {
        id
        displayname
        email
        firstname
        lastname
        logo_url
      }
      content
      created_at
    }
  }
  `,
  IS_TYPING: `subscription ($selfId: Int ) {
    user_typing (
      where: {
        id: {
          _neq: $selfId
        }
      },
      limit: 1
      order_by: {
        last_typed: desc
      }
    ){
      last_typed
      username
    }
  }`
}