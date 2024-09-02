import Header from "./Header";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
function AddTest() {

  var [test, setTest] = useState({
    
    ref: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    note: "",
    product: "",
    state: "",
    machine: {
      name: "",
      type: ""
    },
    secondMachine: {
      name: "",
      type: ""
    },
    leg: 0,
    sequantial: false,
    sequence: 0

  })

  var machineInfo = useRef(null);
  var secondMachineInfo = useRef(null);
  var type4 = useRef(null);
  //const [conflictingTest, setConflictingTest]= useState([])
  const [projectRef, setProjectRef] = useState("")

  async function saveTest(event) {
    event.preventDefault();
    const url = 'http://localhost:8089/assign-test-to-project/' + projectRef;
    const headers = {
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(test);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body
      });
      if (!response.ok) {
        const errorData = await response.json(); 
                handleError(errorData);
      }else{
        const data = await response.text();
      console.log(data);
      if(data === "test saved" || data === "test saved!"){
      toast.success(data);}else{
        toast.error(data)
      }
      }
      
    } catch (error) {
    //  toast.error("somethig went wrong" + error.Header)
      console.error(error);
    }

 }
 const handleError = (errorData) => {
  // Check if the error message contains "Duplicate entry"
  if (errorData.message && errorData.message.includes("Duplicate entry")) {
      // Customize the error message
      toast.error("A test with this reference already exists. Please use a different reference.");
  } else {
      // Fallback for other errors
      toast.error(`Error: ${errorData.message || "An unknown error occurred."}`);
  }
};

    /*const url2 = 'http://localhost:8089/check-for-conflict/'+ test.ref; 

    try {
      const response = await fetch(url2, {
        method: 'GET',
        headers,
      });
      const conflictingRefs = await response.json();
      console.log(conflictingRefs);
     // setConflictingTest(data)

     if(conflictingRefs.length > 0){
      const url3 = 'http://localhost:8089/get-test-by-ref/'+test.ref; 
      try {
        const response = await fetch(url3, {
          method: 'GET',
          headers,
        });
        const data = await response.json();
        console.log(data);
        const url4 = 'http://localhost:8089/delete-test/'+ data.id; 
        try {
          await fetch(url4, {
           method: 'DELETE',
           
         });
         //const data = await response.json();
        // console.log(data);
        console.log("test deleted");
         toastSuccess("test deleted");
       } catch (error) {
         console.error(error);
       }
        
        toastSuccess("test retreived");
      } catch (error) {
        console.error(error);
      }
    }else{
      console.log("test saved ")
      
      
    }
      
      toastSuccess("conflict check");
    } catch (error) {
      console.error(error);
    }*/





 

  /*async function conflictCheck(event) {
    event.preventDefault();
    const url = 'http://localhost:8089/check-for-conflict/'+ test.ref; 
    const headers = {
      'Content-Type': 'application/json'
    };
  //  const body = JSON.stringify(test); 
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      console.log(data);
     // setConflictingTest(data)
      
      toastSuccess("test retreived");
    } catch (error) {
      console.error(error);
    }
    
  }*/

  function onchange(event) {
    setTest({ ...test, [event.target.name]: event.target.value })
  }
  function changeProjectRef(event) {
    setProjectRef(event.target.value);
  }
  function onchangeMachineName(event) {
    setTest(t => ({
      ...t,
      machine: {
        ...t.machine,
        name: event.target.value
      }
    }));
  }
  function onchangeSecondMachineName(event) {
    setTest(t => ({ ...t, secondMachine: { ...t.secondMachine, name: event.target.value } }))
  }
  function onchangeMachineType(event) {
    setTest(t => ({
      ...t,
      machine: {
        ...t.machine,
        type: event.target.value
      }
    }));
  }
  function onchangeSecondMachineType(event) {
    setTest(t => ({
      ...t,
      secondMachine: {
        ...t.secondMachine,
        type: event.target.value
      }
    }));
  }
  function onchangeSquencial(event) {
    setTest(t => ({
      ...t,
        sequantial: event.target.value
      
    }));
  }
  function toggleSecondMachineInfo() {
    if (secondMachineInfo.current.style.display === "block") {
      secondMachineInfo.current.style.display = "none";

    }
    else {
      secondMachineInfo.current.style.display = "block";

    }


  }
  function toggleMachineInfo() {
    if (machineInfo.current.style.display === "block") {
      machineInfo.current.style.display = "none";

    }
    else {
      machineInfo.current.style.display = "block";

    }

  }

  function onClickSelectMachineType4(){
    setTest(t=>({...t,machine:{...t.machine , type: type4.current}}))
  }


  return (
    <>
      <Header></Header>
      <form onSubmit={saveTest} className="add-test">
        <h2>Add Test</h2>
        <input type="hidden" defaultValue={test.id} />
        <label >Project Reference:</label>
        <input type="text" value={projectRef} onChange={changeProjectRef} name="projectref" required />
        <label >Test Reference:</label>
        <input type="text" value={test.ref} onChange={onchange} name="ref" required />

        <label >Description:</label>
        <textarea value={test.description} onChange={onchange} name="description" ></textarea>

        <label >Start Date:</label>
        <input value={test.startDate} onChange={onchange} type="date" name="startDate" required />

        <label >End Date:</label>
        <input value={test.endDate} onChange={onchange} type="date" name="endDate" required />

        <label >Note:</label>
        <textarea value={test.note} onChange={onchange} name="note"></textarea>

        <label >State:</label>
        <select value={test.state} onChange={onchange} name="state" required>
          <option value="">Select State</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="FINISHED">Finished</option>
          <option value="PLANNED">Planned</option>
        </select>

        <label >Leg:</label>
        <input type="number" value={test.leg} onChange={onchange} name="leg" required />
        <label>sequantial</label>
        <input type="radio"  name="sequential" value={true} onChange={ onchangeSquencial}></input>
        <label> yes</label><br />
        <input type="radio"  name="sequential" value={false} onChange={ onchangeSquencial}></input>
        <label>no</label>
        <label >sequence :</label>
        <input type="number" value={test.sequence} onChange={onchange} name="sequence" required />


        <label onClick={toggleMachineInfo} className="machineInputLable" >Machine</label>

        <div ref={machineInfo} className="machineInput">

        <label  >machine:</label>
        <select value={test.machine.name} name="test.machine.name" onChange={onchangeMachineName} required >
         <option value="">Select machine</option>
          <option value="ET M400 (Temp: AMB-300°C)">ET M400 (Temp: AMB-300°C) </option>
          <option value="Enceinte 514 (T/H)-R+A9+A7:A7:A23">Enceinte 514 (T/H)-R+A9+A7:A7:A23</option>
          <option value="New ET 1000 (T/H)-Relais  L073S">New ET 1000 (T/H)-Relais  L073S</option>
          <option value="ET 1000 (T/H)-Relais">ET 1000 (T/H)-Relais</option>
          <option value="ET 770 (T/H)-Relais">ET 770 (T/H)-Relais</option>
          <option value="ET 512 (T/H)-Relais">ET 512 (T/H)-Relais</option>
          <option value="Pot vibrant 1 - ETS 30 kN">Pot vibrant 1 - ETS 30 kN</option>
          <option value="New Pot vibrant 3 - ETS 40 kN">New Pot vibrant 3 - ETS 40 kN</option>
          <option value="ET HTV4057 (T/H)-Relais">ET HTV4057 (T/H)-Relais</option>
          <option value="Pot vibrant 2 LDS 15KN">Pot vibrant 2 LDS 15KN</option>
          <option value="ET CH120 Climats">ET CH120 Climats </option>
          <option value="Votch Choc Thermique">Votch Choc Thermique </option>
          <option value="ETB.I.A (T -50°C / 120°C)">ETB.I.A (T -50°C / 120°C) </option>
          <option value="Brouillard Salin">Brouillard Salin</option>
          <option value="Halt">Halt</option>
          <option value="Other: Table ESD">Other: Table ESD </option>
          <option value="Other: Table IP7">Other: Table IP7</option>
          <option value="Other: Rigidité ">Other: Rigidité </option>
          <option value="Other: Free Fall, Electrical">Other: Free Fall, Electrical </option>
          <option value="Enceinte climatique Température/Humidité (-40°C - 180°C)">Enceinte climatique Température/Humidité (-40°C - 180°C)</option>
          <option value="Enceinte de choc thermique (-80°C - 180°C)">Enceinte de choc thermique (-80°C - 180°C)</option>
          <option value="Enceinte climatique mobile Temp/Humidité  (-60°C - 180°C)">Enceinte climatique mobile Temp/Humidité  (-60°C - 180°C)</option>
          <option value="Pot vibrant 20 KN">Pot vibrant 20 KN</option>
          <option value="Choc thermique ">Choc thermique </option>
          <option value="Enceinte climatique Température/Humidité">Enceinte climatique Température/Humidité </option>
          <option value="Enceinte de choc thermique (-80°C - 180°C)">Enceinte de choc thermique (-80°C - 180°C)</option>
          <option value="Enceinte Climatique 1">Enceinte Climatique 1</option>
          <option value="Enceinte Climatique 2">Enceinte Climatique 2</option>
          <option value="Enceinte Choc Thermqiue ">Enceinte Choc Thermqiue </option>
          <option value="Enceinte Brouillard Salein ">Enceinte Brouillard Salein </option>
          <option value="Etuve Séchage ">Etuve Séchage </option>
          <option value="Enceinte Qsun">Enceinte Qsun</option>
          <option value="IP6x Tests CERT (talk)">IP6x Tests CERT (talk)</option>
          <option value="CERT, IP Testing">CERT, IP Testing</option>
          <option value="SAC 10">SAC 10</option>
          <option value="Essais électriques">Essais électriques</option>
          <option value="Banc ISO ">Banc ISO </option>
          <option value="Table ESD">Table ESD</option>
        </select>
        <label >type:</label>
        <select value={test.machine.type} name="test.machine.type" onChange={onchangeMachineType}  >
          <option value=""> select type</option>
        <option value="Equipement ACTIA ES">Equipement ACTIA ES</option>
        <option value="Equipements CETIME">Equipements CETIME</option>
        <option value="Equipements CRT">Equipements CRT</option>
        <option value="Equipements CETIBA">Equipements CETIBA</option>
        <option value="Equipements CERT">Equipements CERT</option>
         
         
        </select>





         
        </div>

        <label onClick={toggleSecondMachineInfo} className="machineInputLable" >Combinated Machine</label>
        <div ref={secondMachineInfo} className="machineInput">

        <select value={test.secondMachine.name} name="test.machine.name" onChange={onchangeSecondMachineName}  >
         <option value="">Select machine</option>
          <option value="ET 512 (T/H)-Relais">ET 512 (T/H)-Relais</option>
          <option value="Pot vibrant 1 - ETS 30 kN">Pot vibrant 1 - ETS 30 kN</option>
          <option value="New Pot vibrant 3 - ETS 40 kN">New Pot vibrant 3 - ETS 40 kN</option>
          <option value="ET HTV4057 (T/H)-Relais">ET HTV4057 (T/H)-Relais</option>

        </select>
        <label >type:</label>
        <select value={test.secondMachine.type} name="test.machine.type" onChange={onchangeSecondMachineType}  >
          <option value=""> select type</option>
        <option value="Equipement ACTIA ES">Equipement ACTIA ES</option>
   
         
         
        </select>


        
        </div>

        <label >Product:</label>
        <input type="text" value={test.product} onChange={onchange} name="product" required />

        <button type="submit">Submit</button>
      </form>
    </>
  )

}
export default AddTest

//<label > name : </label>
//<input type="text" value={test.machine.name} onChange={onchangeMachineName}/>
//<label >type:</label>
//<input type="text" value={test.machine.type} onChange={onchangeMachineType}/>


/*  <label >name : </label>
          <input type="text" value={test.secondMachine.name} onChange={onchangeSecondMachineName} name="Secondname" />
          <label >type:</label>
          <input type="text" value={test.secondMachine.type} onChange={onchangeSecondMachineType} name="secondtype" /> */