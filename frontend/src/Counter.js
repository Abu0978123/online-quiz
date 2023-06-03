import React, { Component } from 'react'

export default class Counter extends Component {
    constructor(props){
        super(props)
        
        this.state={
            count:100
        }
        this.plus=this.plus.bind(this)
        this.minus=this.minus.bind(this)
        this.reset=this.reset.bind(this)
    }
    plus(){
        this.setState((prev)=>{
            return {count:prev.count + 1}
        })
    }
    minus(){
        this.setState((prev)=>{
            return {count:prev.count - 1}
        })
    }
    reset(){
      return  this.setState(()=>{
          return {count:0}
      })
    }
    render() {
        return (
            <div>
                <h1>Count:{this.state.count}</h1>
                <button onClick={this.plus}>plus</button>
                <button onClick={this.minus}>minus</button>
                <button onClick={this.reset}>reset</button>
            </div>
        )
    }
}
