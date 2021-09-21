import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { bookRoomPayPal } from '../actions/roomActions';
import { context } from '../context/context';




const PayPal = ({roomId}) => {
    
    const {state: {user}, dispatch} = useContext( context )
    const history = useHistory()

    const handleCreateOrder = async () => {

        const res = await bookRoomPayPal(roomId, user, dispatch )
        console.log(res.id)
        if(res.success) return res.id;
        return false
        
    }
    
    const handleOnApprove = async (data, actions) => {
        console.log("onApproveData: ", data);
        try {
            const details = await actions.order.capture()
            console.log("details:", details)
            alert("booking finished successfully")
            history.push("/room/bookings")
            return details;
        } catch (error) {
            console.log(error)
            alert("Something went wrong with payment")
        }
    }

    return (
        <PayPalScriptProvider options={{ "client-id" : process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
            <PayPalButtons createOrder={handleCreateOrder} onApprove={handleOnApprove} />
        </PayPalScriptProvider>
    )
    
}


export default PayPal;
