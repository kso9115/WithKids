import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: #d7ffcc;
  border-radius: 10px;
`

const Form = styled.form``
const FormCheck = styled.div``
const Input = styled.input``
const FormGroup = styled.div``
const Btn = styled.button`
  width: 50px;
  height: 20px;
  font-size: 10px;
  border-radius: 10px;
  margin-top: 5px;
  margin-left: 3px;
  background-color: #fff;
  color: #333;
  :hover {
    background-color: #333;
    color: #fff;
    cursor: pointer;
  }
`

export default class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            satisfaction: false,
            average: false,
            unsatisfactory: false,
            trigger: false,
        }
        this.triggetNext = this.triggetNext.bind(this)
    }
    onChange = (checkedState) => (event) => {
        this.setState((initialState) => ({
            [checkedState]: !this.state[checkedState],
        }))
    }
    onSubmit = async (e) => {
        e.preventDefault()
        let checkArray = []
        for (var key in this.state) {
            if (this.state[key] === true) {
                checkArray.push(key)
            }
        }
        let checkData = {
            checkbox: checkArray.toString(),
        }

        console.log(checkData)
        this.triggetNext()
    }
    triggetNext() {
        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep()
        })
    }
    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <FormCheck>
                        <Input type="checkbox" onChange={this.onChange("satisfaction")} />
                        만족
                    </FormCheck>

                    <FormCheck>
                        <Input type="checkbox" onChange={this.onChange("average")} />
                        보통
                    </FormCheck>

                    <FormCheck>
                        <Input type="checkbox" onChange={this.onChange("unsatisfactory")} />
                        불만족
                    </FormCheck>

                    <FormGroup>
                        <Btn>Submit</Btn>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}