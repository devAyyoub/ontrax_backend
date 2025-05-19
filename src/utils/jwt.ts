import jwt from 'jsonwebtoken'

export const generateJWT = () => {
    const data = {
        name: 'Ayyoub',
        credit_card: '123454313123123',
        password: 'password '
    }

    const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '1h',

    })
    return token
}