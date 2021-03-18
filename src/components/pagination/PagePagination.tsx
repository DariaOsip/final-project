import React from "react";
import {Pagination} from "react-bootstrap";
import "./PagePagination.css";


interface PaginationPropsType {
    limit: number
    currentPage: number
    allItemsCount: number
    fetchPokemons: (page: number, limit: number) => void
    fetchItemsCount: () => void
    setCurrentPage: (page: number) => void
}


export class PagePagination extends React.Component<PaginationPropsType, any> {

    handleClickNumber(page: number) {
        this.props.setCurrentPage(page);
        this.props.fetchPokemons(page, this.props.limit);
        this.props.fetchItemsCount();
    }

    handleClickPrev() {
        this.handleClickNumber(this.props.currentPage === 1 ? 1 : this.props.currentPage - 1);
    }

    handleClickNext() {
        let lastPage = this.getLastPage(this.props.allItemsCount, this.props.limit);
        const page = this.props.currentPage === lastPage ? this.props.currentPage : this.props.currentPage + 1;
        this.handleClickNumber(page);
    }

    getLastPage(allItemsCount: number, limit: number): number {
        return (allItemsCount <= limit) ? 0 : Math.ceil(allItemsCount / limit);
    }

    getPageNumbers() {
        const {limit, currentPage, allItemsCount} = this.props;
        const lastPage = this.getLastPage(allItemsCount, limit);

        if (lastPage < 5) {
            const result: number[] = [];
            for (let i = 1; i <= lastPage; i++) {
                result.push(i);
            }
            return result;
        }

        if (currentPage - 3 <= 0) {
            return [
                1, 2, 3, 4, "...", lastPage
            ]
        }

        if (lastPage - currentPage < 3) {
            return [
                1, "...", lastPage - 3, lastPage - 2, lastPage - 1, lastPage
            ]
        }

        return [
            1, "...", currentPage - 1, currentPage, currentPage + 1, "...", lastPage
        ]
    }

    render() {
        if (!this.props.allItemsCount) {
            return (<></>)
        }

        let pageNumbers = this.getPageNumbers();

        const {currentPage} = this.props;

        const paginationItems = pageNumbers.map((item: number | string, index: number) => {
            if (item === '...') {
                return <Pagination.Ellipsis key={index}/>
            } else {
                return <Pagination.Item key={index} active={item === currentPage}
                                        onClick={() => this.handleClickNumber(item as number)}>
                    {item}
                </Pagination.Item>
            }
        })

        return (

            <div className="pagination">
                <Pagination>
                    <Pagination.Prev onClick={() => this.handleClickPrev()}/>
                    {paginationItems}
                    <Pagination.Next onClick={() => {
                        this.handleClickNext()
                    }}/>
                </Pagination>
            </div>

        )

    }

}


