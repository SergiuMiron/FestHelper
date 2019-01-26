import React, { Component, Fragment } from 'react';
import { Card,Col,Row,Icon,Drawer, List, Avatar, Divider } from 'antd';
import CustomDrawer from '../../common/drawer/drawer';
import './Home.scss';

const { Meta } = Card;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible: false,
            festivalName: "",
            description: "",
            lineup: "",
            facebookLink: "",
            instagramLink: "",
            youtubeLink: "",
         }
    }

    showUntoldDrawer = () => {
        this.setState({
          festivalName: "Untold",
          description: "Untold Festival is the largest annual electronic music festival held in Romania, taking place in Cluj-Napoca at Central Park, with the main stage at Cluj Arena. Untold has been designated Best Major Festival within European Festival Awards 2015. Guests include a vast range of European countries, as well as Asia and North America.",
          lineup: "The Chainsmokers, Afrojack, Diplo, The Asteroids Galaxy Tour, Oliver Heldens, Will Sparks, Nina Kraviz, Pan-pot, Borgore, Pendulum (DJ Set),   Jason Derulo, Kygo, Tiesto, Don Diablo, KSHMR, Tujamo, Solomun, Modestep, Noisia (DJ Set) , The Prodigy, Dimitri Vegas & Like Mike, Steve Aoki, Alesso, Danny Avila, Loco Dice, Seth Troxler, Andy C, Flux Pavilion, The Glitch Mob (DJ Set),Black Eyed Peas, Armin van Buuren, Fedde Le Grand, Jamie Jones, Paul Kalkbrenner, Dub FX, Wilkinson (DJ Set)",
          facebookLink: "https://www.facebook.com/UNTOLDFestival/",
          instagramLink: "https://www.instagram.com/untoldfestival/?hl=ro",
          youtubeLink: "https://www.youtube.com/watch?v=o1u2sT8ah58",
          visible: true,
        });
    };

    showElectricCastleDrawer = () => {
        this.setState({
            festivalName: "Electric Castle",
            description: "Electric Castle is a unique festival experience that takes place on the amazing domain of Banffy Castle, near Cluj-Napoca, in Transylvania - Romania. It shakes up the way people interact with a festival by combing an eclectic musical lineup with arts, technology and a visually innovative concept. Guests will be entertained from day to night and back again with one of Europe’s few truly 24-hour festivals.",
            lineup: "Damian Marley, Jessie J, Mura Masa, Richie Hawtin, Groove Armada, San Holo, Wolf Alice, Subcarpați, Little Big, Kensigton, Alison Wonderland, Little Boots",
            facebookLink: "https://www.facebook.com/ElectricCastle/",
            instagramLink: "https://www.instagram.com/electriccastle/?hl=ro",
            youtubeLink: "https://www.instagram.com/electriccastle/?hl=ro",
            visible: true,
          });
    }

    showNeverseaDrawer = () => {
        this.setState({
            festivalName: "Neversea",
            description: "Neversea is a 3 days and 3 nights-long international celebration of music, lifestyle and seaside adventures, the biggest summer festival ever to be held on the Romanian seashore.",
            lineup: "Armin Van Buuren, Jamie Jones, Yellow Claw, W&W, Hardwell, Steve Aoki, Sebastian Ingrosso, Axwell, Nina Kraviz, Âme, Claptone, Eats Everything, Sunnery James & Ryan Marciano, Galantis, Steve Angello, Alan Walker, Pendulum, NGHTMRE, GTA, Black Coffee, Noisia, Tujamo, Chase And Status, JONAS BLUE, Raresh, Jan Blomqvist, Nightmares On Wax, Satori, Camo & Krooked, Modestep, Blond:ish, YokoO, Dub Fx, Rusko, Kungs, Christian Löffler, Mumdance, Rampue, Acid Pauli, Dope D.O.D, Priku, Stavroz, Praslea, Premiesku, DJ Cartier, Redfoo, Dan Andrei, Scooter, Cezar, Subcarpati, Kozo, BeGun, Vincentiulian, Silent Strike, Viken Arman, Kerala Dust",
            facebookLink: "https://www.facebook.com/NeverseaFestival/",
            instagramLink: "https://www.instagram.com/neverseafestival/?hl=ro",
            youtubeLink: "https://www.youtube.com/watch?v=pPAEp_8D8zM",
            visible: true,
          });
    }

    onClose = () => {
    this.setState({
        visible: false,
    });
    };

    render() { 
        return ( 
           <Fragment>
                <div style={{padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <div onClick={() => this.showUntoldDrawer()}>
                                <Card hoverable  style={{ width: 300, height:300 }}  cover={<img alt="example" src="/assets/untold.png" />}
                                    actions={[ <a href="https://www.facebook.com/UNTOLDFestival/"><Icon type="facebook" /></a>, 
                                                <a href="https://www.youtube.com/watch?v=o1u2sT8ah58"><Icon type="youtube" /></a>, 
                                                <a href="https://www.instagram.com/untoldfestival/?hl=ro"><Icon type="instagram" /></a>]}>
                                    <Meta title="Untold" description={<a href="https://untold.com/en">www.untold.ro</a>}/>
                                </Card>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div onClick={() => this.showElectricCastleDrawer()}>
                                <Card hoverable  style={{ width: 300, height:300 }}  cover={<img alt="example" src="/assets/electric-castle.jpg" />}
                                    actions={[ <a href="https://www.facebook.com/ElectricCastle/"><Icon type="facebook" /></a>, 
                                                <a href="https://www.youtube.com/watch?v=JQl6EvqMgpE"><Icon type="youtube" /></a>, 
                                                <a href="https://www.instagram.com/electriccastle/?hl=ro"><Icon type="instagram" /></a>,]}>
                                    <Meta title="Electric Castle" description={<a href="https://electriccastle.ro/">www.electriccastle.ro</a>}/>
                                </Card>
                            </div>
                       </Col>
                       <Col span={6}>
                            <div onClick={() => this.showNeverseaDrawer()}>
                                <Card hoverable  style={{ width: 300, height:300 }}  cover={<img alt="example" src="/assets/neversea.jpg" />}
                                    actions={[ <a href="https://www.facebook.com/NeverseaFestival/"><Icon type="facebook"/></a>, 
                                                <a href="https://www.youtube.com/watch?v=pPAEp_8D8zM"><Icon type="youtube"/></a>, 
                                                <a href="https://www.instagram.com/neverseafestival/?hl=ro"><Icon type="instagram" /></a>,]}>
                                    <Meta title="Neversea" description={<a href="https://www.neversea.com/en">www.neversea.com</a>}/>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
                <CustomDrawer visible={this.state.visible}
                              onClose={this.onClose}
                              festivalName={this.state.festivalName}
                              description={this.state.description}
                              lineup={this.state.lineup}
                              facebookLink={this.state.facebookLink}
                              instagramLink={this.state.instagramLink}
                              youtubeLink={this.state.youtubeLink} ></CustomDrawer>

           </Fragment>
         );
    }
}
 
export default Home;