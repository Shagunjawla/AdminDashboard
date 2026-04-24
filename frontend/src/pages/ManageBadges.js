import React, { useEffect, useState } from "react";
const API = "http://localhost:5000/api/badges";

function ManageBadges() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: "", badge: "" });
  const [editId, setEditId] = useState(null);

  const fetchData = () => { fetch(API).then(res=>res.json()).then(setData); };
  useEffect(()=>{ fetchData(); },[]);

  const handleSubmit = () => {
    if(!form.id || !form.badge) return alert("Fill all fields");

    if(editId){
      fetch(`${API}/${editId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)})
      .then(()=>{setEditId(null);setForm({id:"",badge:""});fetchData();});
    } else {
      fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)})
      .then(()=>{setForm({id:"",badge:""});fetchData();});
    }
  };

  const handleDelete = id => fetch(`${API}/${id}`,{method:"DELETE"}).then(fetchData);
  const handleEdit = item => { setForm(item); setEditId(item.id); };

  return (
    <div style={styles.container}>
      <h1>Badge Categories</h1>

      <input placeholder="ID" value={form.id} onChange={e=>setForm({...form,id:e.target.value})}/>
      <input placeholder="Badge" value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})}/>
      <button onClick={handleSubmit}>{editId?"Update":"Add"}</button>

      <table style={styles.table}>
        <thead><tr><th>ID</th><th>Badge</th><th>Action</th></tr></thead>
        <tbody>
          {data.map((d,i)=>(
            <tr key={i}>
              <td>{d.id}</td><td>{d.badge}</td>
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
export default ManageBadges;