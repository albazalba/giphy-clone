import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import Paginate from './Pagination';
import {FaSearch} from 'react-icons/fa'
const Giphy = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState('')

    const [currentPage, setCurrentpage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem-itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

    console.log(searchText);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                params : {
                    api_key: "T6VG4PeBYBYrHUj9iEXuxRwMrnV36neX",
                    limit: 1000
                }
            })
            console.log(results);
            setData(results.data.data)
            setIsLoading(false)
        }
        fetchData()
    },[])
    const renderGifs = () => {
        if(isLoading){
            return <div>...loading</div>
        }
        return currentItems.map(data => {
            return (
                <div key={data.id} className="gif">
                    <img src={data.images.fixed_height.url} alt="gif" />
                </div>
            )
        })
    }

    const handleClick = async event => {
        event.preventDefault();
        setIsLoading(true);
        const results = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "T6VG4PeBYBYrHUj9iEXuxRwMrnV36neX",
                q: searchText,
                limit: 1000
            }
        })
        setIsLoading(false)
        setData(results.data.data)
    }

    const handleTrendingClick = async event => {
        event.preventDefault();
        setIsLoading(true);
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
            params: {
                api_key: "T6VG4PeBYBYrHUj9iEXuxRwMrnV36neX",
                limit: 1000
            }
        })
        setIsLoading(false)
        setData(results.data.data)
    }

    const handleFunnyClick = async event => {
        event.preventDefault();
        setIsLoading(true);
        const results = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "T6VG4PeBYBYrHUj9iEXuxRwMrnV36neX",
                q: "funny",
                limit: 1000
            }
        })
        setIsLoading(false)
        setData(results.data.data)
    }

    const handleRandomClick = async event => {
        event.preventDefault();
        setIsLoading(true);
        const results = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "T6VG4PeBYBYrHUj9iEXuxRwMrnV36neX",
                q: "gif",
                limit: 1000,
                raring: "g"
            }
        })
        setIsLoading(false)
        setData(results.data.data)
    }

    const pageSelected = (pageNumber) => {
        setCurrentpage(pageNumber)
    }

    return <GiphContainer>
        <div className="categories-list">
            <ul>
                <li onClick={handleTrendingClick}>Trending</li>
                <li onClick={handleRandomClick}>Random</li>
                <li>Popular</li>
                <li onClick={handleFunnyClick}>Funny</li>
            </ul>
        </div>
            <form className="input">
                <input name="search" placeholder="Search Gifs" value={searchText} onChange={(e) => {setSearchText(e.target.value)}} />
                <button className="search-btn" onClick={handleClick}><FaSearch/></button>
            </form>
        <div className="gifs">
            {renderGifs()}
        </div>
        <Paginate currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        totalItem={data.length} 
        pageSelected={pageSelected} />    
    </GiphContainer>

}

const GiphContainer = styled.div`
.categories-list{
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin: 10px; */
    ul{
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0;
        padding-left: 0;
        li{
            cursor: pointer;
            position: relative;
            color: #dfd7d7;
            margin: 10px;
            font-size: 22px;
            &:after{
                position: absolute;
                content: "";
                /* background: blue; */
                background: rgb(131,58,180);
                background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
                width: 100%;
                height: 2px;
                bottom: 0;
                left: 0;
                opacity: 0;
                transform: scale(0);
                transform-origin: center;
                transition: opacity 300ms, transform 300ms;
            }
            &:hover::after{
                opacity: 1;
                transform: scale(1);
            }
        }
    }
}
.input{
    border-radius: 50px;
    display: inline-flex;
/* justify-content: center; */
    align-items: center;
    margin: 20px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    input{
        border-radius: 50px;
        width: 250px;
        border: none;
        padding: 7px
    }
    .search-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        position: absolute;
        right: 0;
        padding: 11px 11px;
        /* margin: 5px; */
        border: none;
        background: rgb(131,58,180);
                background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
        color: white;
    }
}
.gifs{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .gif{
        transition: transform 300ms;
        margin: 10px;
        &:hover{
            transform: scale(1.1);
        }
    }
}


`

export default Giphy