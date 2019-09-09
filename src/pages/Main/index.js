import React, { Component } from 'react';
import { FaGithub, FaFolderPlus, FaSpinner, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../components/Container/Index';
import { Form, SubmitButton, List} from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories){
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  hadleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  }


  render() {
    const { newRepo, repositories, loading } = this.state;

    return (
    <Container>
      <h1>
        <FaGithub />
        Repositórios
      </h1>

      <Form onSubmit={this.handleSubmit}>
        <input
         type="text"
         placeholder="Adicionar repositório"
         value={newRepo}
         onChange={this.hadleInputChange}
        />

        <SubmitButton loading={loading}>
          { loading ? (<FaSpinner color="#FFFFFF" size={23} />
          ) : (
            <FaFolderPlus color="#FFFFFF" size={28} />
          )}
        </SubmitButton>
      </Form>

      <List>
         {repositories.map(repository => (
           <li key={repository.name}>
             <span>{repository.name}</span>
             <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
               <FaBars/>
               </Link>
           </li>
         ))}
      </List>
    </Container>
  );
}
}
