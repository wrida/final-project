import React,{useState} from 'react'
import { Card, Image} from 'semantic-ui-react'
import Button from 'react-bootstrap/Button';
import { BiUser } from "react-icons/bi";
import Modal from 'react-bootstrap/Modal'
import{ useSelector,useDispatch} from 'react-redux'
import { uploadPicture } from '../slices/userSlice';
import { deletePost, likePost,updatePost,commentPost } from './../slices/postSlice';



const PostCard = ({like,title,desc,image,owner,_id,comments,update}) => {
const [show, setShow] = useState(false);
const [titlePost, setTitlePost] = useState(title);
const [descriptionPost, setDescriptionPost] = useState(desc);
const [imagePost, setImagePost] = useState(image);
const [imagePostFile, setImagePostFile] = useState(image);
const [showModalUpdate, setShowModalUpdate] = useState(false);
const [comment, setComment] = useState("");

const {userInfo} = useSelector(state=>state.users)
const dispatch = useDispatch()

const onChangeImage=(e)=>{
  var file = e.target.files[0];
  setImagePostFile(e.target.files[0])
  var reader = new FileReader();
  var url = reader.readAsDataURL(file);
   reader.onloadend = function (e) {
     setImagePost([reader.result])
    }.bind(this);
}
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    dispatch(commentPost({id:_id,comment:comment}))
    setComment('')
  }
}

    return (
      <div style={{width:'300px'}}>
      <Card style={{ width: "100%",border:'solid 1px #B5B6B7',backgroundColor:'#EEE' }}>
    

     <Card.Header>{title}</Card.Header>
      <Image style={{width:'300px',paddingRight:'20%',paddingLeft:'20%'}} src={image} width={300} height={300} mode='fit'/>
      <Card.Content>
        <Card.Description>{desc}</Card.Description>
        <i onClick={()=>setShowModalUpdate(true)} style={{paddingLeft:'260px',fontSize:'30px',marginBottom:'0'}} class="fas fa-edit"></i>
        </Card.Content>
        <i style={{marginBottom:'20px',cursor:'pointer',fontSize:'30px',
        color:`${like ? 'teal':'gray'}`
        
        }} 
        onClick = {() => dispatch(likePost(_id))}
        class="fas fa-thumbs-up"></i>
          <i style={{color:'red', marginBottom:'20px',cursor:'pointer',fontSize:'20px',
        
      }} 
      onClick = {() => dispatch(deletePost(_id))}
      class="fas fa-trash"></i>
        <div style={{display: 'flex',justifyContent:'left',padding:'5px 10px'}}>
        <h3>{owner.name} </h3>
       
      </div>
<Button variant="outline-primary" style={{width:'50px',PaddingLeft:'90%'}} onClick={()=>setShow(true)} ><BiUser /></Button>
        <input type="text" placeholder="comments" 
    style={{outline:'none',padding:'10px',width:'100%',borderColor:'gray',borderWidth:'1px',borderRadius:'25px'
    ,height:'35px'}} 
    onKeyDown={handleKeyDown}
    onChange={(e)=>setComment(e.target.value)}
    value={comment}
    />
     {comments.map(item=><h5>{item.desc}</h5>) }
        {/*likes.length*/}
        </Card>
        
           <Modal show={show} onHide={()=>{setShow(false)}}>
     <Modal.Header closeButton>
          <Modal.Title>Name : {owner.name}</Modal.Title>
     </Modal.Header>
        <Modal.Body>Email : {owner.email}</Modal.Body>
        <Modal.Body>Name : {owner.name}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{setShow(false)}}>
            Add post
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalUpdate} onHide={()=>{setShowModalUpdate(false)}}>
     <Modal.Header closeButton>
          <Modal.Title>Update poste {_id} </Modal.Title>
     </Modal.Header>
        <Modal.Body>
          <Image style={{width:'300px'}} src={imagePost} width={500} height={230} mode='fit'/>
          <input type="file" name="file" onChange = {(e)=>onChangeImage(e)}/>
          <input  type="text" placeholder="title" value={titlePost} onChange={(e)=>setTitlePost(e.target.value)}
    style={{marginBottom:'10px', outline:'none',padding:'10px',width:'100%',borderColor:'gray',borderWidth:'1px',borderRadius:'25px'
    ,height:'35px'}} />
     <input type="text" placeholder="description" value={descriptionPost} onChange={(e)=>setDescriptionPost(e.target.value)}
    style={{outline:'none',padding:'10px',width:'100%',borderColor:'gray',borderWidth:'1px',borderRadius:'25px'
    ,height:'35px'}} />
          </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{ dispatch(updatePost({id:_id,title:titlePost,desc:descriptionPost,file:imagePostFile})); setShowModalUpdate(false) }}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
 </div>
    )
}

export default PostCard
