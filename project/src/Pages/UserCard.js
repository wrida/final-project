import React,{useState} from 'react'
import { Card, Image} from 'semantic-ui-react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import{ useSelector,useDispatch} from 'react-redux'



const UserCard = ({name,photo}) => {
    return (
      <div>
      <Card style={{display: 'flex',width:'300px',justifyContent: 'space-between'}}>
        <Card.Header>{name}</Card.Header>
          <Image style={{width:'300px'}} src={photo} />
        </Card>
      </div>
    )
}

export default UserCard
