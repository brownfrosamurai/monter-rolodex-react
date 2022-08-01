import { useEffect, useState } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('')
  const [title, setTitle] = useState('')
  const [monsters, setMonters] = useState([])
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  // initial data fetch 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setMonters(data));
  }, [])

// monster filter hander ...(only when monsters or searchField variables change)
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })

    setFilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField])

  // input search handler 
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()

    setSearchField(searchFieldString)
  }
  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()

    setTitle(searchFieldString)
  }

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      <SearchBox onChangeHandler={onSearchChange} placeholder='Search monsters...' className='monster-search-box' />
      <br />
      <SearchBox onChangeHandler={onTitleChange} placeholder='Set Title' className='monster-search-box' />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

export default App;
