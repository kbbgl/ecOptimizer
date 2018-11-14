// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';

export default class Counter extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      elasticubes: []
    }
  }
  // state = {elasticubes: []}

  componentDidMount(){
    fetch('http://localhost:3001/elasticubes')
    .then(res => res.json())
    .then(elasticubes => this.setState({elasticubes}));
  }

  render() {
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>

        <h1>ElastiCubes:</h1>
        <ul>
          {this.state.elasticubes.map((elasticube, index) =>
            <li 
              key={index}
              style={{listStyle: 'square'}}
              >{elasticube.title}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
