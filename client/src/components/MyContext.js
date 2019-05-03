import React, { Component } from 'react'

const MyContext = React.createContext()

export class Provider extends Component {
  render () {
    return (
      <MyContext.Provider
        value={{
          name: "Josh"
        }}
        >
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export const Consumer = MyContext.Consumer
