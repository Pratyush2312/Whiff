import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router'
import { IoCopy } from "react-icons/io5";
const Order = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const handleCopy = () => {
        navigator.clipboard.writeText(slug); 
        toast.success("Order Id copied");
    }
    return (
        <div className='flex justify-center items-center h-screen bg-gray-50'>

            <div className='flex flex-col gap-5 bg-white p-8 rounded-2xl shadow-lg items-center'>

                <h1 className='font-bold text-3xl text-green-600'>
                    Order Placed Successfully
                </h1>

                <div className='flex items-center gap-2'>
                    <p className='text-gray-600'>
                        Order ID: <span className='font-semibold'>{slug}</span>
                    </p>

                    <button
                        onClick={handleCopy}
                        className='bg-gray-200 px-2 py-1 rounded text-sm hover:bg-gray-300'
                    >
                        <IoCopy />
                    </button>
                </div>

                <p className='text-sm text-gray-500'>
                    Your order has been confirmed and will be shipped soon.
                </p>

                <button
                    className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition'
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </button>

            </div>
        </div>
    )
}

export default Order;
