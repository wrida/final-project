import React,{useState} from 'react'
import { Card, Image,Icon } from 'semantic-ui-react'
import Button from 'react-bootstrap/Button';
import { BiUser } from "react-icons/bi";
import Modal from 'react-bootstrap/Modal'
import{ useSelector} from 'react-redux'



const PostCard = ({title,desc,image,owner,_id}) => {
      const [show, setShow] = useState(false);
  //const {userInfo} = useSelector(state=>state.User)
 
    return (
      <div>
      <Card style={{display: 'flex',width:'300px',justifyContent: 'space-between'}}>
      <div style={{display: 'flex',justifyContent: 'space-between',padding:'5px 10ppx'}}>
        <h3>{owner.name} </h3>
        {/*userInfo._id === owner._id && <i class="fas fa-trash" style={{color:'red',cursor:'pointer'}}></i>*/}
      </div>
<Button variant="outline-primary" style={{width:'50px'}} onClick={()=>setShow(true)} ><BiUser /></Button>

     <Card.Header>{title}</Card.Header>
      <Image style={{width:'300px'}} src={image} width={500} height={230} mode='fit'/>
      <Card.Content>
<Card.Description>{desc}</Card.Description>
</Card.Content>
</Card>
<Modal show={show} onHide={()=>{setShow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>{owner.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Email : {owner.email}</Modal.Body>
        {/* <Modal.Body>Address : {owner.email}</Modal.Body>
        <Modal.Body>Phone : {owner.email}</Modal.Body> */}
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{setShow(false)}}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
 </div>
    )
}

export default PostCard
