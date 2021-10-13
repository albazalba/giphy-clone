import React from 'react'
import styled from '@emotion/styled'

const Paginate = (props) => {

    const pagenumbers = []
    for(let i =1; i<= Math.ceil(props.totalItem/props.itemsPerPage); i++) {
        pagenumbers.push(i)

    }
    return <nav>
            <PaginationWrapper>
                <ul className="pagination">
                    {pagenumbers.map(number => {
                        return (
                            <li className="page-item"> 
                                <a onClick={() => props.pageSelected(number)} 
                                    className="page-link" 
                                    href="!#" >
                                    {number}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </PaginationWrapper>
        </nav>
}

const PaginationWrapper = styled.div`
    margin: 20px;
    ul{
        list-style: none;
        text-decoration: none;
        display: flex;
        justify-content: center;
        .number-list{
            margin: 5px;
            .number{
                text-decoration: none;
                color: white;
            }
        }
    }    
`

export default Paginate