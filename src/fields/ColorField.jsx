import React from 'react'
import { SketchPicker } from 'react-color'

import FieldButtonGroup from './base/FieldButtonGroup'
import baseField from './base/baseField'
import { baseFieldPropTypes } from '../PropTypes'


class ColorField extends React.Component {

    static propTypes = {
        ...baseFieldPropTypes,
    };

    static defaultProps = {
    };

    constructor(props) {
      super(props)
      this.state = {
        colorPicker: false,
        color: this.props.input.value || '#33b6c2',
      }
    }

    handleChangeComplete(color) {
        this.props.input.onChange(color.hex)
        this.setState({
          color: color.hex,
        })
    }

    togglePicker() {
      this.setState({
        colorPicker: !this.state.colorPicker,
      })
    }

    closePicker() {
      this.setState({
        colorPicker: false,
      })
    }

    render() {
        const { id, placeholder, input, disabled, readOnly } = this.props
        const applyReadOnly = !disabled && readOnly
        const popoverStyle = {
          position: 'absolute',
          zIndex: 1000,
          left: 0,
          top: 45,
        }
        const coverStyle = {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        }
        return (
            <FieldButtonGroup id={`color-${id}`} layout="field-button-inner field-size-x-small" {...this.props}>
                <div className="field">
                    <input
                        type="text"
                        placeholder={placeholder}
                        id={id}
                        autoComplete="off"
                        {...input}
                        data-field-display-name={id}
                        data-field-display-values={input.value}
                        readOnly={applyReadOnly}
                        disabled={disabled}
                        />
                </div>
                <ul role="group" className="buttons">
                    <li><button
                        type="button"
                        className="icon-only"
                        aria-label="Change color"
                        aria-disabled={disabled}
                        disabled={disabled}
                        onClick={() => this.togglePicker()}
                        style={{ backgroundColor: input.value }}
                        >&zwnj;</button></li>
                </ul>
                { this.state.colorPicker &&
                    <div style={popoverStyle}>
                        <div style={coverStyle} onClick={() => this.closePicker()} />
                        <SketchPicker
                            disableAlpha
                            color={this.state.color}
                            onChangeComplete={color => this.handleChangeComplete(color)}
                            />
                    </div>
                }
            </FieldButtonGroup>
        )
    }
}

export default baseField(ColorField)
