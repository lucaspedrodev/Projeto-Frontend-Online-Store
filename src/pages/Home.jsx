import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

// import ListaCategorias from '../Components/ListaCategorias';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

import './Home.css';

class Home extends React.Component {
  state = {
    search: '',
    data: [],
    contagem: 0,
    listCategories: [],
    infoProducts: [],
  };

  async componentDidMount() {
    const chamarCategorias = await getCategories();
    this.setState({ listCategories: chamarCategorias });
  }

  salvaState = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
  };

  clickManager = async (idCategoria) => {
    const categoria = await getProductsFromCategoryAndQuery(idCategoria);
    this.setState({ data: categoria.results });
  };

  campoBusca = async (query) => {
    const pesquisa = await getProductsFromCategoryAndQuery('', query);
    this.setState({ data: pesquisa.results, search: '' });
  };

  addCarrinho = (product) => { // verificar se foi add mais de uma vez (incrementar uma chave quant) - hof /primeira vez que add produto1 / add produto2 some = false / produto 1 novamente
    const { infoProducts } = this.state;
    if (infoProducts.length === 0) {
      this.setState({ infoProducts: [product] }, () => {
        const json = JSON.stringify(this.state);
        localStorage.setItem('produto', json);
      });
    } else {
      this.setState((prev) => ({
        infoProducts: [...prev.infoProducts, product],
      }), () => {
        const jsonn = JSON.stringify(this.state);
        localStorage.setItem('produto', jsonn);
      });
    }
  };

  render() {
    const { search, data, contagem, listCategories } = this.state;
    return (
      <>
        <nav>
          <h1 className="logo">
            Guri
            <span>Shop!</span>
          </h1>
          <div className="search-cart">
            <input
              type="text"
              placeholder="Digite sua busca aqui"
              className="input"
              data-testid="query-input"
              name="inputPesquisa"
              onChange={ this.salvaState }
              value={ search }
            />
            <button
              data-testid="query-button"
              className="btn-search"
              type="button"
              onClick={ () => this.campoBusca(search) }
            >
              Pesquisar

            </button>
          </div>
          <button
            type="button"
            className="btn-cart"
          >
            <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
          </button>
          <span data-testid="shopping-cart-product-quantity">{ contagem }</span>
        </nav>

        <p data-testid="home-initial-message" className="intro">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <aside>
          <ul className="listaCategorias">
            Categorias
            { listCategories.map((el) => (
              <li key={ el.id }>
                <label data-testid="category" htmlFor="radio" className="list-cat">
                  <input
                    name="btn"
                    type="radio"
                    id="radio"
                    onClick={ () => this.clickManager(el.id) }
                  />
                  { el.name }
                </label>
              </li>
            )) }
          </ul>
        </aside>

        { data.length > 0 ? (
          <>
            { data.map((el, i) => (

              <div data-testid="product" key={ `${el.title}-${i}` }>

                <div>
                  <p>{ el.title }</p>
                  <img src={ el.thumbnail } alt={ el.title } />
                  <p>{ el.price }</p>

                  <button
                    className="more"
                    type="button"
                  >
                    <Link
                      to={ `/productInfo/${el.id}` }
                      data-testid="product-detail-link"
                    >
                      Veja mais
                    </Link>
                  </button>
                  <button
                    data-testid="product-add-to-cart"
                    className="more"
                    type="button"
                    onClick={ () => this.addCarrinho(el) }
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            )) }
          </>
        ) : <span className="not-product">Nenhum produto foi encontrado</span> }
      </>
    );
  }
}

export default Home;
