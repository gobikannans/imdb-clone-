import {Component} from "react"
import {AiOutlineSearch} from "react-icons/ai"
import {TailSpin} from 'react-loader-spinner' 
import Movies from "../Movies"

import "./index.css"

const apiStatusConstants={
    initial:"INITIAL",
    inProgress:"INPROGRESS",
    success:"SUCCESS",
    failureL:"FAILURE"
}

class ApiFetch extends Component{
    state={moviesList:[],searchValue:"",apiStatus:apiStatusConstants.initial}

    componentDidMount(){
        this.getMovieData()
    }

    onChangeSearch=event=>{
        this.setState({searchValue:event.target.value})
    }

    getMovieData=async()=>{
        this.setState({apiStatus:apiStatusConstants.inProgress})
        const {searchValue,moviesList}=this.state
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c3cc852844msh6cee86758bb86f7p1eb13cjsn4e9c0beb678c',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        };
        
        const response= await fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${searchValue}`, options)
        if(response.ok){
            const data= await response.json()
            console.log(data)
            const fetchedData=data.d.map(eachItem=>({
                id:eachItem.id,
                genre:eachItem.l,
                bio:eachItem.s,
                img:{
                    image:eachItem.i.imageUrl,
               }       
       }))
         this.setState({moviesList:fetchedData ,apiStatus:apiStatusConstants.success})
         console.log(moviesList)
        }
        else{
            this.setState({apiStatus:apiStatusConstants.failure})
        }

      }

        onKeySearch = event => {
           if (event.key === 'Enter') {
            this.getMovieData()
            }
         }

        onClickSearch = () => {
           this.getMovieData()
         }

    Navbar=()=>{

        const{searchValue}=this.state
        return(
            <div className="navbar-container">
               <div className="navbar">
                 <img src="https://res.cloudinary.com/dpjowvn70/image/upload/v1676468965/IMDB_Logo_2016.svg_wptqfy.png" alt="logo" className="logo"/>
                 <div className="search-container">
                 <input type="text" placeholder="Search IMDb" value={searchValue} onChange={this.onChangeSearch} className="input" onKeyDown={this.onKeySearch}/>
                 <button
                  type="button"
                  className="search-btn"
                  onClick={this.onClickSearch}
                  >
                   <AiOutlineSearch />
                 </button>
               </div>
               </div>
               </div>
               )
            }
       
       
        renderDataLoader = () => (
            <div className="loader-container">
                  <TailSpin color="yellow" height="50" width="50" />
            </div>
              )      

       renderMovieList=()=>{
        const{moviesList}=this.state
        console.log(moviesList)

        return(
            <ul className="movie-list-container">
                {moviesList.map(eachItem=>(
                    <Movies details={eachItem} key={eachItem.id}/>
                ))}
            </ul>
        )

       }    
       
       renderMovieFailure=()=>(
        <div className="loader-container">
            <img src="https://res.cloudinary.com/dpjowvn70/image/upload/v1676481056/blz-blog-api-fail_zsfi2a.jpg" alt="failure-img" className="failure-img"/>
            <p className="failure-para">Please try relevant keywords or try again later</p>

        </div>
       )

       renderApiStatus = () => {
        const {apiStatus} = this.state
        switch (apiStatus) {
          case apiStatusConstants.success:
            return this.renderMovieList()
        case apiStatusConstants.inProgress:
            return this.renderDataLoader()
        case apiStatusConstants.failure:
            return this.renderMovieFailure()
          default:
            return null
        }
      }

    render(){
        return(
            <div>
                {this.Navbar()}
                <div className="bg-container">
                    {this.renderApiStatus()}
                </div>
            </div>

        )
    }

}

export default ApiFetch