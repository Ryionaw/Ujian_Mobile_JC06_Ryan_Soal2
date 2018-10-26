import React, { Component } from 'react';
import {Alert, ScrollView, Image} from 'react-native';
import { Container, Header, Content, Text, Thumbnail, Left, List, ListItem, Body, Item, Icon, Input, Footer, FooterTab, Button, View, Card, CardItem , Right} from 'native-base';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {resto: [],textapi:''};
  }

  cariresto(){
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.textapi}`;
    var config = {
      headers:{'user-key':'71646b9af5b63c7f21aec6750db418b2'}
    };

    axios.get(url, config).then((ambilData)=>{
      this.setState({
        resto: ambilData.data.restaurants,
      })
      console.log(url);
    })
  }

  render(){

    const data = this.state.resto.map((boom,index) => {
      var nama = boom.restaurant.name;
      var kota = boom.restaurant.location.city;
      var Alamat = boom.restaurant.location.address;
      var harga = boom.restaurant.average_cost_for_two;
      var gambar = boom.restaurant.thumb;
      var ignore = 'https://cdn.cwsplatform.com/assets/no-photo-available.png'
      if(gambar == false){
        gambar = ignore;
      }
      return (
        <ListItem avatar key={index}>
          <Content>
            <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri:gambar}} />
                <Body> 
                  <Text> {nama} </Text>
                  <Text note> {kota} </Text>  
                </Body> 
              </Left> 
              <Right>
                <Text>Rp {harga}</Text>
              </Right>
            </CardItem>
            <CardItem>            
              <Body>
                <Image source={{uri:gambar}}style={{height: 200, width: 370, flex: 1}}/>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Icon active name="navigate" />
                <Text>{Alamat}</Text>
              </Left>
            </CardItem>
            </Card>
          </Content>
        </ListItem>
      )
    })

    return(
      <Container>
        <Header searchBar rounded style={{backgroundColor:'red'}}>
          <Item>
            <Icon name="search" />
            <Input placeholder="Cari menu makanan..." onChangeText={(x) => this.setState({textapi: x})}/>
          </Item> 
        </Header>                
            <Button style={{backgroundColor:'red', width:420}} onPress={()=>{this.cariresto()}}><Text>LIHAT DAFTAR RESTO</Text></Button>
        <Content>
          <ScrollView>
            <List>
              {data}
            </List>
          </ScrollView>
        </Content>
      </Container>
    )
  }
}


export default App;