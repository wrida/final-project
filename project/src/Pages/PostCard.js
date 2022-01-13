import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const PostCard = () => {
    return (
        <div>
             <Card>
    <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuoTiqH28yAfK9lWsybUSjqL7pfrmPEc5PulkJmCEqZc9HElri' width={500} height={230} mode='fit'/>
    <Card.Content>
      <Card.Header>Title</Card.Header>
      <Card.Meta>
        <span className='date'>A collection of all ReactJS Elements</span>
      </Card.Meta>
      <Card.Description>Please Select the Component from the Menu to see the demo.</Card.Description>
    </Card.Content>
   
  </Card>
)
        </div>
    )
}

export default PostCard
