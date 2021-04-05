const variables = {
    development: {
        googleApiKey: 'AIzaSyAdtvQfi1PlFcpOFRBUBJZd6Nm_pC6oSGU'
    },
    production: {
        googleApiKey: ''
    }
}

const getEnvVariables = () => {
    if (__DEV__) {
        return variables.development
    }
    return variables.production
}

export default getEnvVariables