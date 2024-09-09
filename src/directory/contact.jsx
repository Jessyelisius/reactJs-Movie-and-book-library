// import logo from './logo.svg';
import '../App.css';
import React, { useState } from 'react';

function Contact() {

  const [formData, setformData] = useState({
    name: "",
    address: "",
    telephone:"",
    isEdit:false,
  });

  const [list, setList] = useState([]);

  const handleChange = (event) => {
    let {name, value} = event.target

    setformData({
      ...formData,
      [name]:value
    })
  };

  const handleSave= () => {

    let item = {
      name:formData.name,
      address:formData.address,
      telephone:formData.telephone,
      id:Number(list.length) +1
    }

    setList(list.concat(item))

    setformData({
      name:"",
      address:"",
      telephone:"",
      isEdit:false
    })

  }

  const handleUpdate = () => {
    const nlist = list.filter((ls)=>ls.id!==formData.id);
    setList(nlist.concat(formData))
    setformData({
      name:"",
      address:"",
      telephone:"",
      isEdit:false
    })

  }

  const handleDelete = (id) => {
    const nlist = list.filter((ls)=>ls.id!==id)
    setList(nlist);
  };

  const handleEdit = (ls) => {
    setformData({
      ...ls,

      isEdit:true
    })
  }

  return (
    // <p>Welcome to react</p>
    <div className='container'>
      <div className='card mt-3'>
        <div className='card-body'> 

            <h5>Add new Contact </h5>

            <div className=' border border-secondary border-2 p-3'>

              <form>

              <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                        <label className='mb-2 fw-bold'>Contact Name</label>
                        <input type='text' 
                        name='name' 
                        value={formData.name} 
                        className='form-control' 
                        onChange={handleChange}/>
                    </div>
                  </div>
                </div>


                <div className='row mt-2'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                        <label className='mb-2 fw-bold'>Station Address</label>
                        <input type='text' 
                        name='address' 
                        value={formData.address} 
                        className='form-control'
                        onChange={handleChange}/>
                    </div>
                  </div>
                </div>

                <div className='row mt-2'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                        <label className='mb-2 fw-bold'>Telephone Number</label>
                        <input type='text' 
                        name='telephone' 
                        value={formData.telephone} 
                        className='form-control'
                        onChange={handleChange}/>
                    </div>
                  </div>
                </div>
                <hr/>

                <button type='button' className={formData.isEdit?'btn btn-success':'btn btn-primary'}
                  onClick={formData.isEdit?handleUpdate:handleSave}>
                  {formData.isEdit?"Update COntact":"Save Contact"}
                </button>
              </form>

            </div>

            <div className='border border-2  mt-5 p-3'>
                <h5>Contact List</h5>

                {list.map((ls, index) => (
                <div className='text-wrapper' key={index}>
                  <div>
                    <h5>{ls.name}</h5>
                  <p>{ls.address}<span className='text-danger fw-bold'>{ls.telephone}</span></p>
                  </div>

                  <div className='btn-group'>
                    <button type='button' className='btn btn-warning' onClick={()=> handleEdit(ls)}>Edit</button>

                    &nbsp;
                    <button type='button' className='btn btn-danger' onClick={() => handleDelete(ls.id)}>Remove</button>

                  </div>
                </div>
                ))}

            </div>
        </div>
      </div>
    </div>

  )
}

export default Contact;
