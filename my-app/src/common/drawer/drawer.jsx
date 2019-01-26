import React, { Component, Fragment } from 'react';
import { Card,Col,Row,Icon,Drawer, List, Avatar, Divider } from 'antd';


const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
  };

const DescriptionItem = ({ title, content }) => (
    <div
      style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 7,
        color: 'rgba(0,0,0,0.65)',
      }}
    >
      <p
        style={{
          marginRight: 8,
          display: 'inline-block',
          color: 'rgba(0,0,0,0.85)',
        }}
      >
        {title}:
      </p>
      {content}
    </div>
 );

class CustomDrawer extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                    >
                    <p style={{ ...pStyle, marginBottom: 24 }}>{this.props.festivalName}</p>
                    <p style={pStyle}>Description</p>
                    <Row>
                        <Col span={24}>
                        <DescriptionItem
                            title="Short Story"
                            content={this.props.description}/>
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>Line-up</p>
                    <Row>
                        <Col span={24}>
                        <DescriptionItem
                            title="Mainstage"
                            content={this.props.lineup}
                        />
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>Contacts</p>
                    <Row>
                        <Col span={24}>
                        <DescriptionItem
                            title="Facebook"
                            content={(
                            <a href={this.props.facebookLink}>
                               {this.props.facebookLink}
                            </a>
                            )}
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <DescriptionItem
                            title="Instagram"
                            content={(
                            <a href={this.props.instagramLink}>
                               {this.props.instagramLink}
                            </a>
                            )}
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <DescriptionItem
                            title="Official Aftermovie"
                            content={(
                            <a href={this.props.youtubeLink}>
                                {this.props.youtubeLink}
                            </a>
                            )}
                        />
                        </Col>
                    </Row>
                    </Drawer>
        )
    }
}

export default CustomDrawer;