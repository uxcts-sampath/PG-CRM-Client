import React,{useState,useEffect} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import userprofileImage from "/theme/images/faces/face29.png";

const UpcomingFeeList = () => {

  const token = sessionStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [feeList, setFeeList] = useState([]);
  
  const handleFeeList = (selectedDate) => {
    fetch(`${apiUrl}/api/hostelalluser?date=${selectedDate.toISOString().split('T')[0]}`, { // Pass selectedDate in the query parameter
      method: 'GET', 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch hostel user data');
      }
      return response.json();
    })
    .then(data => {
      // Filter data based on endDate equal to selectedDate
      const filteredFeeList = data.filter(item => {
        const endDate = new Date(item.endDate); // Use endDate instead of billingDate
        return endDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
      });
  
      setFeeList(filteredFeeList);
    })
    .catch(error => {
      console.error('Error fetching hostel user data:', error);
    });
  }
  
  // Log feeList when it changes
  useEffect(() => {
    console.log(feeList);
  }, [feeList]);
  
  useEffect(() => {
    handleFeeList(selectedDate);
  }, [selectedDate]);
  
  useEffect(() => {
    handleFeeList(selectedDate);
  }, []);
  
  
  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  

  return (
    <>
      
      <div className="row">
        <div className="col-lg-12 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row d-flex flex-wrap justify-content-between">
                <div className="col-lg-6">
                  <div className="">
                    <h4 className="card-title mb-3">Upcome Fee payment List</h4>
                  </div>
                </div>
                <div className="mr-3" style={{ cursor: 'pointer' }}>
      <span>Select Date</span>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd-MM-yyyy"
        
      />
    </div>
              

                {/* <div className="col-lg-6">
                  <div className="d-flex align-items-center justify-content-md-end">
                    <input type="text" placeholder="search student" />{" "}
                    <button className=" btn-outline-secondary">search</button>
                  </div>
                </div> */}
              </div>
             
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <div className="d-flex">
                          <div>
                            <div className="m-l-2"> Name</div>
                          </div>
                        </div>
                      </th>
                      <th>Amount</th>
                      <th>Contact Number</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeList?.length>0 && feeList?.map((val)=>(
                    <tr key={val._id}>
                      <td>
                        <div className="d-flex">
                          <img
                            className="img-sm rounded-circle mb-md-0 mr-2"
                            src={userprofileImage}
                            alt="profile image"
                          />
                          <div>
                            <div className=" mt-2">{val.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="  mt-1">{val.amount} </div>
                      </td>
                      <td>
                        <div className="  mt-1">{val.mobile} </div>
                      </td>
                      <td>
                        <div className=" mt-1">{val.endDate} </div>
                      </td>                     
                    </tr>
                     ))}
                      
                     
                  </tbody>
                </table>
              </div>
          </div>
          </div>
      </div>
      </div>
    </>
  );
};

export default UpcomingFeeList;
