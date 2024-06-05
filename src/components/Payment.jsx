import React from "react";
import { useNavigate } from "react-router-dom";


const Payment=()=>{
    const navigate = useNavigate();

    return(
        <div>
           <div>
            <p> Thank You for Choosing this Payment Plan</p>
           </div>
            <div>
                <button onClick={navigate('/home')}>Back</button>
            </div>
        </div>
    )
}

export default Payment;