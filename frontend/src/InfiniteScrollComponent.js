import React, { Component } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import {v4 as uuidv4} from 'uuid';

class InfiniteScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
      pins: [],
      loading: false,
      page: 1,
      prevY: 0
    };
  }

  componentDidMount() {
    this.getPins(this.state.page);
    this.observer = new IntersectionObserver(this.handleObserver.bind(this));
    this.observer.observe(this.loadingRef);
  }

  getPins(page) {
    this.setState({ loading: true });
    axios
      .get('http://localhost:3000/pins?page='+page)
      .then(res => {
        this.setState({ pins: [...this.state.pins, ...res.data] });
        this.setState({ loading: false });
        
        if (res.data.length > 0) {
          this.setState({ page: this.state.page + 1 });
        } else {
          this.setState({ page: 1 });
          this.getPins(1);
        }
      });
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.getPins(this.state.page);
    }
    this.setState({ prevY: y });
  }

  render() {
    return (
        <Container className="my-4">
            <Row>
            {this.state.pins.map(pin => (
                <Col key={uuidv4() + pin.id} xs={6} md={4} className="my-4">
                    <Image src={pin.image_url} height="308px" width="236px" rounded />
                </Col>
            ))}
            </Row>
            <div ref={loadingRef => (this.loadingRef = loadingRef)}>
                <span>Loading...</span>
            </div>
        </Container>
    );
  }
}

export default InfiniteScrollComponent;