import React from 'react';
import { Container, Divider, Grid, Header, Image } from 'semantic-ui-react';
import Item from './Item.jsx';
import { Card, Icon } from 'semantic-ui-react';
import WatchList from './WatchList.jsx';

const InlineStyle = () => (
  <style>{`
    .grid {
      position: relative;
    }
    .grid:before {
      background-color: #F0F0F0;
      box-shadow: 0px 0px 0px 1px #DDDDDD inset;
      content: '';
      height: calc(100% - 1rem);
      left: 1rem;
      top: 1rem;
      position: absolute;
      width: 100%;
     }
    .ui.divided.grid:before, .celled.grid:before {
      display: none;
    }
    .ui.aligned .column:after {
      display: none !important;
    }
    .grid .column:not(.row):not(.grid):after {
      background-color: rgba(86, 61, 124, .15);
      box-shadow: 0px 0px 0px 1px rgba(86, 61, 124, 0.2) inset;
      content: '';
      display: block;
      min-height: 1000px;
    }
    @media only screen and (max-width: 768px) {
      .stackable.grid:before {
        width: 100%;
        left: 0em;
      }
    }
  `}</style>
)

const GridLayout = () => (
  <div>
    <InlineStyle />

    <Container>
      <Grid verticalAlign='middle' columns={3} centered>
        <Grid.Row>
          <Grid.Column>
              <Card header='Favorites'/>
            {/*USE A COMPONENT LIKE ITEM HERE WITH IMAGES INSTEAD OF PLAIN LIST*/}
              <WatchList/>
          </Grid.Column>
           <Grid.Column>
              <Card header='Watch List'/>
              <WatchList/>
          </Grid.Column>
           <Grid.Column>
              <Card header='Recently Watched'/>
              <WatchList/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </div>
)

export default GridLayout