import React from 'react';

// import logo from '../../../assets/images/photo.jpg';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './HomePage.scss';

// const Slide = require('react-swipeable-views').default;
const { red, blue, green } = require('@material-ui/core/colors');
const Button = require('@material-ui/core/Button').default;

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render () {
    return (
      <>
        <Header />
        <div className="main">
          <section className="section1">
            <div className="secc1-carousel">
              <div className="container">
                {/* <div className="carousel"></div> */}
                <div style={{ position: 'relative', width: '100%', height: 500 }}>
                  <Button onClick={() => this.setState({ open: true })}>Open carousel</Button>
                  <AutoRotatingCarousel
                    label='Get started'
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}
                    onStart={() => this.setState({ open: false })}
                    style={{ position: 'absolute' }}
                  >
                    <Slide
                      media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' alt="..." />}
                      mediaBackgroundStyle={{ backgroundColor: red[400] }}
                      style={{ backgroundColor: red[600] }}
                      title='This is a very cool feature'
                      subtitle='Just using this will blow your mind.'
                    />
                    <Slide
                      media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' alt="..." />}
                      mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                      style={{ backgroundColor: blue[600] }}
                      title='Ever wanted to be popular?'
                      subtitle='Well just mix two colors and your are good to go!'
                    />
                    <Slide
                      media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' alt="..." />}
                      mediaBackgroundStyle={{ backgroundColor: green[400] }}
                      style={{ backgroundColor: green[600] }}
                      title='May the force be with you'
                      subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.'
                    />
                  </AutoRotatingCarousel>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </>
    )
  }
}

export default HomePage;