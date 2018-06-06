import { 
  USER_SET,
  TOKEN_SET
} from "./type";

export const userSet = (user) => {
  return {
    type: USER_SET,
    user
  }
}

export const tokenSet = ({ oauth_token, oauth_token_secret }) => {
  return {
    type: TOKEN_SET,
    token: oauth_token,
    token_secret: oauth_token_secret
  }
}

