import React, { useEffect, useState } from "react";
const API = "http://localhost:5000/api/points";

function ManagePoints() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: "", points: "" });
  const [editId, setEditId] = useState(null);

  const fetchData = () => { fetch(API).then(res=>res.json()).then(setData); };
  useEffect(()=>{ fetchData(); },[]);

  const handleSubmit = () => {
    if(!form.id || !form.points) return alert("Fill all fields");

    if(editId){
      fetch(`${API}/${editId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)})
      .then(()=>{setEditId(null);setForm({id:"",points:""});fetchData();});
    } else {
      fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)})
      .then(()=>{setForm({id:"",points:""});fetchData();});
    }
  };

  const handleDelete = id => fetch(`${API}/${id}`,{method:"DELETE"}).then(fetchData);
  const handleEdit = item => { setForm(item); setEditId(item.id); };

  return (
    <div style={styles.container}>
      <h1>Points System</h1>

      <input placeholder="ID" value={form.id} onChange={e=>setForm({...form,id:e.target.value})}/>
      <input placeholder="Points" value={form.points} onChange={e=>setForm({...form,points:e.target.value})}/>
      <button onClick={handleSubmit}>{editId?"Update":"Add"}</button>

      <table style={styles.table}>
        <thead><tr><th>ID</th><th>Points</th><th>Action</th></tr></thead>
        <tbody>
          {data.map((d,i)=>(
            <tr key={i}>
              <td>{d.id}</td><td>{d.points}</td>
              <td>
                <button onClick={()=>handleEdit(d)}>Edit</button>
                <button onClick={()=>handleDelete(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = { container:{padding:"20px",background:"#000",color:"gold"}, table:{width:"100%",marginTop:"20px"} };
export default ManagePoints;