import React, { Component, Fragment } from 'react';
import { StyledBtn, StyledContainer, StyledDDropdown} from './wishlist-selectbox-table.style';

class WishlistSelectBoxTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.props,
            items: this.props.items || [],
            selectedItem: this.props.items[0] || this.props.selectedItem,
            showItems: false,
        }
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
    }

    selectItem = (item) => {
        this.setState({
          selectedItem: item,
          showItems: false
        });
        
        const itemSelected=item.value.toString().toLowerCase().split(" ").pop();
        const nameFilter=this.state.name;
        if( nameFilter === 'city' ){
          this.props.filterCity( nameFilter, itemSelected );
        }
        else if(nameFilter === 'price' ){
          this.props.filterPrice( nameFilter, itemSelected );
        }
        
      }
    
      toggleList = () => {
        this.setState(prevState => ({
          showItems: !prevState.showItems
        }));
      }
      
      setWrapperRef(node) {
          this.wrapperRef = node;
      }
    
      handleClickOutside(event) {
          if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
              this.setState({
                  showItems: false   
              });
          }
      }
      componentDidMount() {
          document.addEventListener('mousedown', this.handleClickOutside);
      }
    
      componentWillUnmount() {
          document.removeEventListener('mousedown', this.handleClickOutside);
      }
      render () {
        return (
        <Fragment>
                <StyledContainer ref={this.setWrapperRef}>
                  <StyledBtn onClick={this.toggleList}>{ this.state.selectedItem.value } </StyledBtn>
                  <StyledDDropdown style={{display: this.state.showItems ? 'block' : 'none'}}>
                    {
                      this.state.items.map(item => <div
                        key={item.id}
                        onClick={() => this.selectItem(item)}
                        className={this.state.selectedItem === item ? 'selected' : 'noSelection'}
                      >
                        <i className="fas fa-check iTag"></i> { item.value }
                      </div>)
                    }
                  </StyledDDropdown>
                </StyledContainer>
        </Fragment>
        )
      }
}

export default WishlistSelectBoxTable;