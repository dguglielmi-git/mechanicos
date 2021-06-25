import { gql } from "@apollo/client";

export const INSERT_BUDGET = gql`
    mutation insertTmpBudget($input: TmpbudgetInput) {
    insertTmpBudget(input: $input){
        client
        address
        city
        vehicle
        brand 
        plate
    }
}
`;

export const UPDATE_BUDGET = gql`
    mutation updateTmpBudget($input: TmpbudgetInput) {
    updateTmpBudget(input: $input) {
        id
        items {
            description
        }
    }
}
`;

export const GET_TMPBUDGET = gql`
    query getTmpbudget {
        getTmpbudget {
            id
            client
            address
            city
            vehicle
            brand 
            plate
            items { 
                id 
                quantity
                description
                price
                subtotal
            }
        }
    }
  `;