import React from 'react'

function Search({setCity, error}) {

  const search = (e) => {
    const loc = e.target.value.trim().replace(/^\w/, (c) => c.toUpperCase())
    if (e.key === 'Enter' && loc !== ''){
      setCity(loc)
    }
  }

  return (
    <div className='search-container'>
      <input className={error ? 'search-error': null} type="text" onKeyPress={search} defaultValue='London'/>
    </div>
  )
}

export default Search