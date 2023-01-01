import {CognitoUserPool} from 'amazon-cognito-identity-js';
import {COGNITO_POOL_ID} from '@env';
import  {COGNITO_CLIENT_ID} from '@env'
import {REACT_APP_COGNITO_SECRET} from '@env'
const poolData = {
  UserPoolId: String(COGNITO_POOL_ID),
  ClientId: String(COGNITO_CLIENT_ID),
};
console.log(poolData, 'cognito pool-data...')
export const cognitoPool = new CognitoUserPool(poolData);