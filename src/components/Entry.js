import styled from "styled-components";

export default function Entry({ value, description, date, type}) {
    return (
        <Container>
            <Info>
                <p>{date}</p>
                <h6>{description}</h6>
            </Info>
            <Value color={type === 'positive'}>
                {value}
            </Value>
        </Container>
    )
}

const Container=styled.div`
    font-family: 'Raleway';
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
`

const Info=styled.div`
    display: flex;
    p {
        color: #c6c6c6;
    }

    h6 {
        color: #000000;
        margin-left: 10px;
    }
`
const Value=styled.p`
    color: ${props => props.color ? "#03AC00" : "#C70000"};
`