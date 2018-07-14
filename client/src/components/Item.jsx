import React from 'react'
import { Item } from 'semantic-ui-react'

const description = [
  'Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their',
  'tiny stature, and even others for their massive size.',
].join(' ')

const ItemExampleDescriptions = () => (
  <Item.Group>
    <Item>
      <Item.Image size='small' src='https://vetstreet.brightspotcdn.com/dims4/default/5b3ffe7/2147483647/thumbnail/180x180/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F8e%2F4e3910c36111e0bfca0050568d6ceb%2Ffile%2Fhub-dogs-puppy.jpg' />

      <Item.Content>
        <Item.Header as='a'>Director</Item.Header>
        <Item.Description>
          <p>{description}</p>
          <p>Many people also have their own barometers for what makes a cute dog.</p>
        </Item.Description>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image size='small' src='https://vetstreet.brightspotcdn.com/dims4/default/5b3ffe7/2147483647/thumbnail/180x180/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F8e%2F4e3910c36111e0bfca0050568d6ceb%2Ffile%2Fhub-dogs-puppy.jpg' />

      <Item.Content>
        <Item.Header as='a'>Actor</Item.Header>
        <Item.Description content={description} />
      </Item.Content>
    </Item>

    <Item>
      <Item.Image size='small' src='https://vetstreet.brightspotcdn.com/dims4/default/5b3ffe7/2147483647/thumbnail/180x180/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F8e%2F4e3910c36111e0bfca0050568d6ceb%2Ffile%2Fhub-dogs-puppy.jpg' />
      <Item.Content header='Music Director' description={description} />
    </Item>
  </Item.Group>
)

export default ItemExampleDescriptions