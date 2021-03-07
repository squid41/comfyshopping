import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars,reviews}) => {
const temp=Array.from({length:5},(_,index)=>{
   return(
     <span>{stars>=index?<BsStarFill/>:stars>=(index+0.5)?<BsStarHalf/>:<BsStar/>}</span>
   )
})
  return(
    <Wrapper>
      <div className="stars">
        {temp}
       <p className="reviews">({reviews} customer reviews)</p>
      </div>
    </Wrapper>

  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
