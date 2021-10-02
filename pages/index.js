import styles from '../styles/Home.module.css'
import React, {useEffect} from 'react'
import {useRouter} from 'next/router'

const listActors = (all_actors, image_urls) => {
  console.log(image_urls);
  if (all_actors === null) { 
    return <div className="actor_block"><h4> Actor 1</h4> <h4> Actor 2</h4> <h4>Actor 3</h4></div>
  }
  if (all_actors[0] === undefined) {
    return
  }
  if (all_actors[0] === undefined ) {
    return <h3> Couldn't find that title </h3>
  }
  const actorList = all_actors.map((actor,actorIdx) => <h4 key={actorIdx}> {actor} </h4>)
  const images = image_urls.map((url) => {
    return <img src={url} width='150px' height='200px' alt="actor"></img>
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

function App(app_data) {
  const [actors,setActors] = React.useState([]);
  const [movie, updateMovie] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setActors([app_data.data.actor_one, app_data.data.actor_two, app_data.data.actor_three])
    setImages([app_data.data.actor_one_img, app_data.data.actor_two_img, app_data.data.actor_three_img])
    if (movie) {
      router.push('/' + movie, undefined, {shallow: true});
    }    
  }, [])

  console.log('actors: ', actors)
  console.log('images: ', images)

  
  const changeMovie = (new_movie) => {
    updateMovie(new_movie.toLowerCase());
  }
  
  return (
    <div className={styles.App}>  
      {actors !== null && images.length !== 0 && listActors(actors, images)}
      <br></br>
      <div className={styles.input_section}>
        <div className={styles.prompt_block}>
          <label className={styles.prompt}> Enter a movie and hit enter to display the lead actors </label> 
        </div>
      
      <br></br>
        <h2 className={styles.loading}> {isLoading && "Loading..."} </h2>
         <div className={styles.input_block}>
          <form action='movies/search' method='POST'>
            <input className={styles.input} type="text" onChange={e => changeMovie(e.target.value)} name='movie'/>
          </form> 
          {/* <button className={styles.button} disabled='true' onClick={() => getPost()} > <strong>Find Stars </strong></button>  */}
         </div>  
       </div>      
     </div>
  );
}
export async  function getServerSideProps(context) {
  return {
    props: {
      data: context.query
    }
  }
}
export default App;
