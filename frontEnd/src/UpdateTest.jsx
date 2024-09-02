
import Header from "./Header";

import { useRef, useState } from "react";
import { toast } from 'sonner';

function UpdateTest() {
  const [test, setTest] = useState({
    id: 0,
    ref: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    note: "",
    product: "",
    state: "",
    machine: {
      id: 0,
      name: "",
      type: ""
    },
    secondMachine: {
      id: 0,
      name: "",
      type: ""
    },
    leg: 0,
    project: {
      id: 0,
      ref: "",
      priority: 0,
      description: "",
      client: "",
      projectLead: "",
      support: "",
      state: ""
    },
    sequantial: false,
    sequence: 0


  })

  const [tests,setTests] =useState([])

  const testId = useRef([]);

  var machineInfo = useRef(null);
  var secondMachineInfo = useRef(null);
  const [oldStart, setOldStart] = useState({});
  const [oldEnd, setOldEnd] = useState({});
  // const [priority, setPriority] = useState(0);
  const [conflictingTests, setConflictingTests] = useState([])

  var testInfo= useRef(null);
 


  async function updateTest(event) {
    event.preventDefault();
    const url = 'http://localhost:8089/assign-test-to-project/' + test.project.ref;
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
      } else {
        const data = await response.text();
        console.log(data);
        if (data === "test saved") {
          toast.success(data);
        } else {
          toast.error(data)
        }
      }
    } catch (error) {
      toast.error("something went wrong" + error)
      console.error(error);
    }
  }


  async function fillForm2(event) {
    testId.current.value = event.target.value
    event.preventDefault();
    const url = 'http://localhost:8089/get-test-by-id/' + testId.current.value;
    const headers = {
      'Content-Type': 'application/json'
    };
    try{
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      console.log(data);
      if (data.secondMachine !== null) {
        //fill the form
        setTest({

          id: data.id,
          ref: data.ref,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
          note: data.note,
          product: data.product,
          state: data.state,
          machine: data.machine,
          sequantial: data.sequantial,
          sequence: data.sequence,
          secondMachine: data.secondMachine,
          leg: data.leg,
          project: data.project

        });
      } else {
        setTest({

          id: data.id,
          ref: data.ref,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
          note: data.note,
          product: data.product,
          state: data.state,
          machine: data.machine,
          sequantial: data.sequantial,
          sequence: data.sequence,
          leg: data.leg,
          project: data.project

        });

      }
      setOldStart(data.startDate);
      setOldEnd(data.endDate);

    }catch(error){
      toast.error("something went wrong")
      console.error(error);

    }
    
  }

  async function fillForm(event) {
    event.preventDefault();
    const url = 'http://localhost:8089/get-tests-by-ref/' + test.ref;
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      const data1 = await response.json();
      console.log(data1);
      if(data1.length===0){
        toast.error("test does not exist")
      }

      if(data1.length===1){
        const url1 = 'http://localhost:8089/get-test-by-ref/' + test.ref;
        const headers = {
          'Content-Type': 'application/json'
        };
        try {
          const response = await fetch(url1, {
            method: 'GET',
            headers,
          });
    
          const data = await response.json();
          console.log(data);
      
        if (data.secondMachine !== null) {
          //fill the form
          setTest({
  
            id: data.id,
            ref: data.ref,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            note: data.note,
            product: data.product,
            state: data.state,
            machine: data.machine,
            sequantial: data.sequantial,
            sequence: data.sequence,
            secondMachine: data.secondMachine,
            leg: data.leg,
            project: data.project
  
          });
        } else {
          setTest({
  
            id: data.id,
            ref: data.ref,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            note: data.note,
            product: data.product,
            state: data.state,
            machine: data.machine,
            sequantial: data.sequantial,
            sequence: data.sequence,
            leg: data.leg,
            project: data.project
  
          });
  
        }
        setOldStart(data.startDate);
        setOldEnd(data.endDate);
      }
      
      catch(error){
        toast.error("something went wrong")
      console.error(error);
      }
      }else{
        setTests(data1)
        console.log(data1);
      }


    } catch (error) {
      toast.error("something went wrong")
      console.error(error);
    }

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

  


  async function delayTest(event) {
    //save the test with the new dates
    event.preventDefault();
    const url = 'http://localhost:8089/delay-test/' + test.startDate + '/' + test.endDate + '/' + test.id;
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers,
      });
      if (!response.ok) {
        const errorData = await response.json();
        handleError(errorData);
      } else {
        const data = await response.text();
        console.log(data);
        if (data.includes("success")) {
          toast.success("success");
        } else {
          toast.error(data)
        }
      }


    } catch (error) {
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

  async function manualDelay(event) {
    event.preventDefault();
    const url = 'http://localhost:8089/manual-update/' + test.id + '/' + test.startDate + '/' + test.endDate;
    const headers = {
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify(test);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message)
      } else {
        const data = await response.text();
        console.log(data);
        if (data.includes("test saved")) {
          toast.success(data);
        } else {
          toast.error(data)
        }
      }

    } catch (error) {
      toast.error("something went wrong" + error)
      console.error(error);
    }
  }

  /* function changePriority(event) {
     setPriority(event.target.value);
 
   }*/

  function onchange(event) {
    setTest({ ...test, [event.target.name]: event.target.value })
  }
  function onchangeSquencial(event) {
    setTest(t => ({
      ...t,
      sequantial: event.target.value

    }));
  }


  /*   <div ref={testInfo} className="test-list-info">
      <p>Project: {test.project.ref} </p>
      <p>Start Date: {test.startDate}</p>
      <p>End Date: {test.endDate}</p>
      <p>Machine Name: {test.machine.name}</p>
      <p>Machine Type: {test.machine.type}</p>
      </div> */

      function toggleTestInfo(event){
        testId.current.value= event.target.value
        console.log("logging id " +  testId.current.value);
        fillForm2();
    
    
        
      }

  

  return (
    <>
      <Header />
      <div className="container">
        <form onSubmit={updateTest} >
          <h2 className="title">UPDATE TEST</h2>
          <input type="hidden" defaultValue={test.id} />
          <input type="hidden" defaultValue={test.project.ref}></input>
          <div className="row">
            <div className="col-25">
              <label >Reference</label>
            </div>
            <div className="search-bar">
              <input type="search" value={test.ref} onChange={onchange} name="ref" placeholder="Search test..." />
              <button onClick={fillForm}>Search</button>
            </div>
          </div>
          <div className="list-of-tests-container">
          
          <ol >
  {tests.map((test, index) => (
    
    <li key={index}>
       <div   >
        <input ref={testId} type="hidden" ></input>
      <p type="text"   > {test.ref} </p>
         <p>project : {test.project.ref} :
         from {test.startDate} to : {test.endDate} machine : {test.machine.name}</p>
         <button value={test.id} onClick={fillForm2} >select</button>

      </div>
    </li>
    
  ))}
</ol>
          </div>
          <div className="row">
            <div className="col-25">
              <label >Description</label>
            </div>
            <div className="col-75">
              <textarea value={test.description} onChange={onchange} name="description" placeholder="write something..." />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label >Note:</label>
            </div>
            <div className="col-75">
              <textarea value={test.note} onChange={onchange} name="note" placeholder="write somethig ..."></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label >State:</label>
            </div>
            <div className="col-75">
              <select value={test.state} onChange={onchange} name="state">
                <option value="FINISHED">Finished</option>
                <option value="IN_PROGRESS">In Progrgess</option>
                <option value="PLANNED">Planned</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label >Product: </label>
            </div>
            <div className="col-75">
              <input type="text" value={test.product} onChange={onchange} name="product" />
            </div>
          </div>
          <label>sequantial</label><br />
          <input type="radio" name="sequential" value={true} onChange={onchangeSquencial}></input>
          <label> yes</label><br />
          <input type="radio" name="sequential" value={false} onChange={onchangeSquencial}></input>
          <label>no</label><br />
          <label >sequence :</label>
          <input type="number" value={test.sequence} onChange={onchange} name="sequence" required />

          <div className="row">
            <div className="col-25">

              <label onClick={toggleMachineInfo} className="machineInputLable" >Machine</label>

            </div>
            <div ref={machineInfo} className="machineInput">
              <div className="row">
                <div className="col-25">
                  <label > name : </label>
                </div><br />
                <div className="col-75">
                  <select value={test.machine.name}  onChange={onchangeMachineName} required >
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
                </div>
                <div className="col-25">
                  <label >type:</label>
                </div>
                <div className="col-75">
                  <select value={test.machine.type}  onChange={onchangeMachineType}  >
                    <option value=""> select type</option>
                    <option value="Equipement ACTIA ES">Equipement ACTIA ES</option>
                    <option value="Equipements CETIME">Equipements CETIME</option>
                    <option value="Equipements CRT">Equipements CRT</option>
                    <option value="Equipements CETIBA">Equipements CETIBA</option>
                    <option value="Equipements CERT">Equipements CERT</option>


                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label onClick={toggleSecondMachineInfo} className="machineInputLable" >Second Machine</label>

            </div><br />
            <div ref={secondMachineInfo} className="machineInput">
              <div className="row">

                <div className="col-25">
                  <label > name : </label>
                </div>
                <div className="col-75">
                  <select value={test.secondMachine.name}  onChange={onchangeSecondMachineName}  >
                    <option value="">Select machine</option>
                    <option value="ET 512 (T/H)-Relais">ET 512 (T/H)-Relais</option>
                    <option value="Pot vibrant 1 - ETS 30 kN">Pot vibrant 1 - ETS 30 kN</option>
                    <option value="New Pot vibrant 3 - ETS 40 kN">New Pot vibrant 3 - ETS 40 kN</option>
                    <option value="ET HTV4057 (T/H)-Relais">ET HTV4057 (T/H)-Relais</option>

                  </select>
                </div>
                <div className="col-25">
                  <label >type:</label>
                </div>
                <div className="col-75">
                  <select value={test.secondMachine.type} onChange={onchangeSecondMachineType}  >
                    <option value=""> select type</option>
                    <option value="Equipement ACTIA ES">Equipement ACTIA ES</option>



                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label >Leg:</label>
            </div>
            <div className="col-75">
              <input type="number" value={test.leg} onChange={onchange} name="leg" />
            </div>
          </div>
          <br />
          <br />

          <div className="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>


      <form className="container" onSubmit={delayTest}>
        <h3>Delay Test</h3>
        <div className="row">
          <div className="col-25">
            <label >Start Date:</label>
          </div>
          <div className="col-75">
            <input type="date" value={test.startDate} onChange={onchange} name="startDate" required />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label >End Date:</label>
          </div>
          <div className="col-75">
            <input type="date" value={test.endDate} onChange={onchange} name="endDate" required />
          </div>
        </div><br />

        <div className="row">
          <input type="submit" value="Submit" />
        </div>
      </form>

      <form className="container" onSubmit={manualDelay}>
        <h3>Manual Delay</h3>
        <div className="row">
          <div className="col-25">
            <label >Start Date:</label>
          </div>
          <div className="col-75">
            <input type="date" value={test.startDate} onChange={onchange} name="startDate" required />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label >End Date:</label>
          </div>
          <div className="col-75">
            <input type="date" value={test.endDate} onChange={onchange} name="endDate" required />
          </div>
        </div><br />

        <div className="row">
          <input type="submit" value="Submit" />
        </div>
      </form>


    </>
  )

}
export default UpdateTest