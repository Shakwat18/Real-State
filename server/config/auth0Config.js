import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "https://real-state-kappa.vercel.app",
    issuerBaseURL: "https://dev-p73zinpt2ev606r7.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck