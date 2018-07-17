import React, { Component } from 'react';
import { Button, Form, FormGroup, Jumbotron, Label, Input, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import 'whatwg-fetch';
import "./App.css"

const URL_all = "https://api.unsplash.com/search/photos?page=1&client_id=0a9be1f61d3a407b6054d013818fcf5df3b043c97a99a37be5f7207d3c1c1ac3&query=";
const download_url = "https://unsplash.com/photos/"

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      imgs: []
    }
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <Form>
            <Label for="search">Search for any image you want:</Label>
            <Input type="text" name="search" id="query" onChange={(queryVal) => {
              this.setState({
                query: queryVal.target.value
              })
            }} />
          </Form>
          <Button onClick={() => {
            this.reFetch(this.state.query)
          }}>Search</Button>
          <ImageDiv imgs={this.state.imgs} />
        </Jumbotron>
        <footer><p>
          Information derived from <a href="https://unsplash.com">https://unsplash.com</a></p>
        </footer>
      </div>
    );
  }

  reFetch(qNew) {
    if (qNew !== "") {
      let queryNew = qNew.replace(' ', "%20");
      let url = URL_all + queryNew;
      console.log(url);
      fetch(url).then((el) => el.json()).then((el2) => {
        console.log(el2);
        this.setState({
          query: queryNew,
          imgs: el2.results
        })
        console.log(this.state.imgs);
      })
    }
  }
}

class ImageDiv extends Component {
  render() {
    console.log("this.props.imgs");
    console.log(this.props.imgs);
    let allImgs = this.props.imgs.map((element, key) => {
      console.log(element)
      return (
        <SingleImage key={key} i={key} photoId={element.id} data={element}/>
      )
    })
    return (
      <div className="big imageWrapper">
        {allImgs}
      </div>
    )
  }
}

class SingleImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  handleClick() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    var data = this.props.data;
    var user = data.user;
    
    return (
      <div>
        
        <img id={'Popover-' + this.props.i} onClick={() => this.handleClick()} src={download_url + this.props.photoId + "/download"}/>
        <Popover placement="bottom-start" isOpen={this.state.open} target={'Popover-' + this.props.i} toggle={() => this.handleClick() }>
          <PopoverBody>
            Photo by <a target="_blank" href={"http://www.instagram.com/" + user.instagram_username}>@{user.instagram_username}</a>
            <br/>
            Tags:
            {data.tags.map((tag, i) => {
              return (
                <div key={i}>#{tag.title}</div>
              )
            })}
          </PopoverBody>
        </Popover>
        
      </div>
      
    )
  }
}



export default App;