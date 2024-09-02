import Header from "./Header";
import { useRef, useState } from "react"
import {toast } from "sonner";
function DeleteTest(){
  const [test, setTest] = useState({
    id:0,
    ref: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    note: "",
    product : "",
    state : "",
    machine: {
      id:0,
      name: "",
      type: ""
    },
    secondMachine: {
      id:0,
      name: "",
      type: ""
    },
   
    legNumber:0,

   

  })

  var testInfoRef = useRef(null);

  async function deleteTest(event) {
    event.preventDefault();
    const url = 'http://localhost:8089/delete-test/'+test.id; 
 
    try {
       await fetch(url, {
        method: 'DELETE',
        
      });
      //const data = await response.json();
     // console.log(data);
     console.log("test deleted");
     toast.success("test deleted")
    } catch (error) {
      toast.error("something went wrong")
      console.error(error);
    }


    
  }


  async function displayInfo(event){
    event.preventDefault();
    const url = 'http://localhost:8089/get-test-by-ref/'+test.ref; 
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      console.log(data);
      //fill the form
      setTest({

        id:data.id,
        ref: data.ref,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        note: data.note,
        product : data.product,
        state : data.state,
        machine : data.machine || {  name: "N/A", type: "" },
        secondMachine: data.secondMachine||{  name: "N/A", type: "" },
        legNumber:data.legNumber
      });
      testInfoRef.current.style.display='block';
   
    } catch (error) {
      toast.error("something went wrong")
      console.error(error);
    }
    


  }

  function onchange(event) {
    setTest({ ...test, [event.target.name]: event.target.value })
  }




  return(<>
  <Header></Header>
  <form onSubmit={deleteTest} className="add-test">
      <h2>Delete Test</h2>
      <label >Reference</label>
      <div className="search-bar">
        <input onChange={onchange} value={test.ref} name="ref" type="search" id="search-input" placeholder="Search test ref..." />
        <button onClick={displayInfo} >Search</button>
      </div>
   
    <div ref={testInfoRef} className="test-info">
      <ol>
    <li> description :{test.description} </li>
    <li> startDate : {test.startDate.toString()}</li>
    <li> endDate : {test.endDate.toString()} </li>
    <li> note :{test.note} </li>
    <li> product :{test.product} </li>
    <li> state : {test.state} </li>
    <li>machine : {test.machine.name ? test.machine.name:""}</li>
    <li> second machine : {test.secondMachine.name? test.secondMachine.name: ""}</li>
    <li> leg Number : {test.legNumber}</li>
   
      </ol>
    </div>
    <button type="submit">Delete </button>
    </form>
  </>)
}export default DeleteTest;