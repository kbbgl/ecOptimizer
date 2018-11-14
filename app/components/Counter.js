// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';
import Modal from "react-modal";
import SearchBox from 'react-search-box'

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    textAlign             : 'center'

  }
};

Modal.setAppElement(document.getElementById('root'));

export default class Counter extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      elasticubes: [],
      chosenElastiCube: undefined,
      isModalOpen: false,
      duplicateDashboards: false,
      buildAfterOptimization: false
    }

    this.openModal = this.openModal.bind(this);
    this.afterModalOpen = this.afterModalOpen.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }
  
  openModal = (event) => {

    var chosenElastiCube = event.target.innerHTML;
    this.setState({
      isModalOpen: true,
      chosenElastiCube
    })
  }

  afterModalOpen = () => {
    this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      chosenElastiCube: undefined
    })
  }

  componentDidMount(){

    this.setState({
      loading: true
    })

    fetch('http://localhost:3001/elasticubes')
    .then(res => res.json())
    .then(elasticubes => this.setState({
      loading: false,
      elasticubes
    }));
  }

  componentDidUpdate(){
   
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:');
    console.log('duplicateDashboards: ' + this.state.duplicateDashboards);
    console.log('buildAfterOptimization: ' + this.state.buildAfterOptimization);

    this.closeModal();
  }

  handleInputChange = (event) => {
    const target = event.target;
    const checked = target.checked;
    const name = target.name;
  
    if(name == "build"){
      this.setState({
        buildAfterOptimization: checked
      })
    }
    else{
      this.setState({
        duplicateDashboards: checked
      })
    }
  }

  // handleChange = (chosenElastiCube) => {
  //   this.setState({
  //     chosenElastiCube
  //   })
  // }

  // <SearchBox 
  //         data={this.state.elasticubes} 
  //         onChange={this.handleChange} 
  //         placeholder='Search for an ElastiCube...' 
  //         searchKey={this.state.elasticubes.oid} 
  //         loading={this.state.loading} 
  //         width={300} 
  //         height={40} />

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
              itemID={elasticube.title}
              key={index}
              style={{listStyle: 'square'}}
              onClick={this.openModal}
              >{elasticube.title}
            </li>
          )}
        </ul>
        <Modal
        isOpen={this.state.isModalOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={modalStyle}
        contentLabel="Select options"
      >
        <h4 style={{color: '#000'}}>{`Let's optimize ElastiCube '${this.state.chosenElastiCube}'`}</h4>
        <div>
          <form onSubmit={this.handleSubmit}>
              <label style={{color: '#000'}}>
                Duplicate dependent dashboards?
                <input
                  name="dashboard" 
                  type="checkbox" 
                  checked={this.state.duplicateDashboards}
                  onChange={this.handleInputChange}/>
              </label>
              <label style={{color: '#000'}}>
                Build after optimization?
                <input 
                  name="build"
                  type="checkbox" 
                  checked={this.state.buildAfterOptimization}
                  onChange={this.handleInputChange}/>
              </label>
              <input type="submit" value="Submit"/>
            </form>
        </div>
      </Modal>
      </div>
    );
  }
}
