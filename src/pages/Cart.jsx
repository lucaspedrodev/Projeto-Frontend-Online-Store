import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    this.capturaStorage();
  }

  capturaStorage = () => {
    const mil = 1000;
    const itemCarrinho = JSON.parse(localStorage.getItem('produto'));
    setTimeout(() => {
      this.setState({ items: (itemCarrinho.infoProducts ?? []) });
    }, mil);
  };

  render() {
    const { items } = this.state;
    return (
      <div>
        <div>
          { items.length <= 0 && (
            <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
          )}
        </div>
        <div>
          { items.length >= 1 && (
            <ul>
              {/* { const acc =  } */}
              { items.map((el) => (
                <li key={ el.id }>
                  <p data-testid="shopping-cart-product-name">{el.title}</p>
                  <p>{ el.price }</p>
                  <img
                    src={ el.thumbnail }
                    alt={ el.title }
                  />
                  <p data-testid="shopping-cart-product-quantity">
                    Quantidade:
                    {1}
                  </p>
                </li>
              )) }
            </ul>
          )}
        </div>
      </div>
    );
  }
}
