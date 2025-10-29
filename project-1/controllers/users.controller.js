const register = (request, response) => {
    try {

    } catch (error) {
        return response.status(500).json({ errorMessage: 'Internal Server Error' })
    }
}

const getUser = (request, response) => {
    try {
        return response.status(200).json({ success: true, statusCode: 200, message: 'User get successfully' })
    } catch (error) {
        return response.status(500).json({ errorMessage: 'Internal Server Error' })
    }
}

module.exports = { register, getUser }