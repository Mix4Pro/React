import React from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import Movie from './Movie';
import './App.css'

// let foodThatILike = [
//   {
//     id: 1,
//     name: 'Soup',
//     image: 'https://www.eatthis.com/wp-content/uploads/sites/4/2022/01/hot-and-sour-soup.jpg?quality=82&strip=1&w=800',
//     rating: 4.5
//   },
//   {
//     id: 2,
//     name: 'Sandwich',
//     image: 'https://simply-delicious-food.com/wp-content/uploads/2020/07/Easy-salad-sandwiches-with-herb-mayo-1.jpg',
//     rating: 5.0
//   },
//   {
//     id:3,
//     name: 'Mutton',
//     image: 'https://asianfoodnetwork.com/content/dam/afn/global/en/recipes/kolhapuri-mutton-curry/AFN_kolhapuri_mutton_curry_main_image.jpg.transform/desktop-img/img.jpg',
//     rating: 4.8
//   }
// ]

// function Food({name,picture,rating}){
//   return (
//     <div>
//         <h3>I like {name}</h3>
//         <h4>{rating} / 5.0</h4>

//         <img src={picture} alt='LoL' />
//     </div>
//   );
// }

// Food.propTypes = {
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
//   rating: PropTypes.number.isRequired
// }

// function renderFood(dish){
//   return <Food key={dish.id} name={dish.name} picture={dish.image} rating={dish.rating}/>
// }

// function App() {
//   return (
//     <div className="App">
//       {foodThatILike.map(renderFood)}
//     </div>
//   );
// }

class App extends React.Component{
  state = {
    isLoading: true,
    movies: []
  }
  getMovies = async () => {
    const {
      data:{ 
        data: {movies},
      }
    } = await axios.get('https://yts.mx/api/v2/list_movies.json?sort_ by=rating')
    console.log(movies)
    this.setState({movies:movies , isLoading: false});

  }
  componentDidMount() {
    this.getMovies();
  }
  render(){
  const { isLoading, movies} = this.state;
  return (
    <section className='container'>
      { isLoading ? (
       <div className='loader'>
        <span className='loader_text'>Loading</span>
       </div> 
      ) : (
        <div className="movies">
        {movies.map((movie) => (
          <Movie
          key={movie.id} 
          id={movie.id} 
          year={movie.year} 
          title={movie.title} 
          summary={movie.summary} 
          poster={movie.medium_cover_image}
          genres={movie.genres} />
        ))}
      </div>
      )}
  </section>
  )
}
}
export default App;