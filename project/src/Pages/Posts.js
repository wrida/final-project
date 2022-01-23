import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAllPosts,addPost } from './../slices/postSlice';
import { loadUser } from './../slices/userSlice';
import PostCard from './PostCard';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


const Posts = () => {
    const dispatch = useDispatch();
    const {loading,postList,errors} = useSelector(state=>state.posts)
    const {isAuth} = useSelector(state=>state.users)
    useEffect(()=> {
    dispatch(getAllPosts())
    dispatch(loadUser())
    },[]) 
    const [show, setShow] = useState(false);
    const [file, setfile] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const handleSubmit = (e) => {
      setTitle("");
      setDescription("");
      setfile("")
    console.log({ postinfo:{title:title,desc:description}, file})
    dispatch(addPost({ postInfo:{title:title,desc:description}, file})) 
    setShow(false) 
  }
  //console.log(userInfo)
    return (
        <>
        <div style={{display:'flex',flexDirection:'column'}}>
        {isAuth &&  <Button variant="primary" onClick={()=>setShow(true)} style={{width:'150px',marginBottom:'15px'}} >
            Add post
          </Button>}

      <div style={{display:'flex'}}>
        {postList  && postList.map((item)=>{return(<PostCard title={item.title} owner={item.owner} _id={item._id} desc={item.desc} image={item.image} />)})}
        </div> 
        <Modal show={show} onHide={()=>{setShow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Form post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form.Group className="mb-2" >
    <Form.Label>Title</Form.Label>
    <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder="title" style={{outline:'none',padding:'10px',width:'100%',borderColor:'gray',borderWidth:'1px',borderRadius:'10px',height:'35px'}} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Description</Form.Label>
    <input value={description} onChange={(e)=>{setDescription(e.target.value)}} type="text" placeholder="Description" style={{outline:'none',padding:'10px',width:'100%',borderColor:'gray',borderWidth:'1px',borderRadius:'10px',height:'35px'}} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Image</Form.Label>
    <input type="file" name="file" onChange = {(e)=>setfile(e.target.files[0])}/>
      </Form.Group>
 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{handleSubmit() }}>
           Save
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
        </>
    )
}

export default Posts
