import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { routerShape } from 'react-router/lib/PropTypes'
import { autobind } from 'core-decorators'
import { isMobile } from 'react-device-detect'

import { hideNavigation } from '../actions/frontend'

@autobind
class MenuItem extends React.Component {

    static propTypes = {
        listPath: React.PropTypes.string,
        addPath: React.PropTypes.string,
        label: React.PropTypes.node,
        icon: React.PropTypes.string,
        isActive: React.PropTypes.bool,
        router: routerShape.isRequired,
        dispatch: React.PropTypes.func.isRequired,
    }

    handleItemClick() {
        if (this.props.listPath) {
            this.props.router.push(this.props.listPath)
            if (isMobile) {
              this.props.dispatch(hideNavigation())
            }
        }
    }

    handleAddClick() {
        if (this.props.addPath) {
            this.props.router.push(this.props.addPath)
            if (isMobile) {
              this.props.dispatch(hideNavigation())
            }
        }
    }

    render() {
        const { label, icon, listPath, addPath, isActive } = this.props
        return (
            <li>
                { listPath &&
                    <a
                        className={isActive && 'active'}
                        onClick={this.handleItemClick}
                        >
                        {icon &&
                            <i className={`mdi mdi-${icon}`} />
                        }
                        {label}
                    </a>
                }
                { addPath &&
                    <button
                        className="action-add icon-only"
                        aria-disabled="false"
                        onClick={this.handleAddClick}
                        >&zwnj;
                    </button>
                }
            </li>
        )
    }
}

export default connect()(withRouter(MenuItem))
