import styled from "styled-components";

export default function Entry({ value, description, date, type}) {
    return (
        <Container>
            <Info>
                <p>{date}</p>
                <h6>{description}</h6>
            </Info>
            <Value>
                <p color={type}>{value}</p>
            </Value>
        </Container>
    )
}

const Container=styled.div`
    font-family: 'Raleway';
    font-size: 16px;
`

const Info=styled.div`
    p {
        color: #c6c6c6;
    }

    h6 {
        color: #000000;
    }
`
const Value=styled.div`
    color: ${props => props.type === 'positive' ? "#03AC00" : "#C70000"};
`