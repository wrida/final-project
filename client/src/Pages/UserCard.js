import React from 'react'
import { Card, Image} from 'semantic-ui-react'



const UserCard = ({name,photo}) => {
    return (
      <div>
      <Card style={{display: 'flex',width:'300px',justifyContent: 'space-between'}}>
        <Card.Header 
        style={{color:'blue',fontSize:'35px',fontFamily:'Helvetica',fontStyle:'oblique',paddingLeft:'35%'}}>{name}
        </Card.Header>
          <Image style={{width:'250px',paddingLeft:'15%',paddingBottom:'15%'}} src={photo} />
        </Card>
      </div>
    )
}

export default UserCard
