import "../userlist-page/UsersList.css";
import { Container } from 'react-grid-system';
import { SearchBarComp } from "../../components/SearchBarComp/SearchBarComp";
import { TableListComp } from "../../components/TableListComp/TableListComp";

export default function UsersList() {

    return (
        <Container id='user-list-body'>
            <div className='container'>
                <SearchBarComp />
                <TableListComp />
            </div>
        </Container>
    )
}