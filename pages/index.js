import styles from '../styles/Home.module.css'
import React from 'react'

var axios = require("axios").default;
// require('dotenv').config()


const API_KEY = process.env.REACT_APP_GOOGLEAPI_KEY
const cx = process.env.REACT_APP_GOOGLE_CX

const listActors = (all_actors, image_urls) => {
  console.log(image_urls);
  if (all_actors === null) { 
    return <div className="actor_block"><h4> Actor 1</h4> <h4> Actor 2</h4> <h4>Actor 3</h4></div>
  }
  if (all_actors === undefined ) {
    return <h3> Couldn't find that title </h3>
    // return <div id="actor-block"><h4> Actor 1</h4> <h4> Actor 2</h4> <h4>Actor 3</h4></div>
  }
  const actorList = all_actors.map((actor,actorIdx) => <h4 key={actorIdx}> {actor.name} </h4>)
  const images = image_urls.map((url) => {
    return <img src={url} width='150px' height='200px' alt="toddford"></img>
  })
  
  console.log(actorList);
  return (
    <div className='wrapper'>
      <div className={styles.actor_block}>
        {actorList}
      </div>
      <div className={styles.image_block}>
        {images}
      </div>
      
    </div>
  );
}

function App(env_variables) {
  const [post,setPost] = React.useState(null);
  const [movie, updateMovie] = React.useState(null);
  const [imageSrc, setImageSrc] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const API_KEY = env_variables['GOOGLEAPI_KEY']
  const cx = env_variables['cx']
  const IMDBAPI_KEY = env_variables['IMDBAPI_KEY']
  // console.log('google: ', API_KEY)
  // console.log('cx: ', cx)
  // console.log('IMDB: ', IMDBAPI_KEY)

  const fetchImageData = async (actors) => {
    if (actors === null || actors === 'undefined') {
      console.log("didn't get actors");
      return;
    }
    let new_imageSrc = []
    for (const actor of actors) {
      console.log("calling google api...")
      const response = await axios.request(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${cx}&q=${actor.name}`)
      const url = response.data.items[0].pagemap.cse_image[0].src
      new_imageSrc.push(url)
    }
    setIsLoading(false);
    console.log(new_imageSrc);
    setImageSrc(new_imageSrc);     
  }
  
  var options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/find',
    params: {q: movie},
    headers: {
      'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      'x-rapidapi-key': IMDBAPI_KEY 
    }
  };

  const changeMovie = (new_movie) => {
    console.log(new_movie);
    updateMovie(new_movie);
  }

  async function getPost() {
    setIsLoading(true);
    const response  = await axios.request(options)
    console.log(response.data.results[0])
    let principals = response.data.results[0].principals
    fetchImageData(principals)
    setPost(principals);    
    };
  
  return (
    <div className={styles.App}>  
      {post !== null && imageSrc.length !== 0 && listActors(post, imageSrc)}
      <br></br>
      <div className={styles.input_section}>
        <div className={styles.prompt_block}>
          <label className={styles.prompt}> Enter a movie to display the lead actors </label> 
        </div>
      
      <br></br>
        <h2 className={styles.loading}> {isLoading && "Loading..."} </h2>
         <div className={styles.input_block}>
          <input className={styles.input} type="text" onChange={e => changeMovie(e.target.value)}/>
          <button className={styles.button} onClick={() => getPost()} > <strong>Find Stars </strong></button> 
         </div>  
       </div>      
     </div>
  );
}
App.getInitialProps = async (ctx) => {
  const env_variables = { GOOGLEAPI_KEY: process.env.REACT_APP_GOOGLEAPI_KEY, 
                          cx: process.env.REACT_APP_GOOGLE_CX,
                          IMDBAPI_KEY: process.env.REACT_APP_IMDBAPI_KEY}
    
  return env_variables
}
export default App;
