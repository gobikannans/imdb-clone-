import "./index.css"

const Movies=(props)=>{
    const{details}=props
    const{id,genre,bio,img}=details
    const{image}=img
    console.log(genre)

    return(
        <li className="movie-list-item">
            <img src={image} alt="movie" className="movie-img"/>
            <h1 className="movie-genre">{genre}</h1>
            <p className="movie-bio">{bio}</p>
        </li>
    )

}

export default Movies