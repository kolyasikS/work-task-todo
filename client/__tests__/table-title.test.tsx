import {render, screen} from "@testing-library/react";
import TableTitle from "../src/app/table/TableTitle";
import '@testing-library/jest-dom';

describe('Table title', () => {
    it('should render the table title', () => {
        render(<TableTitle/>)

        const headerTitle = screen.getByRole('heading', {
            name: "W e l c o m e t o T O D O p r o j e c t !"
        });

        expect(headerTitle).toBeInTheDocument()
    })
})