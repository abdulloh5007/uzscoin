import { useNavigate, useParams } from 'react-router-dom'
import './User.scss'
import { users } from '../../data/fakeUser'
import { Button } from '@mui/material'

function User() {
    const { wallet } = useParams()
    const userData = users.find((user) => user.wallet === wallet)
    const secret = window.localStorage.getItem('key')
    const navigate = useNavigate()

    const handleLogOut = () => {
        navigate('/')
        window.localStorage.removeItem('key')
    }

    if (!userData) {
        return (
            <div>
                User not found
            </div>
        )
    }

    return (
        <div className='user'>
            <b>Hello, {userData.name}</b>
            <b>USDT: {userData.usdt}$</b>
            {
                secret == 'secret123' ? <Button onClick={() => handleLogOut()} className='myBtn' variant='outlined'>Log Out</Button> : <></>
            }
        </div>
    )
}

export default User