import React,{useState,useEffect} from "react";
import userprofileImage from "/theme/images/faces/face29.png";

const MemberShip = () => {

  const token = sessionStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = sessionStorage.getItem("userId")
  const [membershipData, setMembershipData] = useState([]);


  const MembershipData = () => {
    fetch(`${apiUrl}/api/payment/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch membership data');
        }
        return response.json();
      })
      .then((data) => {
        console.log("About to set membershipData with:", data.data);
        setMembershipData(data.data);
      })
      
      .catch((error) => console.error('Error fetching membership data:', error));
  };

  console.log(membershipData)

  useEffect(()=>{
    MembershipData()
  },[])

  console.log('dfdv',membershipData);

  console.log("Rendering membershipData:", membershipData);
  
  

  return (

   <>
  

     
       

<div className="row">
        <div className="col-lg-12 d-flex grid-margin stretch-card">
          <div className="card ">
            <div className="card-body ml-4">
              <h1>Membership</h1>
              <p>Plan Details</p>
              <div className="row">
                <div className="col-lg-9 border border-light">
                  <div className="mt-3">
                    <h3>Standard Plan</h3>
                    <p>Add subscription details</p>
                  </div>
                </div>
              </div>
              <p className="m-3 mr-0">Payment Info</p>
              <div className="row">
                <div className="col-lg-9 border border-light">
                  <div className="m-3">
                    <h3>Next Payment</h3>
                    {/* Assuming membershipData is an object and accessing nextPlanDate */}
                    <p>{membershipData.nextPlanDate}</p>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <div className="d-flex">
                          <div>
                            <div className="m-l-2"> Date</div>
                          </div>
                        </div>
                      </th>
                      <th>Description</th>
                      <th>Service Period</th>
                      <th>Payment method</th>
                      <th>Subtotal</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <div>
                            <div className=" mt-2"></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className=" mt-1"></div>
                      </td>
                      <td>
                        <div className=" mt-1"></div>
                      </td>
                      <td>
                        <div className=" mt-1"></div>
                      </td>
                      <td>
                        <div className=" mt-1"></div>
                      </td>
                      <td>
                        <div className=" mt-1"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
)};

export default MemberShip;
