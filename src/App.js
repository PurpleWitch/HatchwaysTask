import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props){
      super(props);
      this.state={original:[],res:[]}
    }

    componentDidMount(){
      fetch(`https://api.hatchways.io/assessment/students`)
        .then(res => res.json())
        .then(res => this.setState({original:res.students,res:res.students}))
        .catch(err => console.error(err))
    }
    
    search=(e)=>{
      let query = e.target.value.toUpperCase()
      let res = this.state.original.filter((item)=>(item.firstName.toUpperCase()+' '+item.lastName.toUpperCase()).includes(query))
      this.setState({res})
    }

    find=(e)=>{
      if(!e.target.value){this.setState({res:this.state.original});return}
      let query = e.target.value.toUpperCase()
      let res = this.state.original.filter((item)=>item.tag?.toUpperCase().includes(query))
      this.setState({res})
    }

    toggle=(e)=>{
      this.setState({[e.target.attributes[0].value]:!this.state[e.target.attributes[0].value]})
    }

    set=(e)=>{
      let res = this.state.original
      res[e.target.attributes[1].value].tag=e.target.value
      this.setState({original:res})
    }

    render() {
        return (
          <div className='container col'>
            <input type='serach' className='search' placeholder='Search by name' onChange={this.search}/>
            <hr style={{'width':'60vw'}}/>
            <input type='serach' className='search' placeholder='Search by tag' onChange={this.find}/>
            {this.state.res.map((item,i)=>
            <div className='card row' key={i} style={{'height':this.state[i]?'60vh':'33vh'}}>
              <img className='profile' src={item.pic} alt='profile'/>
              <div className='details col'>
                  <div className='name'>{item.firstName.toUpperCase()} {item.lastName.toUpperCase()}</div>
                  <div className='information'>Email: {item.email}</div>
                  <div className='information'>Company: {item.company}</div>
                  <div className='information'>Skill : {item.skill}</div>
                  <div className='information'>Average : {item.grades.reduce((acc,item,i)=>acc+=Number(item),0)/item.grades.length}%</div>
                  <div className='information' style={{'display':this.state[i]?'inline':'none'}}>
                      {item.grades.map((item,i)=><div key={i}>Test{i+1}: {item}%</div>)}
                  </div>
                  <div className='information'>Tag : {item.tag}</div>
                  <input type='text' tog={i} className='tag' placeholder='Set tag' onChange={this.set}/>
              </div>
              <button tog={i} className='expand' onClick={this.toggle}>{this.state[i]?'-':'+'}</button>
            </div>
            )}
          </div>
        )
    }
}

export default App;
