//even a resource server needs the client id of the corresponding frontend app to verify the token correctly.
import {CognitoJwtVerifier} from "aws-jwt-verify";

const cognitoPoolId = process.env.COGNITO_POOL_ID
const awsRegion = process.env.AWS_REGION
const clientId = process.env.COGNITO_CLIENT_ID

if (!cognitoPoolId || !awsRegion || !cognitoPoolId.includes(awsRegion) || !clientId) {
    console.log(cognitoPoolId)
    console.log(awsRegion)
    throw new Error("Auth must be configured correctly!");
}

export const verifier = CognitoJwtVerifier.create({
    userPoolId: cognitoPoolId,
    tokenUse: 'id',
    clientId: clientId,
});

export const verifyToken = async (token: string) => {
    return verifier.verify(token);
}