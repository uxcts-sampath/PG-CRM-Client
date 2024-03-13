import React from "react";
import userprofileImage from "/theme/images/faces/face29.png";

const MemberShip = () => {
  return (
  <>
  <div className="row">
        <div className="col-lg-12 d-flex grid-margin stretch-card">
          <div className="card ">
            <div className="card-body ml-4">
                  <h1>MemberShip</h1>
                  <p>Plan Details</p>
                  <div className="row">
                  <div className="col-lg-9 border border-light" >
                    <div className="mt-3">
                    <h3 >Standard Plan</h3>
                    <p>Add subscription details</p>
                    </div>
                  </div>
                  </div>
                  <p className="m-3 mr-0">Payment Info</p>
                  <div className="row">
                  <div className="col-lg-9 border border-light" >
                  <div className="m-3">
                    <h3 >Next Payment</h3>
                    <p>25 February 2024</p>
                    <p>No Payment method on file</p>
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
                  
                       <tr >
                       <td>
                         <div className="d-flex">
                           
                           <div>
                             <div className=" mt-2">name</div>
                           </div>
                         </div>
                       </td>
                       <td>
                         <div className="  mt-1">mobile </div>
                       </td>
 
                       <td>
                         <div className=" mt-1">studyingAt </div>
                       </td>
 
                       <td>
                         <div className=" mt-1">residenceCity </div>
                       </td>
 
                       <td>
                         <div className=" mt-1">sta</div>
                       </td>
                       <td>
                         <div className=" mt-1">room</div>
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
